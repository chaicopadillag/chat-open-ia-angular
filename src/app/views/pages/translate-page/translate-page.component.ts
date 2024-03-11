import { Component, inject, signal } from '@angular/core';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxSelectI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    ChatMessageOutComponent,
    TypingComponent,
    MessageBoxWithSelectComponent,
  ],
  templateUrl: './translate-page.component.html',
  styles: ``,
})
export default class TranslatePageComponent {
  private translateServ = inject(GptService);
  isTyping = signal<boolean>(false);
  messages = signal<MessageI[]>([]);

  public languages = [
    { key: 'alemán', value: 'Alemán' },
    { key: 'árabe', value: 'Árabe' },
    { key: 'bengalí', value: 'Bengalí' },
    { key: 'francés', value: 'Francés' },
    { key: 'hindi', value: 'Hindi' },
    { key: 'inglés', value: 'Inglés' },
    { key: 'japonés', value: 'Japonés' },
    { key: 'mandarín', value: 'Mandarín' },
    { key: 'portugués', value: 'Portugués' },
    { key: 'ruso', value: 'Ruso' },
  ];

  handleMessage(body: MessageBoxSelectI) {
    if (this.isTyping()) return;

    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);

    this.translateServ
      .translation({ lang: body.select, prompt: body.prompt })
      .subscribe({
        next: (resp) => {
          this.isTyping.set(false);
          this.messages.update((chats) => [
            ...chats,
            { text: resp.content, isIa: true },
          ]);
        },
        error: console.log,
      });
  }
}
