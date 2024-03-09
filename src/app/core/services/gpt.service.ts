import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@app/env/environment';
import { OrthographyResponse } from '@core/interfaces/orthography.interface';
import { MessageBoxI } from '@interfaces/message-box.interface';
import { Subject, takeUntil } from 'rxjs';
import { ProsConsDisscucerResponse } from '../interfaces/pros-cons.interface';

@Injectable({ providedIn: 'root' })
export class GptService {
  private apiGpt = env.API_HOST_GPT;

  constructor(private http: HttpClient) {}

  orthographyCheck(body: MessageBoxI) {
    return this.http.post<OrthographyResponse>(
      `${this.apiGpt}/orthography-check`,
      body
    );
  }

  prosConsStream(body: MessageBoxI, abortSignal: Subject<void>) {
    return this.http
      .post(`${this.apiGpt}/pros-cons-stream`, body, {
        reportProgress: true,
        responseType: 'text',
        observe: 'events',
      })
      .pipe(takeUntil(abortSignal));
  }

  prosConsDiscusser(body: MessageBoxI) {
    return this.http.post<ProsConsDisscucerResponse>(
      `${this.apiGpt}/pros-cons-discusser`,
      body
    );
  }
}
