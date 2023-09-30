import React, { useEffect, useState } from "react";
import { Game } from "../wordex/Game";
import { Report } from "./Report";
import { Icon } from "./Icon";
import "bootstrap/dist/js/bootstrap.bundle.js";
type Props = {
  game: Game;
}
export function Popup({ game }: Props) {
  let t = chrome.i18n.getMessage;
  async function handleCopyClicked(_event: React.MouseEvent<HTMLButtonElement>) {
    let tab = document.querySelector<HTMLDivElement>("#styles div.tab-pane.active");
    await navigator.clipboard.writeText(tab.innerText);
  }
  return (
    <div className="container-fluid p-0">
      <div className="row my-3">
        <div className="col">
          <ul className="nav nav-tabs flex-nowrap px-3">
            <li className="nav-item">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#plaintext"><Icon id={"text-left"} /></button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#discord"><Icon id={"discord"} /></button>
            </li>
            <li className="nav-item flex-grow-1 text-end ms-5">
              <button type="button" className="btn btn-primary text-nowrap position-relative" onClick={handleCopyClicked}>
                <Icon id={"clipboard"} />
                <> {t("action_copy")}</>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content mb-3 px-3" id="styles">
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
