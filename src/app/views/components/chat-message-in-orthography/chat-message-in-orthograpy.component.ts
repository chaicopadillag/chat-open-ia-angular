import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message-in-orthography',
  standalone: true,
  imports: [],
  templateUrl: './chat-message-in-orthography.component.html',
})
export class ChatMessageInOrthographyComponent {
  @Input({ required: true }) message!: string;
  @Input({ required: true }) errors!: string[];
  @Input({ required: true }) score!: string;
}
