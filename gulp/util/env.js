export const NODE_ENV =
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development"
    ? process.env.NODE_ENV
    : "development";

export const isDevelopment = NODE_ENV === "development";
