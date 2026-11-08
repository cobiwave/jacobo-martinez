"use client";

import { useEffect } from "react";
import clsx from "clsx";
import styles from "./GridOverlay.module.css";

const STORAGE_KEY = "grid-overlay";
const MAX_COLUMNS = 12;

/*
  Dev-only grid overlay. Press "g" to toggle.
  Visibility lives in a data attribute on <html> (no React state), and is
  remembered in localStorage across reloads.
*/
export function GridOverlay() {
  useEffect(() => {
    const root = document.documentElement;

    const setVisible = (visible: boolean) => {
      root.toggleAttribute("data-grid-overlay", visible);
      try {
        localStorage.setItem(STORAGE_KEY, visible ? "1" : "0");
      } catch {}
    };

    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setVisible(true);
    } catch {}

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "g" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      setVisible(!root.hasAttribute("data-grid-overlay"));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.removeAttribute("data-grid-overlay");
    };
  }, []);

  return (
    <div className={clsx("container", styles.overlay)} aria-hidden="true">
      {Array.from({ length: MAX_COLUMNS }, (_, i) => (
        <div key={i} className={styles.column} />
      ))}
    </div>
  );
}
