import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message-out',
  standalone: true,
  imports: [],
  templateUrl: './chat-message-out.component.html',
  styles: ``,
})
export class ChatMessageOutComponent {
  @Input({ required: true }) message!: string;
}
