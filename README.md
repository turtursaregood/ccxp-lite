<h1 align="center">ccxpLite</h1>

<img src="demo/sidebar/login_dark_mode_demo.png" alt="ccxpLite demo image" >

![Original CCXP to ccxpLite: login and homepage](docs/assets/showcase.svg)

A lightweight browser extension that improves the usability and navigation experience of the NTHU Academic Information System ([CCXP](https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/)).

## Features

- Design overhaul for core pages
- Let you pin frequently used functions for quick access
- Login decaptcha with 99.95%+ accuracy (also work for CCXP OAuth, used in [eLearn](https://elearn.nthu.edu.tw/) and [eeclass](https://eeclass.nthu.edu.tw/))
- Automatic multi-day work-hour registration
- Dark mode for improved visual comfort in low-light conditions

## Installation

- [Google Web Store](https://chromewebstore.google.com/detail/glcnfmnbmknbphfgjgbokbbchahmiakk?utm_source=item-share-cb) (dark mode not available)
- [Firebox Add-ons](https://addons.mozilla.org/zh-TW/firefox/addon/ccxplite/) (dark mode not available)

## Demo

| Screen            | Sidebar Mode (Dark Mode Disabled)                                                                             | Sidebar Mode (Dark Mode Enabled)                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Login             | <img src="demo/sidebar/login.png" alt="Sidebar mode login screen" height="200">                               | <img src="demo/sidebar/dark_mode/login.png" alt="Sidebar mode login screen" height="200">                               |
| Main              | <img src="demo/sidebar/main.png" alt="Sidebar mode main screen" height="200">                                 | <img src="demo/sidebar/dark_mode/main.png" alt="Sidebar mode main screen" height="200">                                 |
| Category Expanded | <img src="demo/sidebar/main-expanded.png" alt="Sidebar mode expanded main screen" height="200">               | <img src="demo/sidebar/dark_mode/main-expanded.png" alt="Sidebar mode expanded main screen" height="200">               |
| Funtion Selected  | <img src="demo/sidebar/select-courses-selected.png" alt="Sidebar mode 網路選課 selected screen" height="200"> | <img src="demo/sidebar/dark_mode/select-courses-selected.png" alt="Sidebar mode 網路選課 selected screen" height="200"> |

## Decaptcha

The extension bundles decaptcha models from [ccxpDecaptcha](https://github.com/sago-cream/ccxp-decaptcha) and runs inference locally in the content script.

## Design system

Browse the [Storybook component catalog](https://ccxplite.hsichen.dev/storybook/).

## Contributing

Contributions are welcome. Please read the [contribution guide](CONTRIBUTING.md) before opening a pull request. Report security and privacy issues according to our [security policy](.github/SECURITY.md).

## 手動安裝（從 GitHub 下載未上架版本）

> [!WARNING]
> **以下內容為 AI 生成且未經完整測試，僅供參考：**

若擴充功能尚未上架至應用程式商店，或欲體驗最新版本，可透過以下步驟從 GitHub 下載並手動安裝到瀏覽器（以 Chrome / Edge 為例）：

### 1. 從 GitHub 下載檔案

依專案提供的產物選擇合適的下載方式：

- **途徑 A：從 Releases 下載（推薦）**
  1. 至 GitHub 專案首頁，點選右側的 **Releases**。
  2. 在最新版本（Latest）下方的 **Assets** 區塊，下載已打包構建的 `.zip` 檔案（如 `extension.zip` 或 `dist.zip`）。
  3. 解壓縮至電腦中的固定資料夾（**請勿放在暫存資料夾，若刪除或移動該資料夾，擴充程式將無法運作**）。
- **途徑 B：從 GitHub Actions 下載**
  1. 至專案的 **Actions** 分頁，點擊最近一次成功完成的 Workflow。
  2. 於頁面下方的 **Artifacts** 區塊下載構建壓縮檔並解壓縮。
- **途徑 C：下載原始碼自行編譯**
  1. 點擊專案首頁綠色的 **Code** 按鈕選擇 **Download ZIP**（或使用 `git clone`）。
  2. 因本專案包含編譯流程，下載後需在本地終端機執行相應的依賴安裝與構建指令（例如 `bun install` 與 `bun run build:crx`），產生包含 `manifest.json` 的輸出資料夾（如 `dist/crx/unpacked`）。

### 2. 在瀏覽器中載入擴充程式

1. **開啟擴充功能管理頁面**：
   - Chrome：在網址列輸入 `chrome://extensions/`
   - Edge：在網址列輸入 `edge://extensions/`
2. **開啟「開發者模式」（Developer mode）**（位於頁面右上角）。
3. **點擊「載入未封裝項目」（Load unpacked）**（位於頁面左上角）。
4. **選擇資料夾**：選取包含 `manifest.json` 的解壓目錄或構建輸出目錄（例如 `dist/crx/unpacked`）。
5. 安裝完成後，可於瀏覽器工具列將擴充功能釘選以便使用。

### 3. 注意事項

- **資料夾不可刪除或移動**：瀏覽器是以未封裝形式直接讀取該資料夾內容，若路徑變更或檔案遺失，擴充功能會報錯失效。
- **更新方式**：手動載入的擴充程式不會自動更新。若有新版本釋出，需重新下載並覆蓋檔案，再至 `chrome://extensions/` 點擊卡片上的「重新載入」（🔄）按鈕。
