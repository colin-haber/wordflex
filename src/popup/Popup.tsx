import React, { useState } from "react";
import { Game } from "../wordex/Game";
import { Report } from "./Report";
import { Icon } from "./Icon";
import "bootstrap/dist/js/bootstrap.bundle.js";
type Props = {
  game: Game;
}
export function Popup({ game }: Props) {
  return (
    <div className="container-fluid">
      <div className="row my-3">
        <div className="col">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#plaintext"><Icon id={"text-left"} /> {chrome.i18n.getMessage("style_plaintext")}</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#discord"><Icon id={"discord"} /> {chrome.i18n.getMessage("style_discord")}</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane show active" id="plaintext">
          <Report game={game} style={"plaintext"} />
        </div>
        <div className="tab-pane" id="discord">
          <Report game={game} style={"discord"} />
        </div>
      </div>
    </div>
  );
}
