import { Injectable } from '@angular/core';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxI } from '@interfaces/message-box.interface';
import { Subject, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProsConsService {
  constructor(private readonly gpt: GptService) {}

  prosConsStream(body: MessageBoxI, abortSignal: Subject<void>) {
    return this.gpt
      .prosConsStream(body, abortSignal)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al procesar pros y contras stream'))
        )
      );
  }

  prosConsDiscusser(body: MessageBoxI) {
    return this.gpt
      .prosConsDiscusser(body)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al procesar pros y contras'))
        )
      );
  }
}
