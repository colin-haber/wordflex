import "bootstrap/scss/bootstrap.scss";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./action.scss";
import { Popup } from "./popup/Popup";
import { Game } from "./wordex/Game";
let doc = document.documentElement;
let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
doc.setAttribute("data-bs-theme", theme);
let el = document.createElement("div");
el.id = "react";
let root = createRoot(document.body.appendChild(el));
chrome.tabs.query({active: true, lastFocusedWindow: true})
  .then(async ([tab]) => {
    let game = await chrome.tabs.sendMessage<any, Game>(tab.id, {});
    let storage = await chrome.storage.local.get(["style"]);
    let report = React.createElement(Popup, { game, storage });
    root.render(report);
  });
