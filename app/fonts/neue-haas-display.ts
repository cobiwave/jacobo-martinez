import localFont from "next/font/local";

/*
  Neue Haas Display, self-hosted via next/font/local (files in this folder).
  The OS/2 weight classes in the .ttf files are shifted (Light = 400,
  Roman = 500), so weights are remapped here to the CSS convention: Roman is
  the regular 400 cut. 8 cuts don't fit the 100-step scale, so Thin sits at 250.
*/
export const neueHaasDisplay = localFont({
  src: [
    { path: "./NeueHaasDisplayXXThin.ttf", weight: "100", style: "normal" },
    { path: "./NeueHaasDisplayXXThinItalic.ttf", weight: "100", style: "italic" },
    { path: "./NeueHaasDisplayXThin.ttf", weight: "200", style: "normal" },
    { path: "./NeueHaasDisplayXThinItalic.ttf", weight: "200", style: "italic" },
    { path: "./NeueHaasDisplayThin.ttf", weight: "250", style: "normal" },
    { path: "./NeueHaasDisplayThinItalic.ttf", weight: "250", style: "italic" },
    { path: "./NeueHaasDisplayLight.ttf", weight: "300", style: "normal" },
    { path: "./NeueHaasDisplayLightItalic.ttf", weight: "300", style: "italic" },
    { path: "./NeueHaasDisplayRoman.ttf", weight: "400", style: "normal" },
    { path: "./NeueHaasDisplayRomanItalic.ttf", weight: "400", style: "italic" },
    { path: "./NeueHaasDisplayMedium.ttf", weight: "500", style: "normal" },
    { path: "./NeueHaasDisplayMediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./NeueHaasDisplayBold.ttf", weight: "700", style: "normal" },
    { path: "./NeueHaasDisplayBoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./NeueHaasDisplayBlack.ttf", weight: "900", style: "normal" },
    { path: "./NeueHaasDisplayBlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-neue-haas-display",
  display: "swap",
});
