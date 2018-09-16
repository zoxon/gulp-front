import MicroModal from "micromodal";

const execYoutubeCommand = (frame, command) => {
  if (frame.contentWindow === null) {
    return;
  }

  frame.contentWindow.postMessage(
    window.JSON.stringify({ event: "command", func: command }),
    "https://www.youtube.com"
  );
};

const modalHandler = (modal, command) => {
  const iframes = modal.querySelectorAll("iframe");

  [].forEach.call(iframes, frame => {
    execYoutubeCommand(frame, command);
  });
};

export default () => {
  MicroModal.init({
    awaitCloseAnimation: true,
    onClose: modal => {
      modalHandler(modal, "pauseVideo");
      document.documentElement.classList.remove("scroll-locked");
    },
    onShow: modal => {
      modalHandler(modal, "playVideo");
      document.documentElement.classList.add("scroll-locked");
    }
  });
};
