import { Component, signal } from '@angular/core';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { TypingComponent } from '@components/typing/typing.component';
import {
  MessageBoxWithSelectI,
  MessageI,
} from '@interfaces/message-box.interface';

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
  isTyping = signal<boolean>(true);
  messages = signal<MessageI[]>([
    {
      isIa: true,
      text: 'Ingres tu consulta IA',
    },
    {
      isIa: false,
      text: 'Que es esta pasando en Perú',
    },
  ]);

  countries = [
    { key: 'US', value: 'United States' },
    { key: ' CA', value: 'Canada' },
    { key: ' FR', value: 'France' },
    { key: ' DE', value: 'Germany' },
    { key: ' 1', value: 'text' },
  ];

  handleMessage(body: MessageBoxWithSelectI) {
    console.log({ body });
    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);
  }
}
