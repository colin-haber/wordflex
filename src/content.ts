import { Message } from "./Message";
import { Answer } from "./wordex/Answer";
import { Difficulty } from "./wordex/Difficulty";
import { Game } from "./wordex/Game";
import { Status } from "./wordex/Status";

function getGame(): Game {
  let path = location.pathname.split("/");
  let difficulty = path[path.length - 1] as Difficulty;
  let hint = document.querySelector("[class^=\"Home_puzzle\"]").textContent;
  let seconds = JSON.parse(localStorage[`time-${difficulty}`])[1] as number;
  let inputs = Array.from(document.querySelectorAll<HTMLInputElement>("input[placeholder=\"enter a word\"]"));
  let answers = inputs.map(input => {
    let word = input.value;
    let status: Status = "unanswered";
    if (input.style.color == "green") {
      status = "correct";
    } else if (input.style.color == "rgb(255, 152, 0)") {
      status = "skipped";
    } else if (input.style.color == "red") {
      status = "incorrect";
    }
    return new Answer(word, status);
  });
  let game = new Game(difficulty, hint, seconds, answers);
  return game;
}
function isGame(): boolean {
  return location.toString().match(/^https:\/\/wordex.shadaj.me\/game\//) !== null;
}
chrome.storage.local.get(["colorSchemesEnabled"])
  .then(storage => {
    let style = document.documentElement.style;
    if (storage.colorSchemesEnabled as boolean) {
      style.colorScheme = "light dark";
    } else {
      style.removeProperty("color-scheme");
    }
  });
chrome.runtime.onMessage.addListener((message: Message<null | boolean>, sender, sendResponse) => {
  console.debug(message);
  if (message.action == "getGame") {
    sendResponse(isGame() ? getGame() : null);
  } else if (message.action == "setColorSchemesEnabled") {
    let enabled = message.content as boolean;
    let style = document.documentElement.style;
    if (enabled) {
      style.colorScheme = "light dark";
    } else {
      style.removeProperty("color-scheme");
    }
  }
});
