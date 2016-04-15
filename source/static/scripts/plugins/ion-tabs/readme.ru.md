![ion.tabs](_tmp/logo-ion-tabs.png)

> <a href="readme.md">English description</a> | Описание на русском

Легкий и удобный плагин для создания вкладок(табов) с поддержкой скинов.

***

* Версия: 1.0.2
* <a href="http://ionden.com/a/plugins/ion.tabs/">Страница проекта и демо</a>
* <a href="http://ionden.com/a/plugins/ion.tabs/ion.sound-1.0.2.zip">Скачать ZIP-архив</a>

## Описание
* Поддерживает несколько групп вкладок на одной странице.
* Генерирует события и выполняет функции обратного вызова.
* Поддерживает несколько видов сохранения позиции вкладок, в том числе и для нескольких групп на одной странице.
* Очень легкий в настройке и стилизации. Поддерживает скины.
* Имеет публичные методы для управления извне.
* Кроссбраузерная поддержка: Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)
* Плагин поддерживает устройства с touch-экраном (iPhone, iPad, etc.).
* Плагин свободно распространяется на условиях <a href="http://ionden.com/a/plugins/licence.html" target="_blank">лицензии MIT</a>.


## Зависимости
* <a href="http://jquery.com/" target="_blank">jQuery 1.7+</a>


## Использование
Подключаем библиотеки:
* jQuery
* ion.tabs.min.js

Подключаем стили:
* <a href="http://necolas.github.io/normalize.css/" target="_blank">normalize.min.css</a> (желательно, если он у вас еще не подключен)
* ion.tabs.css

Не забываем про скин. 2 скина включены в архив:
* ion.tabs.skinBordered.css
* ion.tabs.skinFlat.css


## Инициализация
Создаем следующую HTML стуктуру:
```html
<div class="ionTabs" id="tabs_1" data-name="Tabs_Group_name">
    <ul class="ionTabs__head">
        <li class="ionTabs__tab" data-target="Tab_1_name">Имя вкладки 1</li>
        <li class="ionTabs__tab" data-target="Tab_2_name">Имя вкладки 2</li>
        <li class="ionTabs__tab" data-target="Tab_3_name">Имя вкладки 3</li>
    </ul>
    <div class="ionTabs__body">
        <div class="ionTabs__item" data-name="Tab_1_name">
            Контент вкладки 1
        </div>
        <div class="ionTabs__item" data-name="Tab_2_name">
            Контент вкладки 2
        </div>
        <div class="ionTabs__item" data-name="Tab_3_name">
            Контент вкладки 3
        </div>

        <div class="ionTabs__preloader"></div>
    </div>
</div>
```

Чтобы запустить вкладки, вызовите $.ionTabs("селектор"):
```javascript
$.ionTabs("#tabs_1");                       // если одна группа вкладок
$.ionTabs("#tabs_1, #tabs_2, #tabs_3");     // если хотите запустить несколько групп вкладок
```


## Параметры
<table class="options">
    <thead>
        <tr>
            <th>Атрибут</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td><code>hash</code></td>
            <td>
                Не обязательный параметр, позволяет выбрать тип запоминания позиции вкладок:<br/>
                <code>hash</code> — сохраняет позицию вкладок в адресную строку в виде хэша (см. пример в адресной строке). Позволяет передавать позицию вкладок по ссылке.<br/>
                <code>storage</code> — сохраняет позицию вкладок в Local Storage. Позиция вкладок сохраняется только в пределах одного компьютера.<br/>
                <code>none</code> — позиция вкладок нигде не сохраняется, при обновлении страницы будет открыта первая вкладка в каждой группе.<br/>
            </td>
        </tr>
    </tbody>
</table>

## Функции обратного вызова и события
<table class="options">
    <thead>
        <tr>
            <th>Атрибут</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>onChange</td>
            <td>-</td>
            <td>Вызывается каждый раз при переключении вкладки, возвращает объект с названием группы, названием вкладки и ID атрибует выбранной вкладки.</td>
        </tr>
        <tr>
            <td>window.event <code>ionTabsChange</code></td>
            <td>-</td>
            <td>Либо вы можете подписаться на событие <code>ionTabsChange</code>.<br/>Событие получает тот же самый объект с данными что и функция <code>onChange</code>.</td>
        </tr>
    </tbody>
</table>


Пример иницилизации вкладок с параметрами:
```javascript
$.ionTabs("#tabs_1, #tabs_2", {
    type: "storage",                    // hash, storage или none
    onChange: function(obj){            // функция обратного вызова
        console.log(obj);
    }
});
```


Подписаться на событие переключения вкладок можно так:
```javascript
$(window).on("ionTabsChange", function(e, obj){
    console.log(obj.group);
    console.log(obj.tab);
    console.log(obj.tabId);
});
```


## Публичные методы
Переключение вкладки извне: <code>$.ionTabs.setTab(group, tab);</code>:
```javascript
$(".myButton").on("click", function(){
    $.ionTabs.setTab("Tabs_Group_name", "Tab_1_name");
});
```


### <a href="history.md">История обновлений</a>

***

#### Поддержите разработку плагинов серии Ion:

* Пожертвовать через сервис Pledgie: [![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)

* Пожертвовать напрямую через Paypal: https://www.paypal.me/IonDen

* Пожертвовать напрямую через Яндекс.Деньги: http://yasobe.ru/na/razrabotku
