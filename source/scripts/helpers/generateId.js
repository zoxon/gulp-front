import generate from "nanoid/generate";

export default () => {
  const alphabet =
    "_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return generate(alphabet, 21);
};
