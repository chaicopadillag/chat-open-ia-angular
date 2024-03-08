import { Component, inject, signal } from '@angular/core';
import { OpenIaService } from '@app/services/open-ia.service';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { MessageBoxI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    MessageBoxComponent,
    ChatMessageOutComponent,
    TypingComponent,
    MessageBoxWithSelectComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
})
export default class OrthographyPageComponent {
  private openIa = inject(OpenIaService);

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

  handleMessage(body: MessageBoxI) {
    console.log({ body });
    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);
  }
}
