import { Injectable } from '@angular/core';
import { GptService } from '@core/services/gpt.service';
import { MessageBoxI } from '@interfaces/message-box.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrthographyService {
  constructor(private readonly gpt: GptService) {}

  orthographyCheck(body: MessageBoxI) {
    return this.gpt
      .orthographyCheck(body)
      .pipe(
        catchError(() =>
          throwError(() => new Error('Error al corregir ortografía'))
        )
      );
  }
}
