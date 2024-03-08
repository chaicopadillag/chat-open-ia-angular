import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message-in',
  standalone: true,
  imports: [],
  templateUrl: './chat-message-in.component.html',
})
export class ChatMessageInComponent {
  @Input({ required: true }) message!: string;
}
