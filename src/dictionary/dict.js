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
  K: { type: "console" },
  I: { type: "Input", mode: { T: "text", N: "number" } },
  N: { type: "Notification", mode: { U: undefined }, color: color },
  D: { type: "Datasheet", mode: { T: "text" } },
  S: { type: "Select", color: color },
  T: { type: "Title", mode: position },
  U: {
    type: "Uploader",
    mode: position,
    color: color
  },
  B: { type: "Button", mode: { L: "Label" } },
  E: { type: "Especial" },
  Y: { type: "Empty" }
};
