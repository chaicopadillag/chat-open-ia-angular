import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxI, MessageI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageInComponent,
    ChatMessageOutComponent,
    MessageBoxComponent,
    TypingComponent,
  ],
  templateUrl: './pros-cons-stream-page.component.html',
  styles: ``,
})
export default class ProsConsStreamPageComponent {
  private prosCons = inject(GptService);

  isTyping = signal<boolean>(false);
  messages = signal<MessageI[]>([]);

  handleMessage(body: MessageBoxI) {
    if (this.isTyping()) return;
    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false },
      { text: '...', isIa: true },
    ]);

    this.prosCons.prosConsStream({ prompt: body.prompt }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.messages().pop();

          this.messages.set([
            ...this.messages(),
            { isIa: true, text: event.partialText },
          ]);
        } else if (event instanceof HttpResponse) {
          this.isTyping.set(false);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
