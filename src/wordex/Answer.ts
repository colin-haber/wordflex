import { Status } from "./Status";

export class Answer {
  public readonly word: string;
  public readonly status: Status;
  public constructor(word: string, status: Status) {
    this.word = word;
    this.status = status;
  }
}
