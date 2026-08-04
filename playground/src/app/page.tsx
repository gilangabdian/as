'use client';

import { useEffect, useRef, useState } from 'react';
import { scramble } from 'as';
import { Copy, Terminal, Check, Play, RotateCcw } from 'lucide-react';

export default function Home() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  
  // Preset Refs
  const hackerRef = useRef<HTMLHeadingElement>(null);
  const matrixRef = useRef<HTMLHeadingElement>(null);
  const terminalRef = useRef<HTMLHeadingElement>(null);
  const cyberRef = useRef<HTMLHeadingElement>(null);
  
  // Playground Refs & State
  const playgroundRef = useRef<HTMLHeadingElement>(null);
  const [playgroundAnim, setPlaygroundAnim] = useState<any>(null);
  
  const [copied, setCopied] = useState(false);
  const [pkgManager, setPkgManager] = useState<'npm' | 'pnpm' | 'yarn'>('npm');
  
  // Custom Controls State
  const [customText, setCustomText] = useState('CUSTOMIZE ME');
  const [customDuration, setCustomDuration] = useState(1500);
  const [customDirection, setCustomDirection] = useState<'right' | 'left' | 'random'>('random');
  const [customCharset, setCustomCharset] = useState('01');
  const [customPreset, setCustomPreset] = useState<'none' | 'hacker' | 'matrix' | 'terminal' | 'cyberpunk'>('none');

  useEffect(() => {
    // Hero effect
    if (headerRef.current) {
      const anim = scramble(headerRef.current, {
        preset: 'cyberpunk',
        trigger: 'auto',
        duration: 2000
      });
      return () => anim.destroy();
    }
  }, []);

  useEffect(() => {
    // Initialize Presets Showcase
    const anims = [];
    if (hackerRef.current) anims.push(scramble(hackerRef.current, { preset: 'hacker', trigger: 'click' }));
    if (matrixRef.current) anims.push(scramble(matrixRef.current, { preset: 'matrix', trigger: 'hover' }));
    if (terminalRef.current) anims.push(scramble(terminalRef.current, { preset: 'terminal', direction: 'right', trigger: 'hover' }));
    if (cyberRef.current) anims.push(scramble(cyberRef.current, { preset: 'cyberpunk', trigger: 'hover' }));
    
    return () => anims.forEach(a => a.destroy());
  }, []);

  // Effect to rebuild playground animation when settings change
  useEffect(() => {
    if (playgroundRef.current) {
      if (playgroundAnim) {
        playgroundAnim.destroy();
      }
      
      // FIX: Karena fungsi destroy() di library-mu mengembalikan teks ke aslinya (teks lama),
      // kita harus memaksa DOM memakai teks terbaru dari React sebelum memanggil fungsi scramble() baru.
      playgroundRef.current.innerText = customText;
      
      const config: any = {
        trigger: 'manual',
        duration: customDuration,
        direction: customDirection,
      };
      
      if (customPreset !== 'none') {
        config.preset = customPreset;
      } else if (customCharset) {
        config.charset = customCharset;
      }

      const anim = scramble(playgroundRef.current, config);
      setPlaygroundAnim(anim);
      
      return () => anim.destroy();
    }
  }, [customText, customDuration, customDirection, customCharset, customPreset]);

  const copyInstall = () => {
    const cmds = {
      npm: 'npm i as',
      pnpm: 'pnpm add as',
      yarn: 'yarn add as'
    };
    navigator.clipboard.writeText(cmds[pkgManager]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Navbar/Header */}
      <div className="w-full border-b border-white/5 bg-[#222831]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono font-bold text-xl text-[#DDDDDD]">&gt; as.js</div>
          <div className="flex gap-4 text-sm text-gray-400 font-mono">
            <a href="#" className="hover:text-emerald-400 transition-colors">Docs</a>
            <a href="https://github.com/gilangabdian/as" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-20">
        {/* HERO SECTION */}
        <section className="text-center mb-32 flex flex-col items-center">
          <div className="inline-block border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs px-3 py-1 rounded-full mb-8 uppercase tracking-widest">
            v1.0.0 is live
          </div>
          
          <h1 
            ref={headerRef}
            className="text-7xl md:text-9xl font-black font-mono mb-8 text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-cyan-400 to-pink-500"
          >
            as
          </h1>
          
          <p className="text-[#DDDDDD]/70 text-xl md:text-2xl max-w-2xl mx-auto mb-12">
            The ultimate, zero-dependency text scramble utility for modern web applications.
          </p>

          <div className="flex flex-col items-center glass-panel rounded-2xl p-2 w-full max-w-md mx-auto relative group">
            <div className="flex w-full gap-1 mb-2 px-2 pt-2">
              <button onClick={() => setPkgManager('npm')} className={`text-xs font-mono px-3 py-1 rounded transition-colors ${pkgManager === 'npm' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>npm</button>
              <button onClick={() => setPkgManager('pnpm')} className={`text-xs font-mono px-3 py-1 rounded transition-colors ${pkgManager === 'pnpm' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>pnpm</button>
              <button onClick={() => setPkgManager('yarn')} className={`text-xs font-mono px-3 py-1 rounded transition-colors ${pkgManager === 'yarn' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>yarn</button>
            </div>
            <div className="flex w-full items-center justify-between bg-black/50 rounded-xl px-4 py-4 cursor-pointer hover:bg-black/70 transition-colors" onClick={copyInstall}>
              <div className="flex items-center gap-3 text-emerald-400 font-mono">
                <Terminal size={18} />
                <span>{pkgManager === 'npm' ? 'npm i as' : pkgManager === 'pnpm' ? 'pnpm add as' : 'yarn add as'}</span>
              </div>
              {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />}
            </div>
          </div>
        </section>

        {/* PRESETS SHOWCASE */}
        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-2 text-white">Built-in Presets</h2>
          <p className="text-gray-400 mb-10">Hover or click the cards below to see the magic.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-2xl hover:border-cyan-500/50 transition-colors group cursor-pointer">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Preset: Hacker (Click)</h3>
              <h2 ref={hackerRef} className="text-4xl font-bold font-mono text-cyan-400 mb-6">
                SYSTEM_BREACH
              </h2>
              <code className="text-xs bg-black/50 p-3 rounded-lg block text-gray-400 font-mono">
                scramble(el, &#123; preset: &apos;hacker&apos; &#125;)
              </code>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group cursor-pointer">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Preset: Matrix (Hover)</h3>
              <h2 ref={matrixRef} className="text-4xl font-bold font-mono text-emerald-400 mb-6">
                Wake up, Neo...
              </h2>
              <code className="text-xs bg-black/50 p-3 rounded-lg block text-gray-400 font-mono">
                scramble(el, &#123; preset: &apos;matrix&apos; &#125;)
              </code>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:border-amber-500/50 transition-colors group cursor-pointer">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Preset: Terminal (Hover)</h3>
              <h2 ref={terminalRef} className="text-4xl font-bold font-mono text-amber-400 mb-6">
                &gt; LOADING_MODULE
              </h2>
              <code className="text-xs bg-black/50 p-3 rounded-lg block text-gray-400 font-mono">
                scramble(el, &#123; preset: &apos;terminal&apos; &#125;)
              </code>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:border-pink-500/50 transition-colors group cursor-pointer">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Preset: Cyberpunk (Hover)</h3>
              <h2 ref={cyberRef} className="text-4xl font-bold font-mono text-pink-400 mb-6">
                NIGHT_CITY
              </h2>
              <code className="text-xs bg-black/50 p-3 rounded-lg block text-gray-400 font-mono">
                scramble(el, &#123; preset: &apos;cyberpunk&apos; &#125;)
              </code>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PLAYGROUND */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-white">Interactive Playground</h2>
          <p className="text-gray-400 mb-10">Tweak the engine live.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Display Area */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-10 flex flex-col justify-center items-center relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#222831]/50 pointer-events-none" />
              <h2 
                ref={playgroundRef}
                className="text-5xl md:text-7xl font-black font-mono text-white text-center break-all z-10"
              >
                {customText}
              </h2>
              
              <div className="absolute bottom-8 flex gap-4 z-10">
                <button 
                  onClick={() => playgroundAnim?.play()}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-transform active:scale-95"
                >
                  <Play size={18} fill="currentColor" /> Play
                </button>
                <button 
                  onClick={() => playgroundAnim?.reset()}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-transform active:scale-95 border border-white/10"
                >
                  <RotateCcw size={18} /> Reset
                </button>
              </div>
            </div>

            {/* Control Panel */}
            <div className="lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Text</label>
                <input 
                  type="text" 
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</label>
                  <span className="text-xs text-emerald-400 font-mono">{customDuration}ms</span>
                </div>
                <input 
                  type="range" 
                  min="100" max="5000" step="100"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preset</label>
                <select 
                  value={customPreset}
                  onChange={(e) => setCustomPreset(e.target.value as any)}
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
                >
                  <option value="none">Custom Charset</option>
                  <option value="hacker">Hacker</option>
                  <option value="matrix">Matrix</option>
                  <option value="terminal">Terminal</option>
                  <option value="cyberpunk">Cyberpunk</option>
                </select>
              </div>

              {customPreset === 'none' && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Custom Charset</label>
                  <input 
                    type="text" 
                    value={customCharset}
                    onChange={(e) => setCustomCharset(e.target.value)}
                    placeholder="e.g. 01 or !@#$"
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Direction</label>
                <div className="flex rounded-xl overflow-hidden border border-white/10 bg-black/50">
                  {(['random', 'left', 'right'] as const).map(dir => (
                    <button
                      key={dir}
                      onClick={() => setCustomDirection(dir)}
                      className={`flex-1 py-3 text-sm font-mono transition-colors ${customDirection === dir ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
