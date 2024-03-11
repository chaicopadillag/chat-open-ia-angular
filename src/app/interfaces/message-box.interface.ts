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

export interface MessageBoxSelectI {
  prompt: string;
  select: string;
}

export interface MessageBoxTranslateI {
  prompt: string;
  lang: string;
}

export interface MessageBoxTextToAudioI {
  prompt: string;
  voice: string;
}

export interface SelectListI {
  key: string;
  value: string;
}
