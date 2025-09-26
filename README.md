# 🌈 colog (MVP)

#### **Pretty console log formatter for Node.js & Browser**
#### A lightweight utility to print JSON/TREE data structures in a more readable way ✨  

[![npm version](https://img.shields.io/npm/v/@treescript/colog.svg)](https://www.npmjs.com/package/@treescript/colog)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

---

## 🚀 Installation

```bash
# 📦 Using npm
npm install @treescript/colog

# 📦 Using Yarn
yarn add @treescript/colog

# 📦 Using pnpm
pnpm add @treescript/colog

```

🔗 Install directly from GitHub
```

npm install github:treescript/colog
```
---

🔥 Usage

```ts
import colog from "@treescript/colog"

// ▶️ Default (JSON)
colog({ id: 1, name: "moon" })

// 🌳 Tree view
colog({ id: 1, name: "moon" }, { view: "tree" })

// 🔀 JSON + Tree
colog({ nested: { hello: "world" } }, { view: "both" })

// ⏱️ With timestamp
colog({ id: 1 }, { time: true })
```
#### Works seamlessly in both browser and server (Node.js) consoles.

---
## ⚙️ Options

| 🏷️Option              |🔠 Type                           |🎯 Default      |📖 Description                   |
| ---------------- | ---------------------------- | -------- | -------------------- |
| **`view`**           | `"json" | "tree" | "both"` | `"json"` | Output Mode            |
| **`time`**           | `boolean`                    | `false`  | Show timestamp in the header         |
| **`depth`**          | `number \| null`             | `null`   | Maximum depth to print (null = unlimited)          |
| **`color`**          | `boolean`                    | `true`   | Enable / disable color output             |
| **`inlineMaxItems`** | `number`                     | `12`     | Maximum array items to keep inline |
| **`inlineMaxChars`** | `number`                     | `80`     | Max characters in a single-line array      |
| **`truncateAt`**     | `number`                     | `200`    | If array length exceeds this, it will be truncated  |
| **`headCount`**      | `number`                     | `48`     | Number of items to show at the start of a long array       |
| **`tailCount`**      | `number`                     | `12`     | Number of items to show at the end of a long array       |

---

## 📖 Example Output

```ts
# Sample Data

const data = {
  user: {
    id: 33,
    username: "moon_dev",
    profile: {
      nickname: "Moon",
      avatarUrl: "https://example.com/avatar.png",
      bio: "Full-stack developer & blogger",
    },
  },
  posts: Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1} Title`,
    content: `This is a sample content of post ${i + 1}.`,
    tags: ["typescript", "nextjs", "colog"],
    comments: Array.from({ length: 2 }, (_, j) => ({
      id: j + 1,
      author: `commenter_${j + 1}`,
      message: `Comment ${j + 1} on post ${i + 1}`,
      likes: Math.floor(Math.random() * 10),
    })),
  })),
}
```

### ❌ Without `colog`
#### ➡️ Server Console (Terminal) Output
```ts
console.log(data)
```
![Output](https://raw.githubusercontent.com/TreeScript/colog/refs/heads/main/assets/terminal-without.JPG)


#### ➡️ Web Console (Client) Output

![Output](https://raw.githubusercontent.com/TreeScript/colog/refs/heads/main/assets/web-without.JPG)

### ✅ With colog
### ➡️ Server Console (Terminal) Output - JSON Mode (default)
```ts
import colog from "@treescript/colog"

colog(data)
```
![Output](https://raw.githubusercontent.com/TreeScript/colog/refs/heads/main/assets/terminal-default.JPG)
### ➡️ Web Console (Client) Output - JSON Mode (default)
![Output](https://raw.githubusercontent.com/TreeScript/colog/refs/heads/main/assets/wet-default.JPG)

---

## 🤝 Contributing

### Bug reports and pull requests are welcome 🙌
##### Contact: coderkihoon@gmail.com

---

## 🔧 Code Style
### This project follows a strict code style:

#### - Language: TypeScript
#### - Linting: ESLint
#### - Formatting: Prettier
#### - Testing: Vitest

##### Please make sure your contributions adhere to these conventions.

---

## 📄 License

MIT ©Treescript
