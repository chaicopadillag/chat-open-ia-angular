import { Component, inject, signal } from '@angular/core';
import { ChatMessageInOrthographyComponent } from '@components/chat-message-in-orthography/chat-message-in-orthograpy.component';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    ChatMessageInOrthographyComponent,
    MessageBoxComponent,
    ChatMessageOutComponent,
    TypingComponent,
    MessageBoxWithSelectComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
})
export default class OrthographyPageComponent {
  private gptServ = inject(GptService);

  isTyping = signal<boolean>(false);
  messages = signal<MessageI[]>([]);

  handleMessage(body: MessageBoxI) {
    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);
    this.gptServ.orthographyCheck({ prompt: body.prompt }).subscribe({
      next: (data) => {
        this.messages.update((chats) => [
          ...chats,
          { text: data.message, isIa: true, orthography: { ...data } },
        ]);
        this.isTyping.set(false);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
