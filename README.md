# 🤖 ChatGPT Explainer Chrome Extension

Explain any passage on the web — just highlight, right-click, and let ChatGPT break it down. ✨

---

## ✨ Features
- **Context-menu action** – Adds **“Explain this with ChatGPT”** when text is selected.  
- **One-click workflow** – Opens ChatGPT in a new tab pre-filled with the selection and source URL.  
- **Smart truncation** – Clips selections longer than **2048 characters** and appends an ellipsis (`…`).  
- **🔒 Privacy-friendly** – No data is stored, logged, or sent anywhere except to ChatGPT in your own browser session.  
- **Manifest V3** – Modern, service-worker-based implementation that works in Chrome, Edge, Brave, & other Chromium browsers.

---

## 🛠️ Installation (Developer Mode)

1. **Download / Clone this repo**

   ```bash
   todo
   ```

## Project Structure
chromium-extension-chatgpt-explainer/
├── background.js   # Service-worker code: context-menu & tab logic
├── manifest.json   # Extension manifest (MV3)
└── README.md       # This file

## 🧑‍💻 Development
Hot-reload – After editing code, click the ⟳ Reload icon on the chrome://extensions page.

Logging – Use console.log inside background.js; view output in Extensions → Service Worker devtools.

Roadmap / Ideas
[ ] Options page for custom prompt templates
[ ] Keyboard shortcut support
[ ] Update selection limit

Contributions & PRs welcome! 🚀
