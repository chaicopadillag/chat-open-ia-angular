import { Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-message-in',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './chat-message-in.component.html',
})
export class ChatMessageInComponent {
  @Input({ required: true }) message!: string;
}
