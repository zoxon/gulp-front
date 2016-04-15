![ion.tabs](_tmp/logo-ion-tabs.png)

> English description | <a href="readme.ru.md">Описание на русском</a>

jQuery tabs plugin. Easy and well done tabs with many options and skin support

***

* Version: 1.0.2
* <a href="http://ionden.com/a/plugins/ion.tabs/en.html">Project page and demos</a>
* <a href="http://ionden.com/a/plugins/ion.tabs/ion.sound-1.0.2.zip">Download ZIP</a>

## Description
* Supports many groups of tabs at one page.
* Generate events and callbacks.
* Support many types of position saving, for each tabs group on the page.
* Very easy in set up and customisation. Has skin support.
* Has public methods for outside control.
* Cross-browser support: Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)
* Ion.Tabs supports touch-devices (iPhone, iPad, etc.).
* Ion.Tabs freely distributed under terms of <a href="http://ionden.com/a/plugins/licence-en.html" target="_blank">MIT licence</a>.


## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.7+</a>


## Usage
Import this libraries:
* jQuery
* ion.tabs.min.js

Add the following stylesheets to the page:
* <a href="http://necolas.github.io/normalize.css/" target="_blank">normalize.min.css</a> (If not already present)
* ion.tabs.css

Plus, a skin for the tabs. Two skins are included:
* ion.tabs.skinBordered.css
* ion.tabs.skinFlat.css


## Initialisation
Create this HTML structure:
```html
<div class="ionTabs" id="tabs_1" data-name="Tabs_Group_name">
    <ul class="ionTabs__head">
        <li class="ionTabs__tab" data-target="Tab_1_name">Tab 1 name</li>
        <li class="ionTabs__tab" data-target="Tab_2_name">Tab 2 name</li>
        <li class="ionTabs__tab" data-target="Tab_3_name">Tab 3 name</li>
    </ul>
    <div class="ionTabs__body">
        <div class="ionTabs__item" data-name="Tab_1_name">
            Tab 1 content
        </div>
        <div class="ionTabs__item" data-name="Tab_2_name">
            Tab 2 content
        </div>
        <div class="ionTabs__item" data-name="Tab_3_name">
            Tab 3 content
        </div>

        <div class="ionTabs__preloader"></div>
    </div>
</div>
```

To initialise tabs, call $.ionTabs("selector"):
```javascript
$.ionTabs("#tabs_1");                       // one tabs group
$.ionTabs("#tabs_1, #tabs_2, #tabs_3");     // if you have many tabs groups on the page
```


## Settings
<table class="options">
    <thead>
        <tr>
            <th>Property</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td><code>hash</code></td>
            <td>
                Optional property, choose position saving type:<br/>
                <code>hash</code> — save tabs position to the site url, using hash (see the example in the address bar). Allows to send tabs position via links.<br/>
                <code>storage</code> — save tabs position to the Local Storage. Tabs position is remembered only at one computer.<br/>
                <code>none</code> — don't save tabs position. Each time page reloads, the first tab of each group will be open.<br/>
            </td>
        </tr>
    </tbody>
</table>

## Callback and events
<table class="options">
    <thead>
        <tr>
            <th>Property</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>onChange</td>
            <td>-</td>
            <td>Calls each time you switch tabs, returns object with group name, active tab name and active tab ID.</td>
        </tr>
        <tr>
            <td>window.event <code>ionTabsChange</code></td>
            <td>-</td>
            <td>Or you can subscribe on <code>ionTabsChange</code> event.<br/>The event gets the same object as <code>onChange</code> callback.</td>
        </tr>
    </tbody>
</table>


An example of a tabs initialisation:
```javascript
$.ionTabs("#tabs_1, #tabs_2", {
    type: "storage",                    // hash, storage or none
    onChange: function(obj){            // callback
        console.log(obj);
    }
});
```


To subscribe on tabs change event you can do this:
```javascript
$(window).on("ionTabsChange", function(e, obj){
    console.log(obj.group);
    console.log(obj.tab);
    console.log(obj.tabId);
});
```


## Public methods
Switching tabs from outside: <code>$.ionTabs.setTab(group, tab);</code>:
```javascript
$(".myButton").on("click", function(){
    $.ionTabs.setTab("Tabs_Group_name", "Tab_1_name");
});
```


### <a href="history.md">Update history</a>

***

#### Support Ion-series plugins development:

* Donate through Pledgie service: [![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)

* Donate direct to my Paypal account: https://www.paypal.me/IonDen

* Donate direct to my Yandex.Money account: http://yasobe.ru/na/razrabotku
