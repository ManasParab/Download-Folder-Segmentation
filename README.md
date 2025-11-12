# 🧠 Automated Downloads Organizer  
### Repository: [Download-Folder-Segmentation](https://github.com/ManasParab/Download-Folder-Segmentation.git)  
**Main Script:** `organizer.js`

---

## 🚀 Overview

**Automated Downloads Organizer** is a lightweight Node.js utility that automatically sorts files downloaded to your **Downloads** folder into properly categorized subfolders (e.g., **Documents**, **Pictures**, **Videos**, **Archives**, and **Code**).

Whenever a new file is added to your Downloads folder, the script detects it in real time, determines its type based on the file extension, and moves it into the corresponding destination folder automatically.

This ensures your Downloads directory stays clean and organized — without requiring manual sorting.

---

## ✨ Key Features

- 🔍 **Real-time file monitoring** using Node’s `fs.watch()`  
- 🧩 **Smart file categorization** — routes files into predefined destinations based on their extension  
- 🗂️ **Auto-creates destination folders** if they don’t exist  
- ⚡ **No dependencies** — uses only built-in Node.js modules (`fs`, `path`, `os`)  
- 🧠 **Async and error-safe** — handles temporary files, permissions, and missing files gracefully  
- 🧱 **Easily customizable** — just modify one object (`targetFolders`) to define your own structure  

---

## 🧩 How It Works

1. The script uses Node’s `os.homedir()` and `path.join()` to locate your system’s default Downloads folder.  
2. A `targetFolders` object maps file extensions (like `.pdf`, `.jpg`, `.zip`) to specific destination folders.  
3. A file watcher (`fs.watch`) monitors the Downloads directory for new file creation (`rename` events).  
4. When a file is detected, it waits briefly (to ensure the file is fully written) and then checks if it exists.  
5. The script identifies the extension, creates the destination folder if missing, and moves the file using `fs.rename()`.  
6. If no matching rule is found, the file remains untouched in Downloads.

---

## 🧰 Prerequisites

- **Node.js** version **12+** (Recommended: v14 or higher)  
- No external dependencies — works entirely with built-in modules  

Check if Node is installed:
```bash
node -v
```

If you get an error, install Node.js from:  
👉 [https://nodejs.org](https://nodejs.org)

---

## ⚙️ Installation & Setup

### Step 1 — Clone the Repository
```bash
git clone https://github.com/ManasParab/Download-Folder-Segmentation.git
cd Download-Folder-Segmentation
```

### Step 2 — Run the Script
```bash
node organizer.js
```

You should see output similar to:
```
🚀 Automated organizer is now watching: /Users/YourUser/Downloads
Press Ctrl+C to stop.
```

> 💡 Tip: You can leave this script running in a background terminal window for continuous organization.

---

## 🧠 Example Folder Rules

Inside `organizer.js`, file extension rules are defined like this:

```js
const targetFolders = {
  // Images
  '.jpg': path.join(os.homedir(), 'Pictures', 'Images'),
  '.png': path.join(os.homedir(), 'Pictures', 'Images'),
  '.gif': path.join(os.homedir(), 'Pictures', 'Gifs'),

  // Documents
  '.pdf': path.join(os.homedir(), 'Documents', 'PDFs'),
  '.docx': path.join(os.homedir(), 'Documents', 'Word'),
  '.txt': path.join(os.homedir(), 'Documents', 'TextFiles'),

  // Archives
  '.zip': path.join(os.homedir(), 'Documents', 'Archives'),

  // Code
  '.js': path.join(os.homedir(), 'Documents', 'Code', 'JavaScript'),
  '.py': path.join(os.homedir(), 'Documents', 'Code', 'Python'),

  // Videos
  '.mp4': path.join(os.homedir(), 'Videos', 'Videos')
};
```

You can easily modify, remove, or add new extensions.  
> For example, to handle `.csv` files:
```js
'.csv': path.join(os.homedir(), 'Documents', 'Spreadsheets'),
```

---
## 🔒 Security & Privacy

- The script operates **entirely locally** — no internet or external API access.  
- No telemetry, data collection, or external dependencies.  
- Avoid targeting sensitive or system-protected directories.  

---

## 🧾 License

**MIT License © 2025 Manas Parab**  
You’re free to modify, distribute, or use this script in personal or commercial projects — just keep the original author credit.

---

## 💬 Contributing

Contributions are highly welcome!

1. **Fork** the repo  
2. Create your branch:  
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Commit** your changes:  
   ```bash
   git commit -m "Added new feature"
   ```
4. **Push** to your branch:  
   ```bash
   git push origin feature/my-feature
   ```
5. **Submit a Pull Request** on GitHub

---

## 👨‍💻 Author

**Manas Parab**  
📦 GitHub: [ManasParab](https://github.com/ManasParab)  

---

## ⭐ Support

If you find this project useful, please consider **starring the repository** on GitHub — it helps others discover it!

👉 [https://github.com/ManasParab/Download-Folder-Segmentation](https://github.com/ManasParab/Download-Folder-Segmentation)

---

### 🧠 Final Note

This project is intentionally designed to be **minimal, educational, and practical** — a perfect introduction to Node.js filesystem automation.  
With just ~100 lines of code, it demonstrates async file handling, folder monitoring, and basic system automation — all without dependencies.

Stay organized. Stay productive. 🚀
