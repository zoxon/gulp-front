import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";

class NetworkStatus extends Plugin {
  defaults() {
    return {
      events: ["online", "offline"],
      statusAttribute: "data-network-status"
    };
  }

  init() {
    this.renderState();
  }

  destroy() {
    this.unbindEvents();
  }

  buildCache() {
    this.isOnline = this.getStatus();
  }

  bindEvents() {
    this.options.events.forEach(eventName =>
      window.addEventListener(eventName, () => this.handleNetworkEvent())
    );
  }

  unbindEvents() {
    this.options.events.forEach(eventName =>
      window.removeEventListener(eventName, () => this.handleNetworkEvent())
    );
  }

  getStatus() {
    return navigator.onLine || false;
  }

  handleNetworkEvent() {
    this.isOnline = this.getStatus();
    this.renderState();
  }

  renderState() {
    this.element.setAttribute(
      this.options.statusAttribute,
      this.isOnline ? "online" : "offline"
    );
  }
}

export default init(NetworkStatus, "network-status");
