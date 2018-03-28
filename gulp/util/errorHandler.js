import notifier from "node-notifier";
import path from "path";
import logger from "gulplog";

function errorHandler(error) {
  const cwd = process.cwd();
  const { name, plugin, message } = error;
  const title = `${name} in ${plugin}`;

  const shortMessage = message.split("\n")[0];

  // Print message to console
  logger.error(
    [title.bold.red, "", message.replace(/\t/g, "  "), ""].join("\n")
  );

  notifier.notify({
    title: title,
    message: shortMessage,
    icon: path.join(cwd, "tools/icons/error.svg")
  });

  this.emit("end");
}

export default errorHandler;
