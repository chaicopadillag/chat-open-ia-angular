import { Component, inject, signal } from '@angular/core';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    ChatMessageOutComponent,
    MessageBoxComponent,
    TypingComponent,
  ],
  templateUrl: './pros-cons-page.component.html',
  styles: ``,
})
export default class ProsConsPageComponent {
  private prosCons = inject(GptService);

  isTyping = signal<boolean>(false);
  messages = signal<MessageI[]>([]);

  handleMessage(body: MessageBoxI) {
    if (this.isTyping()) return;
    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);

    this.prosCons.prosConsDiscusser({ prompt: body.prompt }).subscribe({
      next: (data) => {
        this.isTyping.set(false);
        this.messages.update((prev) => [
          ...prev,
          { isIa: true, text: data.content },
        ]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
