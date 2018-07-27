# FAQ

## Table of Contents

- [FAQ](#faq)
  - [Table of Contents](#table-of-contents)
  - [How to update npm to latest version?](#how-to-update-npm-to-latest-version)
  - [What version of node.js use?](#what-version-of-nodejs-use)
  - [How to remove demo app?](#how-to-remove-demo-app)
  - [How to use jQuery and jQuery plugins?](#how-to-use-jquery-and-jquery-plugins)

---

<a name="how-to-update-npm-to-latest-version"></a>

## How to update npm to latest version?

1.  Go to the folder with installed nodejs

```bash
cd "C:\Program Files\nodejs"
# or
cd "C:\Program Files (x86)\nodejs"
```

2.  Install lattest version of npm

```bash
npm install npm@latest
```

<a name="what-version-of-nodejs-use"></a>

## What version of node.js use?

We recomended use nodejs version more than 6, but better use 7 or 8.

<a name="how-to-remove-demo-app"></a>

## How to remove demo app?

Run command in terminal `npm run cleanup`. This command run script [tools/removeDemo.js](../tools/removeDemo.js)

<a name="how-to-use-jquery-and-jquery-plugins"></a>

## How to use jQuery and jQuery plugins?

Create new module using `npm run amo` command or maually.

In javascript part of module for example `modules/slider/slider.js`

```js
// slider.js
import $ from "jquery";
import "ion-rangeslider"; // jQuery plugin

/**
 * Simple module
 *
 * @param {String} selector - DOM selector
 * @param {*} options - options for jQuery plugin
 * @returns jQuery plugin instance
 */
export default (selector, options) => {
  // You can rewrite default options here
  const defaultOptions = {
    grid: true
  };

  const mergedOptions = Object.assign({}, defaultOptions, options);

  return $(selector).ionRangeSlider(mergedOptions);
};
```

In main javascript file use this wrapper

```js
// main.js
import Slider from "@/modules/slider/slider";

Slider("#slider", {
  type: "double",
  min: 0,
  max: 1000,
  from: 200,
  to: 500
});
```

And finaly import plugin styles, if it needed

```styl
// slider.styl
@import "ion-rangeslider/css/ion.rangeSlider.css"

// your styles rewrite
```
