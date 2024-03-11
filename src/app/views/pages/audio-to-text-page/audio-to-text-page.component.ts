import { Component, inject, signal } from '@angular/core';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    ChatMessageOutComponent,
    TypingComponent,
    MessageBoxComponent,
  ],
  templateUrl: './audio-to-text-page.component.html',
  styles: ``,
})
export default class AudioToTextPageComponent {
  private translateServ = inject(GptService);
  isTyping = signal<boolean>(false);
  messages = signal<MessageI[]>([]);

  public voices = [
    { key: 'alloy', value: 'Alloy' },
    { key: 'echo', value: 'Echo' },
    { key: 'fable', value: 'Fable' },
    { key: 'nova', value: 'Nova' },
    { key: 'onyx', value: 'Onyx' },
    { key: 'shimmer', value: 'Shimmer' },
  ];

  handleMessage(body: MessageBoxI) {
    if (!body?.file) return;

    if (this.isTyping()) return;

    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);

    this.translateServ
      .audioToText({ prompt: body?.prompt, file: body.file })
      .subscribe({
        next: (data) => {
          this.isTyping.set(false);
          const text = `
          # Transcripción:
          __Duración:__ ${Math.round(data.duration)} segundos.
          # Texto es:
          ${data.text}`;
          this.messages.update((chats) => [...chats, { text, isIa: true }]);

          for (const { start, end, text } of data.segments) {
            const textSegment = `__De ${Math.round(start)} a ${Math.round(
              end
            )} segundos:__
            ${text}`;
            this.messages.update((chats) => [
              ...chats,
              { text: textSegment, isIa: true },
            ]);
          }
        },
        error: console.log,
      });
  }
}
