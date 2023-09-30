import { Answer } from "./Answer";
import { Difficulty } from "./Difficulty";

export class Game {
  public readonly difficulty: Difficulty;
  public readonly hint: string;
  public readonly answers: Answer[];
  public readonly seconds: number;
  public readonly duration: string;
  public constructor(difficulty: Difficulty, hint: string, seconds: number, answers: Answer[]) {
    this.difficulty = difficulty;
    this.hint = hint;
    this.seconds = seconds;
    this.answers = answers;
    this.duration = `${Math.floor(this.seconds / 60)}:${(this.seconds % 60).toString().padStart(2, "0")}`;
  }
}
