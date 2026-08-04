import { ScrambleOptions } from "./types";

export const PRESETS: Record<string, Partial<ScrambleOptions>> = {
  hacker: {
    charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
    duration: 800,
    direction: "random",
    preserveSpaces: true,
  },
  matrix: {
    charset: "01",
    duration: 1000,
    direction: "left",
    preserveSpaces: true,
  },
  terminal: {
    charset: "abcdefghijklmnopqrstuvwxyz0123456789_>",
    duration: 1200,
    direction: "left",
    preserveSpaces: true,
  },
  cyberpunk: {
    charset: "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",
    duration: 1500,
    direction: "random",
    preserveSpaces: true,
  },
};
