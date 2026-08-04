import { ScrambleOptions } from './types';
import { PRESETS } from './presets';
import { isSpace, isSymbol, randomChar, getEasing } from './utils';

export class ScrambleEngine {
  private el: HTMLElement;
  private options: ScrambleOptions;
  private originalText: string;
  private isAnimating: boolean = false;
  private rafId: number | null = null;
  private startTime: number = 0;
  
  private _boundMouseEnter: () => void;
  private _boundClick: () => void;
  private _boundFocus: () => void;

  constructor(el: HTMLElement, options: ScrambleOptions = {}) {
    this.el = el;
    this.originalText = el.innerText || el.textContent || '';
    
    const presetOptions = options.preset && PRESETS[options.preset] ? PRESETS[options.preset] : {};
    
    this.options = {
      trigger: 'hover',
      duration: 800,
      charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      direction: 'random',
      delay: 0,
      loop: false,
      autoplay: false,
      preserveSpaces: true,
      preserveSymbols: false,
      hoverBehavior: 'restart',
      easing: 'linear',
      ...presetOptions,
      ...options,
    };

    this._boundMouseEnter = this.handleHover.bind(this);
    this._boundClick = () => this.play();
    this._boundFocus = () => this.play();

    this.init();
  }

  private init() {
    const { trigger, autoplay } = this.options;
    
    if (trigger === 'hover') {
      this.el.addEventListener('mouseenter', this._boundMouseEnter);
    } else if (trigger === 'click') {
      this.el.addEventListener('click', this._boundClick);
    } else if (trigger === 'focus') {
      this.el.addEventListener('focus', this._boundFocus);
    }

    if (trigger === 'auto' || autoplay) {
      this.play();
    }
  }
  
  private handleHover() {
    if (this.isAnimating) {
      if (this.options.hoverBehavior === 'ignore') return;
      if (this.options.hoverBehavior === 'restart') {
        this.stop();
        this.play();
      }
    } else {
      this.play();
    }
  }

  public play() {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (this.isAnimating) return;
    
    if (this.options.delay && this.options.delay > 0) {
      setTimeout(() => this.startAnimation(), this.options.delay);
    } else {
      this.startAnimation();
    }
  }

  private startAnimation() {
    this.isAnimating = true;
    this.startTime = performance.now();
    this.options.onStart?.();
    this.rafId = requestAnimationFrame((t) => this.tick(t));
  }

  private tick(timestamp: number) {
    if (!this.startTime) this.startTime = performance.now();
    const elapsed = performance.now() - this.startTime;
    
    let progress = Math.min(elapsed / (this.options.duration || 800), 1);
    
    const easeFn = getEasing(this.options.easing!);
    const easedProgress = easeFn(progress);

    this.options.onUpdate?.(progress);

    this.el.innerText = this.scrambleText(easedProgress);

    if (progress < 1) {
      this.rafId = requestAnimationFrame((t) => this.tick(t));
    } else {
      this.complete();
    }
  }

  private scrambleText(progress: number): string {
    const chars = this.originalText.split('');
    const length = chars.length;
    let result = '';

    const { charset, direction, preserveSpaces, preserveSymbols } = this.options;

    for (let i = 0; i < length; i++) {
      const char = chars[i];
      if (preserveSpaces && isSpace(char)) {
        result += char;
        continue;
      }
      if (preserveSymbols && isSymbol(char)) {
        result += char;
        continue;
      }

      let revealThreshold = 0;
      
      if (direction === 'left') {
        revealThreshold = i / length;
      } else if (direction === 'right') {
        revealThreshold = (length - i - 1) / length;
      } else { 
        const randomFactor = (Math.sin(i * 12.9898) * 43758.5453) % 1; 
        revealThreshold = Math.abs(randomFactor);
      }

      if (progress > revealThreshold + (1 - progress) * 0.5 || progress === 1) {
        result += char; 
      } else {
        result += randomChar(charset!); 
      }
    }

    return result;
  }

  private complete() {
    this.isAnimating = false;
    this.el.innerText = this.originalText;
    this.options.onComplete?.();

    if (this.options.loop) {
      this.play();
    }
  }

  public stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isAnimating = false;
    this.el.innerText = this.originalText;
  }

  public reset() {
    this.stop();
  }

  public destroy() {
    this.stop();
    this.el.removeEventListener('mouseenter', this._boundMouseEnter);
    this.el.removeEventListener('click', this._boundClick);
    this.el.removeEventListener('focus', this._boundFocus);
  }
}
