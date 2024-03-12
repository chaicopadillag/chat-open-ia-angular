export interface ImageGenerationReqI {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export interface ImageGenerationResI {
  imageUrl: string;
  urlOpenAi: string;
}
