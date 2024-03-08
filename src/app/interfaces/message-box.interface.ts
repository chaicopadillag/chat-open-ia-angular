export interface MessageI {
  isIa: boolean;
  text: string;
  id?: string;
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
