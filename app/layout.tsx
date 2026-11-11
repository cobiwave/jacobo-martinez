import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { neueHaasDisplay } from "./fonts/neue-haas-display";
import "./globals.css";

/*
  Dev-only. NODE_ENV is inlined at build time, so in production this ternary
  folds to `() => null` and the import() is dropped — the overlay's JS and CSS
  never reach the production bundle.
*/
const GridOverlay =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./_components/GridOverlay").then((m) => m.GridOverlay))
    : () => null;

export const metadata: Metadata = {
  title: "Jacobo Martinez",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={neueHaasDisplay.variable}>
      <body>
        {/* Sections with data-reveal are hidden until GSAP runs; show them without JS. */}
        <noscript>
          <style>{"[data-reveal] { visibility: visible !important; }"}</style>
        </noscript>
        {children}
        <GridOverlay />
      </body>
    </html>
  );
}
