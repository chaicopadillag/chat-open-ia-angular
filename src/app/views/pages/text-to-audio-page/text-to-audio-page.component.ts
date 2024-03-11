import { Component, inject, signal } from '@angular/core';
import { ChatMessageAudioInComponent } from '@components/chat-message-audio-in/chat-message-audio-in.component';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxSelectI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    ChatMessageOutComponent,
    TypingComponent,
    MessageBoxWithSelectComponent,
    ChatMessageAudioInComponent,
  ],
  templateUrl: './text-to-audio-page.component.html',
  styles: ``,
})
export default class TextToAudioPageComponent {
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

  handleMessage(body: MessageBoxSelectI) {
    if (this.isTyping()) return;

    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);

    this.translateServ
      .textToAudio({ voice: body.select, prompt: body.prompt })
      .subscribe({
        next: (url) => {
          this.isTyping.set(false);
          this.messages.update((chats) => [
            ...chats,
            { text: url, isIa: true },
          ]);
        },
        error: console.log,
      });
  }
}
