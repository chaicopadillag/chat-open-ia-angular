import { Component, inject, signal } from '@angular/core';
import { ChatMessageImageInComponent } from '@components/chat-message-image-in/chat-message-image-in.component';
import { ChatMessageInOrthographyComponent } from '@components/chat-message-in-orthography/chat-message-in-orthograpy.component';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { GptService } from '@core/services/gpt.service';
import { MessageImageI } from '@interfaces/image-generation.interface';
import { MessageBoxI } from '@interfaces/message-box.interface';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    ChatMessageInComponent,
    ChatMessageInOrthographyComponent,
    MessageBoxComponent,
    ChatMessageOutComponent,
    TypingComponent,
    MessageBoxWithSelectComponent,
    ChatMessageImageInComponent,
  ],
  templateUrl: './image-generation-page.component.html',
  styles: ``,
})
export default class ImageGenerationPageComponent {
  private openAiServ = inject(GptService);

  isTyping = signal<boolean>(false);
  messages = signal<MessageImageI[]>([]);

  handleMessage(body: MessageBoxI) {
    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false, imageUrl: '' },
    ]);
    this.openAiServ.imageGeneration({ prompt: body.prompt }).subscribe({
      next: ({ imageUrl, urlOpenAi }) => {
        this.messages.update((chats) => [
          ...chats,
          { text: body.prompt, isIa: true, imageUrl },
        ]);
        this.isTyping.set(false);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
