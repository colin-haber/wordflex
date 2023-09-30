import { Status } from "./Status";

export class Answer {
  public readonly word: string;
  protected readonly wasSkipped: boolean;
  public readonly status: Status;
  public constructor(word: string, wasSkipped: boolean = false) {
    this.word = word;
    this.wasSkipped = wasSkipped;
    if (this.word) {
      this.status = this.wasSkipped ? "skipped" : "answered";
    } else {
      this.status = "unanswered";
    }
  }
}
