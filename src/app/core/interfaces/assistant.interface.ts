export interface AssistantReqI {
  threadId: string;
  content: string;
}

export interface AssistantMessageI {
  role: Role;
  content: string;
}

export enum Role {
  Assistant = 'assistant',
  User = 'user',
}
