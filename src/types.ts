export interface ScrambleOptions {
  trigger?: 'hover' | 'click' | 'focus' | 'auto' | 'manual';
  duration?: number;
  delay?: number;
  autoplay?: boolean;
  loop?: boolean;
  iterations?: number;
  easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut' | ((t: number) => number);
  charset?: string;
  direction?: 'left' | 'right' | 'random';
  preserveSpaces?: boolean;
  preserveSymbols?: boolean;
  hoverBehavior?: 'restart' | 'ignore' | 'queue';
  preset?: 'hacker' | 'matrix' | 'terminal' | 'cyberpunk';
  onStart?: () => void;
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
}
