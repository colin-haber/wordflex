import React, { useEffect, useState } from "react";
import { Game } from "../wordex/Game";
import { Report } from "./Report";
import { Icon } from "./Icon";
import "bootstrap/dist/js/bootstrap.bundle.js";
type Props = {
  game: Game;
  storage: { [key: string]: any; };
};
export function Popup({ game, storage }: Props) {
  let [isFirstRender, setIsFirstRender] = useState(true);
  let t = chrome.i18n.getMessage;
  let [style, setStyle] = useState((storage.style || "plaintext") as Style);
  useEffect(() => {
    if (!isFirstRender) {
      chrome.storage.local.set({ style });
    }
  }, [style]);
  async function handleCopyClicked(_event: React.MouseEvent<HTMLButtonElement>) {
    let tab = document.querySelector<HTMLDivElement>("div#report");
    await navigator.clipboard.writeText(tab.innerText);
  }
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  });
  return (
    <div className="container-fluid p-0">
      <div className="row my-3">
        <div className="col">
          <ul className="nav nav-tabs flex-nowrap px-3">
            <li className="nav-item">
              <button className={`nav-link ${style === "plaintext" ? "active" : ""}`} onClick={() => setStyle("plaintext")}><Icon id={"text-left"} /></button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${style === "discord" ? "active" : ""}`} onClick={() => setStyle("discord")}><Icon id={"discord"} /></button>
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
      <Report game={game} style={style} />
    </div>
  );
}
