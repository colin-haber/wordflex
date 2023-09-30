import "bootstrap/scss/bootstrap.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import "./action.scss";
import { Popup } from "./popup/Popup";
import { Game } from "./wordex/Game";
let el = document.createElement("div");
el.id = "react";
let root = createRoot(document.body.appendChild(el));
(async () => {
  let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  let game = await chrome.tabs.sendMessage<any, Game>(tab.id, {});
  let report = React.createElement(Popup, { game });
  root.render(report);
})();
