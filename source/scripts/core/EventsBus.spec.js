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
      const cb = () => {};

      expect(hub.events).toEqual({});
      hub.on(eventName, cb);
      expect(hub.events[eventName]).toEqual([cb]);
    });

    test("should return object with remove function", () => {
      const eventName = "app.custom.event";
      const cb = () => {};
      const subscriber = hub.on(eventName, cb);

      expect(subscriber.remove).toBeInstanceOf(Function);
    });
  });
});
