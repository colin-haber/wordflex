export type Message<T> = {
  action: string;
  content?: T;
  error?: string;
};
