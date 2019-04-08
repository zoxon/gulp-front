import { createElement } from "@/scripts/helpers/dom/createElement";
import { animationEndEventName } from "@/scripts/helpers/event/aninmation";

class Notification {
  constructor(options = {}) {
    // List of notifications currently active
    this.notifications = [];

    this.name = "notification";

    this._defaults = {
      delay: 3000,
      containerClassName: "notification-container",
      containerItemClassName: "notification-container__item"
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.container = this.createNotificationContainer();
  }

  createNotificationContainer() {
    const notificationContainer = createElement("div", {
      className: this.options.containerClassName
    });
    document.body.appendChild(notificationContainer);

    return notificationContainer;
  }

  close(notification) {
    notification.hide();

    const index = this.notifications.indexOf(notification);
    this.notifications.splice(index, 1);
  }

  show(message, _options) {
    const options = {
      delay: this.options.delay,
      ..._options
    };

    const notification = new NotificationItem(this.container);
    const item = notification.show(message, {
      ...options,
      className: `${options.className} ${this.options.containerItemClassName}`
    });

    this.container.appendChild(item);
    this.notifications.push(item);

    if (options.delay) {
      setTimeout(() => {
        this.close(notification);
      }, options.delay);
    }
  }
}

class NotificationItem {
  constructor(container) {
    this.name = "notificationItem";
    this.container = container;

    this.defaults = {
      delay: 3000,
      close: true,
      className: "",
      containerClassName: "notification",
      disappearClassName: "notification_disappear",
      closeClassName: "notification__close",
      messageClassName: "notification__message"
    };

    this.init();
  }

  init() {
    this.animationEnd = animationEndEventName();
  }

  build(message, options) {
    let close = null;

    if (options.close) {
      close = createElement("button", {
        className: this.defaults.closeClassName,
        type: "button"
      });
    }

    const notification = createElement(
      "div",
      { className: `${this.defaults.containerClassName} ${options.className}` },
      close,
      createElement(
        "div",
        { className: this.defaults.messageClassName },
        message
      )
    );

    this.notification = notification;

    if (close) {
      close.addEventListener("click", () => {
        this.hide();
      });
    }

    return notification;
  }

  show(message, _options) {
    const options = {
      ...this.defaults,
      ..._options
    };

    const item = this.build(message, options);

    this.element = item;

    return item;
  }

  hide() {
    this.element.classList.add(this.defaults.disappearClassName);

    this.element.addEventListener(this.animationEnd, event => {
      if (event.target === this.element) {
        this.container.removeChild(this.element);
      }
    });
  }
}

export default Notification;
