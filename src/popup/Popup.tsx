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
  let styles = {
    plaintext: (<Icon id={"text-left"} />),
    discord: (<Icon id={"discord"} />),
  }
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
    <div className="container-fluid p-2">
      <div className="row mb-2">
        <div className="col">
          <div className="btn-toolbar flex-nowrap justify-content-between">
            <div className="btn-group me-5">
              { Object.entries(styles).map(([s, icon], index) => (
                <button key={index} className={`btn ${style === s ? "btn-primary" : "btn-outline-primary"}`} title={t(`style_${s}`)} onClick={() => setStyle(s as Style)}>{icon}</button>
              )) }
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-primary text-nowrap position-relative" onClick={handleCopyClicked}>
                <Icon id={"clipboard"} />
                <> {t("action_copy")}</>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Report game={game} style={style} />
    </div>
  );
}
