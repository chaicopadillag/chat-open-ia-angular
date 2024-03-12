import { Component, OnInit, inject, signal } from '@angular/core';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    MessageBoxComponent,
    ChatMessageOutComponent,
    TypingComponent,
    MessageBoxWithSelectComponent,
  ],
  templateUrl: './assistant-page.component.html',
  styles: ``,
})
export default class AssistantPageComponent implements OnInit {
  private threadId?: string;
  private gptServ = inject(GptService);

  isTyping = signal<boolean>(false);
  messages = signal<MessageI[]>([]);

  ngOnInit(): void {
    this.gptServ.createThread().subscribe({
      next: ({ id }) => {
        this.threadId = id;
      },
    });
  }

  handleMessage(body: MessageBoxI) {
    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
    ]);

    this.gptServ
      .userCuestion({ threadId: this.threadId!, content: body.prompt })
      .subscribe({
        next: (data) => {
          this.messages.set([...data]);
          this.isTyping.set(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
