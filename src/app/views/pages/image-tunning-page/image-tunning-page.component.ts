import { Component, inject, signal } from '@angular/core';
import { ChatMessageImageInComponent } from '@components/chat-message-image-in/chat-message-image-in.component';
import { ChatMessageInOrthographyComponent } from '@components/chat-message-in-orthography/chat-message-in-orthograpy.component';
import { ChatMessageInComponent } from '@components/chat-message-in/chat-message-in.component';
import { ChatMessageOutComponent } from '@components/chat-message-out/chat-message-out.component';
import { MessageBoxWithSelectComponent } from '@components/message-box-with-select/message-box-with-select.component';
import { MessageBoxComponent } from '@components/message-box/message-box.component';
import { TypingComponent } from '@components/typing/typing.component';
import { ImageGenerationReqI } from '@core/interfaces/image-generation.interface';
import { GptService } from '@core/services/gpt.service';
import { MessageImageI } from '@interfaces/image-generation.interface';
import { MessageBoxI } from '@interfaces/message-box.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-image-tunning-page',
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
  templateUrl: './image-tunning-page.component.html',
  styles: ``,
})
export default class ImageTunningPageComponent {
  private openAiServ = inject(GptService);

  public originalImage = signal<string | null>(null);
  private maksImage = signal<string | null>(null);

  isTyping = signal<boolean>(false);
  messages = signal<MessageImageI[]>([]);

  handleMessage(body: MessageBoxI) {
    this.isTyping.set(true);

    this.messages.update((chats) => [
      ...chats,
      { text: body.prompt, isIa: false, imageUrl: '' },
    ]);

    let bodyReq: ImageGenerationReqI = {
      prompt: body.prompt,
    };

    if (this.maksImage() && this.originalImage()) {
      bodyReq = {
        ...bodyReq,
        maskImage: this.maksImage()!,
        originalImage: this.originalImage()!,
      };
    }

    this.openAiServ.imageGeneration(bodyReq).subscribe({
      next: ({ imageUrl }) => {
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

  handleSetImage(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    this.maksImage.set(newImage);
  }

  handleGenerateVariation() {
    if (!this.originalImage()) return;

    this.isTyping.set(true);

    this.openAiServ
      .imageVariation(this.originalImage()!)
      .pipe(map((res) => res.imageUrl))
      .subscribe({
        next: (imageUrl) => {
          this.messages.update((chats) => [
            ...chats,
            { text: '', isIa: true, imageUrl },
          ]);
          this.isTyping.set(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
