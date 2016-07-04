// Ion.Tabs
// version 1.0.2 Build: 17
// © 2013 Denis Ineshin | IonDen.com
//
// Project page:    http://ionden.com/a/plugins/ion.tabs/en.html
// GitHub page:     https://github.com/IonDen/ion.tabs
//
// Released under MIT licence:
// http://ionden.com/a/plugins/licence-en.html
// =====================================================================================================================

(function ($, document, window, location) {

    if ($.ionTabs) {
        return;
    }



    var settings = {},
        tabs = {},
        url = {},
        urlString,
        i,
        temp,

        $window = $(window);



    // Local Storage
    var storage = (function () {
        try {
            if (window.localStorage && window.localStorage !== null) {
                return {
                    save: function (param, key) {
                        if (typeof key === "object") {
                            key = JSON.stringify(key);
                        }
                        try {
                            localStorage.setItem(param, key);
                        } catch (e) {
                            if (e === "QUOTA_EXCEEDED_ERR") {
                                localStorage.clear();
                                localStorage.setItem(param, key);
                            }
                        }
                    },
                    load: function (param) {
                        try {
                            return JSON.parse(localStorage.getItem(param));
                        } catch (e) {
                            return localStorage.getItem(param);
                        }
                    },
                    del: function (param) {
                        localStorage.removeItem(param);
                    }
                };
            }
        } catch (e) {
            return {
                save: function () {
                    return null;
                },
                load: function () {
                    return null;
                },
                del: function () {
                    return null;
                }
            };
        }
        return null;
    }());




    // Url
    var getUrl = function () {
        if (settings.type === "hash") {
            urlString = location.hash;
        }
        if (settings.type === "storage") {
            urlString = storage.load(location.hostname + "__ionTabsPosition");
        }

        if (urlString) {
            urlString = urlString.split("|");

            if (urlString.length > 1) {
                for (i = 1; i < urlString.length; i += 1) {
                    temp = urlString[i].split(":");
                    url[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
                }
            }

            urlString = "";
        }
    };




    // Tabs engine
    var Tabs = function (container) {
        this.container = container;
    };
    Tabs.prototype = {
        init: function () {
            var $container = this.container,
                $tabs = $container.find("." + settings.baseClass + "__tab"),
                $items = $container.find("." + settings.baseClass + "__item"),
                $preloader = $container.find("." + settings.baseClass + "__preloader"),
                $this,

                name = $container.data("name"),
                id;

            $tabs.each(function () {
                $this = $(this);
                id = "Button__" + name + "__" + $this.data("target");
                $this.prop("id", id);
            });

            $items.each(function () {
                $this = $(this);
                id = "Tab__" + name + "__" + $this.data("name");
                $this.prop("id", id);
            });


            $tabs.on("click.ionTabs", function(e){
                e.preventDefault();
                showPreloader();
                setTab($(this).data("target"));
            });


            var setTab = function (target) {
                target = decodeURIComponent(target);
                id = "#Button__" + name + "__" + target;
                $(id).addClass(settings.baseClass + "__tab_state_active").siblings().removeClass(settings.baseClass + "__tab_state_active");

                id = "#Tab__" + name + "__" + target;
                $(id).addClass(settings.baseClass + "__item_state_active").siblings().removeClass(settings.baseClass + "__item_state_active");

                hidePreloader();
                setUrl(target);


                // trigger event and execute callback
                $window.trigger("ionTabsChange", {
                    group: name,
                    tab: target,
                    tabId: id
                });

                if (typeof settings.onChange === "function") {
                    settings.onChange({
                        group: name,
                        tab: target,
                        tabId: id
                    });
                }
            };

            var setUrl = function (target) {
                var prop;
                url[name] = target;
                urlString = "tabs";

                for (prop in url) {
                    if (url.hasOwnProperty(prop)) {
                        urlString += "|" + encodeURIComponent(prop) + ":" + encodeURIComponent(url[prop]);
                    }
                }

                if (settings.type === "hash") {
                    location.hash = urlString;
                }
                if (settings.type === "storage") {
                    storage.save(location.hostname + "__ionTabsPosition", urlString);
                }
            };

            var showPreloader = function () {
                $preloader[0].style.display = "block";
            };

            var hidePreloader = function () {
                $preloader[0].style.display = "none";
            };


            // Set tabs at start
            if (url[name]) {
                setTab(url[name]);
            } else {
                setTab($tabs.eq(0).data("target"));
            }

            // Public
            this.setTab = function (name) {
                setTab(name);
            };
        }
    };



    // Plugin methods
    $.ionTabs = function (selector, options) {
        if (!selector) {
            return;
        }

        var $this;

        settings = $.extend({
            type: "hash",
            onChange: null,
            baseClass: "tabs"
        }, options);

        getUrl();

        $(selector).each(function () {
            $this = $(this);
            var name = encodeURIComponent($this.data("name"));
            tabs[name] = new Tabs($this);
            tabs[name].init();
        });
    };



    // Plugin Public methods
    $.ionTabs.setTab = function (group, name) {
        tabs[group].setTab(name);
    };

}(jQuery, document, window, location));
