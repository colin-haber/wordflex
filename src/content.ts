import { Answer } from "./wordex/Answer";
import { Difficulty } from "./wordex/Difficulty";
import { Game } from "./wordex/Game";

function getGame(): Game {
  let path = location.pathname.split("/");
  let difficulty = path[path.length - 1] as Difficulty;
  let hint = document.querySelector("[class^=\"Home_puzzle\"]").textContent;
  let seconds = JSON.parse(localStorage[`time-${difficulty}`])[1] as number;
  let words = JSON.parse(localStorage[`answers-${difficulty}`])[1] as string[];
  let skips = JSON.parse(localStorage[`showing-${difficulty}`])[1] as boolean[];
  let answers = words.map((word, i) => new Answer(word, skips[i]));
  let game = new Game(difficulty, hint, seconds, answers);
  return game;
}
function isGame(): boolean {
  return location.toString().match(/^https:\/\/wordex.shadaj.me\/game\//) !== null;
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse(isGame() ? getGame() : undefined);
});
