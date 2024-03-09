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

export interface MessageBoxI {
  prompt: string;
  file?: File;
}

export interface MessageBoxWithSelectI {
  prompt: string;
  select?: File;
}

export interface SelectListI {
  key: string;
  value: string;
}
