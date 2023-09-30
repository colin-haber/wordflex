import React from "react";
import { createRoot } from "react-dom/client";
import { Report } from "./popup/Report";
import "bootstrap/scss/bootstrap.scss";
import "./action.scss";
import { Game } from "./wordex/Game";
let el = document.createElement("div");
el.id = "react";
let root = createRoot(document.body.appendChild(el));
(async () => {
  let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  let game = await chrome.tabs.sendMessage<any, Game>(tab.id, {});
  let report = React.createElement(Report, { game, mode: "discord" });
  root.render(report);
})();
