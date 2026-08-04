import { ScrambleOptions } from './types';
import { ScrambleEngine } from './scramble';

export type { ScrambleOptions };

/**
 * Initializes a scramble text hover effect on the target element.
 * 
 * @param element The target DOM element or a CSS selector string.
 * @param options Configuration options for the scramble effect.
 * @returns A ScrambleEngine instance to control the animation manually.
 */
export function scramble(element: HTMLElement | string, options?: ScrambleOptions) {
  const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
  if (!el) {
    throw new Error(`Scramble: Element not found - ${element}`);
  }
  return new ScrambleEngine(el, options);
}

export default scramble;
