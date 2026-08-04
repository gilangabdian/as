export const isSpace = (char: string) => char === ' ';
export const isSymbol = (char: string) => /[^a-zA-Z0-9\s]/.test(char);

export const randomChar = (charset: string) => {
  return charset[Math.floor(Math.random() * charset.length)];
};

export const getEasing = (easingName: string | ((t: number) => number)) => {
  if (typeof easingName === 'function') return easingName;
  switch (easingName) {
    case 'easeOut': return (t: number) => 1 - Math.pow(1 - t, 3);
    case 'easeIn': return (t: number) => t * t * t;
    case 'easeInOut': return (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    case 'linear':
    default:
      return (t: number) => t;
  }
};
