import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@app/env/environment';
import { OrthographyResponse } from '@core/interfaces/orthography.interface';
import { ProsConsDisscucerResponse } from '@core/interfaces/pros-cons.interface';
import { TranslatationResponse } from '@core/interfaces/translation.interface';
import {
  MessageBoxI,
  MessageBoxTranslateI,
} from '@interfaces/message-box.interface';
import { catchError, throwError } from 'rxjs';

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
}
