import { OrthographyResponse } from '@core/interfaces/orthography.interface';

export interface MessageI {
  isIa: boolean;
  text: string;
  orthography?: OrthographyResponse;
}
export interface MessageBoxI {
  prompt: string;
  file?: File;
}

export interface MessageBoxTranslateI {
  prompt: string;
  lang: string;
}

export interface SelectListI {
  key: string;
  value: string;
}
