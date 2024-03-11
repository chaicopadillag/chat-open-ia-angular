import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message-audio-in',
  standalone: true,
  imports: [],
  templateUrl: './chat-message-audio-in.component.html',
  styles: ``,
})
export class ChatMessageAudioInComponent {
  @Input({ required: true }) url!: string;
}
