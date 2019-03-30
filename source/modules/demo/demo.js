import skrollr from "skrollr";
import ScrollReveal from "scrollreveal";

import Notification from "@/modules/notification/notification";

import ready from "@/scripts/helpers/dom/ready";

export default () => {
  const componentsDemo = document.querySelector(".demo_components");

  if (componentsDemo) {
    // Notifications
    const notificationBoard = new Notification({
      delay: 40000
    });

    document
      .querySelector(".js-notification-info")
      .addEventListener("click", () => {
        notificationBoard.show("Short test message", {
          className: "notification_type_info"
        });
      });

    document
      .querySelector(".js-notification-notice")
      .addEventListener("click", () => {
        notificationBoard.show("Medium long test test message test", {
          className: "notification_type_notice"
        });
      });

    document
      .querySelector(".js-notification-success")
      .addEventListener("click", () => {
        notificationBoard.show(
          "Three line test test message test message test long message lorem ipsum",
          {
            className: "notification_type_success"
          }
        );
      });

    document
      .querySelector(".js-notification-error")
      .addEventListener("click", () => {
        notificationBoard.show("test message", {
          className: "notification_type_error"
        });
      });

    document
      .querySelector(".js-notification-warning")
      .addEventListener("click", () => {
        notificationBoard.show("test message", {
          className: "notification_type_warning"
        });
      });
  }

  // Home page animations
  ready(function() {
    skrollr.init({
      mobileCheck: function() {
        // hack - forces mobile version to be off
        return false;
      }
    });

    window.sr = ScrollReveal();

    /* globals sr */
    sr.reveal(".js-appearing-item", {
      origin: "bottom",
      distance: "10%",
      duration: 500,
      delay: 100,
      rotate: {
        x: 0,
        y: 0,
        z: 0
      },
      opacity: 0.1,
      scale: 0.99,
      easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
      container: window.document.documentElement,
      mobile: !1,
      reset: !1,
      useDelay: "always",
      viewFactor: 0.2,
      viewOffset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      beforeReveal: function(e) {},
      beforeReset: function(e) {},
      afterReveal: function(e) {},
      afterReset: function(e) {}
    });
  });
};
