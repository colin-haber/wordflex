import React, { useEffect, useState } from "react";
import { Game } from "../wordex/Game";
import { Report } from "./Report";
import { Icon } from "./Icon";
import "bootstrap/dist/js/bootstrap.bundle.js";
type Props = {
  game: Game;
  storage: { [key: string]: any; };
  colorSchemesEnabled: boolean;
  setColorSchemesEnabled: (enabled: boolean) => void;
};
export function Popup({ game, storage, colorSchemesEnabled, setColorSchemesEnabled }: Props) {
  let [csEnabled, setCsEnabled] = useState(colorSchemesEnabled);
  useEffect(() => {
    setColorSchemesEnabled(csEnabled);
  }, [csEnabled]);
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
    let tab = document.querySelector<HTMLElement>("#report");
    await navigator.clipboard.writeText(tab.innerText);
  }
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  });
  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 pt-2 px-2">
        <div className="col">
          <div className="btn-toolbar flex-nowrap justify-content-between">
            <div className="btn-group me-5">
              {Object.entries(styles).map(([s, icon], index) => (
                <button key={index} className={`btn ${style === s ? "btn-primary" : "btn-outline-primary"}`} disabled={!game} title={t(`style_${s}`)} onClick={() => setStyle(s as Style)}>{icon}</button>
              ))}
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-primary text-nowrap position-relative" disabled={!game} onClick={handleCopyClicked}>
                <Icon id={"clipboard"} />
                <> {t("action_copy")}</>
              </button>
            </div>
          </div>
        </div>
      </div>
      { game
        ? <Report game={game} style={style} />
        : <div className="row mb-2 px-2">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <p className="mb-0">Select a difficulty to share your game.</p>
                </div>
              </div>
            </div>
          </div>
      }
      <div className="row">
        <div className="col">
        <div className="accordion accordion-flush">
          <div className="accordion-item">
            <div className="accordion-header">
              <button className="accordion-button collapsed p-2 border-top" data-bs-toggle="collapse" data-bs-target="#settings">Settings</button>
            </div>
            <div id="settings" className="accordion-collapse collapse">
              <div className="accordion-body p-2">
                <p className="form-check form-check-reverse form-switch text-nowrap d-flex justify-content-between">
                  <label className="form-check-label">Dark mode support</label>
                  <input className="form-check-input" type="checkbox" checked={csEnabled} onChange={(ev) => setCsEnabled(ev.currentTarget.checked)} />
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
