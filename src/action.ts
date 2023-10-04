import "bootstrap/scss/bootstrap.scss";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./action.scss";
import { Popup } from "./popup/Popup";
import { Game } from "./wordex/Game";
import { Message } from "./Message";
let doc = document.documentElement;
let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
doc.setAttribute("data-bs-theme", theme);
let el = document.createElement("div");
el.id = "react";
let root = createRoot(document.body.appendChild(el));
chrome.tabs.query({ active: true, lastFocusedWindow: true })
  .then(async ([tab]) => {
    async function setColorSchemesEnabled(enabled: boolean) {
      await chrome.storage.local.set({ colorSchemesEnabled: enabled });
      await chrome.tabs.sendMessage<any, Game>(tab.id, {
        action: "setColorSchemesEnabled",
        content: enabled,
      } as Message<null>);
    }
    let game = await chrome.tabs.sendMessage<any, Game>(tab.id, {
      action: "getGame",
      content: null,
    } as Message<null>);
    let storage = await chrome.storage.local.get(["colorSchemesEnabled"]);
    let colorSchemesEnabled = storage.colorSchemesEnabled as boolean;
    let report = React.createElement(Popup, { game, storage, colorSchemesEnabled, setColorSchemesEnabled });
    root.render(report);
  });
