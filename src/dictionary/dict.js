const color = {
  Y: "warning",
  D: "danger",
  I: "info",
  K: "dark",
  W: "white",
  L: "light",
  B: "black",
  P: "primary",
  S: "success"
};
const position = { C: "centered" };

export const dict = {
  K: { type: "Console" },
  I: { type: "Input", mode: { T: "text", N: "number" }, color: color },
  N: { type: "Notification", mode: { U: undefined }, color: color },
  D: { type: "Datasheet", mode: { T: "text" } },
  S: { type: "Select", color: color },
  T: { type: "Title", mode: position },
  U: {
    type: "Uploader",
    mode: position,
    color: color
  },
  B: { type: "Button", mode: { L: "label" }, color: color },
  E: { type: "Empty" },
  M: { type: "Modal" },
  G: { type: "Message", mode: { B: "bullets", X: "default" } },
  P: { type: "Printer", mode: { B: "button" } }
};
