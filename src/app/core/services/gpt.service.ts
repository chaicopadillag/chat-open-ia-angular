import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@app/env/environment';
import {
  AssistantMessageI,
  AssistantReqI,
} from '@core/interfaces/assistant.interface';
import {
  AudioToTextBody,
  AuditoToTextResponse,
} from '@core/interfaces/audio-to-text.interface';
import {
  ImageGenerationReqI,
  ImageGenerationResI,
} from '@core/interfaces/image-generation.interface';
import { OrthographyResponse } from '@core/interfaces/orthography.interface';
import { ProsConsDisscucerResponse } from '@core/interfaces/pros-cons.interface';
import { TranslatationResponse } from '@core/interfaces/translation.interface';
import {
  MessageBoxI,
  MessageBoxTextToAudioI,
  MessageBoxTranslateI,
} from '@interfaces/message-box.interface';
import { catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GptService {
  private apiGpt: string = env.API_HOST_GPT;

  constructor(private http: HttpClient) {}

  orthographyCheck(body: MessageBoxI) {
    return this.http
      .post<OrthographyResponse>(`${this.apiGpt}/orthography-check`, body)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al corregir ortografía'))
        )
      );
  }

  prosConsStream(body: MessageBoxI) {
    return this.http
      .post(`${this.apiGpt}/pros-cons-stream`, body, {
        reportProgress: true,
        responseType: 'text',
        observe: 'events',
      })
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al procesar pros y contras stream'))
        )
      );
  }

  prosConsDiscusser(body: MessageBoxI) {
    return this.http
      .post<ProsConsDisscucerResponse>(
        `${this.apiGpt}/pros-cons-discusser`,
        body
      )
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al procesar pros y contras'))
        )
      );
  }

  translation(body: MessageBoxTranslateI) {
    return this.http
      .post<TranslatationResponse>(`${this.apiGpt}/translate`, body)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al intentar traducir texto'))
        )
      );
  }

  textToAudio(body: MessageBoxTextToAudioI) {
    return this.http
      .post(`${this.apiGpt}/text-to-audio`, body, {
        responseType: 'blob',
      })
      .pipe(
        map((blob) => URL.createObjectURL(blob)),
        catchError(() =>
          throwError(() => new Error('Error al generar texto a audio'))
        )
      );
  }

  getAudioById(fileId: string) {
    return this.http
      .get(`${this.apiGpt}/text-to-audio/${fileId}`, {
        responseType: 'blob',
      })
      .pipe(
        map((blob) => URL.createObjectURL(blob)),
        catchError(() =>
          throwError(() => new Error('Error al intentar obtener audio'))
        )
      );
  }

  audioToText(body: AudioToTextBody) {
    const formData = new FormData();

    formData.append('file', body.file);

    if (body?.prompt) {
      formData.append('prompt', body.prompt);
    }

    return this.http
      .post<AuditoToTextResponse>(`${this.apiGpt}/audio-to-text`, formData)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al intentar obtener audio'))
        )
      );
  }

  imageGeneration(body: ImageGenerationReqI) {
    return this.http
      .post<ImageGenerationResI>(`${this.apiGpt}/image-generation`, body)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al intentar generate image'))
        )
      );
  }

  imageVariation(image: string) {
    return this.http
      .post<ImageGenerationResI>(`${this.apiGpt}/image-variation`, { image })
      .pipe(
        catchError(() =>
          throwError(
            () => new Error('Error al intentar generar image variation')
          )
        )
      );
  }

  // * Assistant

  createThread() {
    const urlAssistant = this.apiGpt.replace('gpt', 'assistant');

    const thread = localStorage.getItem('thread');

    if (thread) return of({ id: thread });

    return this.http
      .post<{ id: string }>(`${urlAssistant}/create-thread`, {})
      .pipe(
        tap(({ id }) => localStorage.setItem('thread', id)),
        catchError(() => throwError(() => new Error('Error al generar thread')))
      );
  }

  userCuestion(body: AssistantReqI) {
    const urlAssistant = this.apiGpt.replace('gpt', 'assistant');

    return this.http
      .post<AssistantMessageI[]>(`${urlAssistant}/create-message`, body)
      .pipe(
        map((resp) =>
          resp.map((m) => ({ text: m.content, isIa: m.role === 'assistant' }))
        ),
        catchError(() =>
          throwError(
            () => new Error('Error al procesar la pregunta del usuario')
          )
        )
      );
  }
}
