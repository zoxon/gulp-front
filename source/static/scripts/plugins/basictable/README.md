# Basic Table

A simple lightweight jQuery responsive table library. A library to setup tables for a basic responsive table stucture. Utilizing the techniques of http://css-tricks.com/responsive-data-tables/. This is to assists in those situations where the users don't necessarily have access or capacity to modify HTML such as input from a WYSIWYG.

**[View Demo](http://www.jerrylow.com/basictable/demo/)**

## Options

### breakpoint

`integer` `default: 568`

Define the breakpoint (viewport's width) when the table will engage in responsive mode. 

### contentWrap

`boolean` `default: true`

Wraps the original content within the cell in a span with class .bt-content, to help with CSS selection.

### forceResponsive

`boolean` `default: true`

The library will always force the table into responsive mode once the breakpoint is met. If this is set to false the table will only change mode when the table itself is larger than its immediate parent's inner width.

### noResize

`boolean` `default: false`

Disable Basic Table's JS resize. The table won't engage in responsive mode unless media query or another resize bind outside of Basic Table is defined.

### tableWrap

`boolean` `default: false`

When the library is initialize create a div wrapper around the table with class .bt-wrapper. This wrapper will toggle an active class when the table mode changes.

## Methods

### start

Engage the table in responsive mode. This method can only run after the table has been initialized.

```js
$('table').basictable('start');
```

### stop

Toggle the table back to normal mode, removing the responsive look. This does not destory the Basic Table data and wrappers. The table will still work once the breakpoint is met.

```js
$('table').basictable('stop');
```

### destroy

Destroy the the responsive bind on the table. This will remove all data and generated wrappers from the table, returning it to its initial state.

```js
$('table').basictable('destroy');
```
