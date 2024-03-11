import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@app/env/environment';
import {
  AudioToTextBody,
  AuditoToTextResponse,
} from '@core/interfaces/audio-to-text.interface';
import { OrthographyResponse } from '@core/interfaces/orthography.interface';
import { ProsConsDisscucerResponse } from '@core/interfaces/pros-cons.interface';
import { TranslatationResponse } from '@core/interfaces/translation.interface';
import {
  MessageBoxI,
  MessageBoxTextToAudioI,
  MessageBoxTranslateI,
} from '@interfaces/message-box.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GptService {
  private apiGpt = env.API_HOST_GPT;

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
}
