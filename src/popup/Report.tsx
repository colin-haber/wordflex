import React, { useState } from "react";
import { Game } from "../wordex/Game";
import { Placeholder } from "./Placeholder";
import { Difficulty } from "../wordex/Difficulty";
import { Answer } from "../wordex/Answer";
type Props = {
  game: Game;
  style: Style;
};
export function Report({ game, style }: Props) {
  let t = chrome.i18n.getMessage;
  let areWords = game.answers.find((answer) => answer.status != "unanswered");
  let maxWordLength = Math.max(...game.answers.map(answer => answer.word.length));
  let spoilerLength = areWords ? maxWordLength : game.hint.length;
  function getDifficultyEmoji(difficulty: Difficulty) {
    let emoji: string;
    if (difficulty == "easy") {
      emoji = "🟢";
    } else if (difficulty == "medium") {
      emoji = "🟠";
    } else if (difficulty == "hard") {
      emoji = "🔴";
    } else if (difficulty == "endless") {
      emoji = "🟣";
    }
    return <>{emoji}</>;
  }
  function getAnswerEmoji(answer: Answer) {
    let emoji: string;
    if (answer.status == "correct") {
      emoji = "🟢";
    } else if (answer.status == "skipped") {
      emoji = "🟠";
    } else if (answer.status == "incorrect") {
      emoji = "🔴";
    } else if (answer.status == "unanswered") {
      emoji = "⚪";
    }
    return <>{emoji}</>;
  }
  function getSpoilerizedWord(answer: Answer) {
    return style == "discord" ? <code>||`{answer.word.padEnd(spoilerLength, "\u00A0")}`||</code> : "█".repeat(spoilerLength);
  }
  return (
    <div className="row placeholder-glow">
      <div className="col">
        <div className="card">
          <div className="card-header">
            {t(`style_${style}`)}
          </div>
          <div id="report" className="card-body">
            <Placeholder test={game}>
              {game.difficulty == "endless"
                ? <div>Wordex</div>
                : <div>Wordex {new Date().toISOString().split("T")[0]}</div>
              }
            </Placeholder>
            <Placeholder test={game}>
              <div>{getDifficultyEmoji(game.difficulty)} {style == "discord" ? <code>`{game.hint}`</code> : game.hint}</div>
            </Placeholder>
            <Placeholder test={game}>
              <div>⏱️ {game.duration}</div>
            </Placeholder>
            <Placeholder rows={5} test={game}>
              <div>
                {game.answers.map((answer, index) => (
                  <div key={index}>{getAnswerEmoji(answer)} {getSpoilerizedWord(answer)}</div>
                ))}
              </div>
            </Placeholder>
          </div>
        </div>
      </div>
    </div>
  );
}
