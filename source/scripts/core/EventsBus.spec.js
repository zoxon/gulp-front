import EventsBus from "./EventsBus";

describe("EventsBus", () => {
  let hub;

  beforeEach(() => {
    hub = new EventsBus();
  });

  describe("constructor", () => {
    test("should return new instance", () => {
      expect(hub).toBeInstanceOf(EventsBus);
    });
  });

  describe("on", () => {
    test("should add new event", () => {
      const eventName = "app.custom.event";
      const callback = () => {};

      expect(hub.events).toEqual({});
      hub.on(eventName, callback);
      expect(hub.events[eventName]).toEqual([callback]);
    });

    test("should return object with remove function", () => {
      const eventName = "app.custom.event";
      const callback = () => {};
      const subscriber = hub.on(eventName, callback);

      expect(subscriber.remove).toBeInstanceOf(Function);
    });
  });
});
