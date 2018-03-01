# FAQ

## Table of Contents

* [How to update npm to latest version?](#how-to-update-npm-to-latest-version)
* [What version of node.js use?](#what-version-of-nodejs-use)
* [How to remove demo app?](#how-to-remove-demo-app)

---

<a name="how-to-update-npm-to-latest-version"></a>

## How to update npm to latest version?

1. Go to the folder with installed nodejs

```bash
cd "C:\Program Files\nodejs"
# or
cd "C:\Program Files (x86)\nodejs"
```

2. Install lattest version of npm

```bash
npm install npm@latest
```

<a name="what-version-of-nodejs-use"></a>

## What version of node.js use?

We recomended use nodejs version more than 6, but better use 7 or 8.

<a name="how-to-remove-demo-app"></a>

## How to remove demo app?

Run command in terminal `npm run cleanup`. This command run script [tools/removeDemo.js](../tools/removeDemo.js)
