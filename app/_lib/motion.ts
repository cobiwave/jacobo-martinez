import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Shared motion tokens so every section feels the same. */
export const motion = {
  duration: 1.2,
  ease: "expo.out",
  /** Distance for fade-up reveals (px). */
  y: 24,
  stagger: {
    words: 0.08,
    items: 0.1,
  },
} as const;

type MotionOptions = {
  /** Runs when the user has no reduced-motion preference. */
  full: () => void;
  /** Optional extra setup under `prefers-reduced-motion: reduce`. */
  reduced?: () => void;
};

/**
 * `useGSAP` + `gsap.matchMedia()` for prefers-reduced-motion.
 *
 * The scope element should carry `data-reveal`, which hides it in CSS until
 * this hook runs: otherwise the server-rendered HTML paints in its final state
 * and only hides once hydration creates the `from()` tweens (a visible flash).
 * Each branch reveals the scope *after* its tweens have applied their start
 * state, in the same frame.
 *
 * Animations are reverted automatically on unmount and when the OS setting
 * changes.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  { full, reduced }: MotionOptions,
) {
  useGSAP(
    () => {
      const reveal = () => gsap.set(scope.current, { autoAlpha: 1 });
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        full();
        reveal();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        reduced?.();
        reveal();
      });

      return () => mm.revert();
    },
    { scope },
  );
}

/**
 * Split text into masked words for a "rise from below" reveal.
 * Masks get the global `split-word-mask` class (styled in globals.css).
 */
export function splitWords(target: HTMLElement | null) {
  return SplitText.create(target, {
    type: "words",
    mask: "words",
    wordsClass: "split-word",
  });
}

/**
 * Timeline with the shared defaults. Pass a `trigger` to play it once when
 * that element scrolls into view; omit it to play immediately (e.g. Hero).
 */
export function revealTimeline(trigger?: Element | null) {
  return gsap.timeline({
    defaults: { duration: motion.duration, ease: motion.ease },
    scrollTrigger: trigger
      ? { trigger, start: "top 75%", once: true }
      : undefined,
  });
}

/** Element children as an array, for staggering list items. */
export function childrenOf(el: Element | null) {
  return gsap.utils.toArray<HTMLElement>(el?.children ?? []);
}

export { gsap };
