chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    let rules: chrome.events.Rule[] = [
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlMatches: "^https?://wordex.shadaj.me/",
            }
          }),
        ],
        actions: [
          new chrome.declarativeContent.ShowAction(),
        ],
      },
    ];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
