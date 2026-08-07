"use client";

import { useEffect, useRef, useState } from "react";
import { scramble } from "as-scramble";
import { Copy, Terminal, Check, Play, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const headerRef = useRef<HTMLHeadingElement>(null);

  // Preset Refs
  const hackerRef = useRef<HTMLHeadingElement>(null);
  const matrixRef = useRef<HTMLHeadingElement>(null);
  const terminalRef = useRef<HTMLHeadingElement>(null);
  const cyberRef = useRef<HTMLHeadingElement>(null);

  // Playground Refs & State
  const playgroundRef = useRef<HTMLHeadingElement>(null);
  const [playgroundAnim, setPlaygroundAnim] = useState<ReturnType<typeof scramble> | null>(null);

  const [copied, setCopied] = useState(false);
  const [pkgManager, setPkgManager] = useState<"npm" | "pnpm" | "yarn">("npm");

  // Custom Controls State
  const [customText, setCustomText] = useState("CUSTOMIZE ME");
  const [customDuration, setCustomDuration] = useState(1500);
  const [customDelay, setCustomDelay] = useState(0);
  const [customDirection, setCustomDirection] = useState<"right" | "left" | "random">("random");
  const [customCharset, setCustomCharset] = useState("01");
  const [customPreset, setCustomPreset] = useState<"none" | "hacker" | "matrix" | "terminal" | "cyberpunk">("none");
  const [customEasing, setCustomEasing] = useState<"linear" | "easeIn" | "easeOut" | "easeInOut">("linear");
  const [customTrigger, setCustomTrigger] = useState<"auto" | "hover" | "click" | "focus" | "manual">("hover");

  // Boolean Toggles
  const [customLoop, setCustomLoop] = useState(false);
  const [customPreserveSpaces, setCustomPreserveSpaces] = useState(true);
  const [customPreserveSymbols, setCustomPreserveSymbols] = useState(false);

  useEffect(() => {
    // Hero effect
    if (headerRef.current) {
      const anim = scramble(headerRef.current, {
        preset: "cyberpunk",
        trigger: "auto",
        duration: 2000,
      });
      return () => anim.destroy();
    }
  }, []);

  useEffect(() => {
    // Initialize Presets Showcase
    const anims: ReturnType<typeof scramble>[] = [];
    if (hackerRef.current) anims.push(scramble(hackerRef.current, { preset: "hacker", trigger: "click" }));
    if (matrixRef.current) anims.push(scramble(matrixRef.current, { preset: "matrix", trigger: "hover" }));
    if (terminalRef.current)
      anims.push(scramble(terminalRef.current, { preset: "terminal", direction: "right", trigger: "hover" }));
    if (cyberRef.current) anims.push(scramble(cyberRef.current, { preset: "cyberpunk", trigger: "hover" }));

    return () => anims.forEach((a) => a.destroy());
  }, []);

  // Effect to rebuild playground animation when settings change
  useEffect(() => {
    if (playgroundRef.current) {
      if (playgroundAnim) {
        playgroundAnim.destroy();
      }

      // Force DOM to latest state before initializing
      playgroundRef.current.innerText = customText;

      const config: Record<string, unknown> = {
        trigger: customTrigger,
        duration: customDuration,
        delay: customDelay,
        direction: customDirection,
        easing: customEasing,
        loop: customLoop,
        preserveSpaces: customPreserveSpaces,
        preserveSymbols: customPreserveSymbols,
      };

      if (customPreset !== "none") {
        config.preset = customPreset;
      } else if (customCharset) {
        config.charset = customCharset;
      }

      const anim = scramble(playgroundRef.current, config);
      setPlaygroundAnim(anim);

      return () => anim.destroy();
    }
  }, [
    customText,
    customDuration,
    customDelay,
    customDirection,
    customCharset,
    customPreset,
    customEasing,
    customTrigger,
    customLoop,
    customPreserveSpaces,
    customPreserveSymbols,
  ]);

  const copyInstall = () => {
    const cmds = {
      npm: "npm i as-scramble",
      pnpm: "pnpm add as-scramble",
      yarn: "yarn add as-scramble",
    };
    navigator.clipboard.writeText(cmds[pkgManager]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar/Header */}
      <div className="w-full border-b border-white/5 bg-[#222831]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono font-bold text-xl text-[#DDDDDD]">&gt; as.js</div>
          <div className="flex gap-4 text-sm text-gray-400 font-mono">
            <a
              href="https://github.com/gilangabdian/as"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-20 flex-1 w-full">
        {/* HERO SECTION */}
        <section className="text-center mb-32 flex flex-col items-center">
          <h1
            ref={headerRef}
            className="text-7xl md:text-9xl font-black font-mono mb-8 text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-cyan-400 to-pink-500">
            as
          </h1>

          <p className="text-[#DDDDDD]/70 text-xl md:text-2xl max-w-2xl mx-auto mb-12">
            The ultimate, zero-dependency text scramble utility for modern web applications.
          </p>

          <div className="flex flex-col items-center glass-panel rounded-2xl p-2 w-full max-w-md mx-auto relative group">
            <div className="flex w-full gap-1 mb-2 px-2 pt-2">
              <button
                onClick={() => setPkgManager("npm")}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${pkgManager === "npm" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                npm
              </button>
              <button
                onClick={() => setPkgManager("pnpm")}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${pkgManager === "pnpm" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                pnpm
              </button>
              <button
                onClick={() => setPkgManager("yarn")}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${pkgManager === "yarn" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                yarn
              </button>
            </div>
            <div
              className="flex w-full items-center justify-between bg-black/50 rounded-xl px-4 py-4 cursor-pointer hover:bg-black/70 transition-colors"
              onClick={copyInstall}>
              <div className="flex items-center gap-3 text-emerald-400 font-mono">
                <Terminal size={18} />
                <span>
                  {pkgManager === "npm"
                    ? "npm i as-scramble"
                    : pkgManager === "pnpm"
                      ? "pnpm add as-scramble"
                      : "yarn add as-scramble"}
                </span>
              </div>
              {copied ? (
                <Check size={18} className="text-emerald-400" />
              ) : (
                <Copy size={18} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
              )}
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
                <span className="text-pink-400">scramble</span>(el, &#123;{" "}
                <span className="text-purple-400">preset</span>:{" "}
                <span className="text-emerald-300">&apos;hacker&apos;</span> &#125;)
              </code>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group cursor-pointer">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Preset: Matrix (Hover)</h3>
              <h2 ref={matrixRef} className="text-4xl font-bold font-mono text-emerald-400 mb-6">
                Wake up, Neo...
              </h2>
              <code className="text-xs bg-black/50 p-3 rounded-lg block text-gray-400 font-mono">
                <span className="text-pink-400">scramble</span>(el, &#123;{" "}
                <span className="text-purple-400">preset</span>:{" "}
                <span className="text-emerald-300">&apos;matrix&apos;</span> &#125;)
              </code>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:border-amber-500/50 transition-colors group cursor-pointer">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                Preset: Terminal (Hover)
              </h3>
              <h2 ref={terminalRef} className="text-4xl font-bold font-mono text-amber-400 mb-6">
                &gt; LOADING_MODULE
              </h2>
              <code className="text-xs bg-black/50 p-3 rounded-lg block text-gray-400 font-mono">
                <span className="text-pink-400">scramble</span>(el, &#123;{" "}
                <span className="text-purple-400">preset</span>:{" "}
                <span className="text-emerald-300">&apos;terminal&apos;</span> &#125;)
              </code>
            </div>

            <div className="glass-panel p-8 rounded-2xl hover:border-pink-500/50 transition-colors group cursor-pointer">
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                Preset: Cyberpunk (Hover)
              </h3>
              <h2 ref={cyberRef} className="text-4xl font-bold font-mono text-pink-400 mb-6">
                NIGHT_CITY
              </h2>
              <code className="text-xs bg-black/50 p-3 rounded-lg block text-gray-400 font-mono">
                <span className="text-pink-400">scramble</span>(el, &#123;{" "}
                <span className="text-purple-400">preset</span>:{" "}
                <span className="text-emerald-300">&apos;cyberpunk&apos;</span> &#125;)
              </code>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PLAYGROUND */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-2 text-white">Interactive Playground</h2>
          <p className="text-gray-400 mb-10">Tweak every single engine option live.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Display Area */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-10 flex flex-col justify-center items-center relative overflow-hidden min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#222831]/50 pointer-events-none" />

              <div className="w-full h-full max-h-[350px] overflow-y-auto mb-16 custom-scrollbar flex items-center justify-center">
                <h2
                  ref={playgroundRef}
                  tabIndex={0}
                  className="text-3xl md:text-5xl font-black font-mono text-white text-center break-words whitespace-pre-wrap leading-tight z-10 w-full focus:outline-none">
                  {customText}
                </h2>
              </div>

              <div className="absolute bottom-8 flex gap-4 z-10">
                <button
                  onClick={() => playgroundAnim?.play()}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-transform active:scale-95">
                  <Play size={18} fill="currentColor" /> Play
                </button>
                <button
                  onClick={() => playgroundAnim?.reset()}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-transform active:scale-95 border border-white/10">
                  <RotateCcw size={18} /> Reset
                </button>
              </div>
            </div>

            {/* Control Panel */}
            <div className="lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col gap-6 max-h-[600px] overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Text</label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={3}
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors custom-scrollbar resize-none"
                />
              </div>

              {/* TIMING */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</label>
                    <span className="text-xs text-emerald-400 font-mono">{customDuration}ms</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delay</label>
                    <span className="text-xs text-emerald-400 font-mono">{customDelay}ms</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={customDelay}
                    onChange={(e) => setCustomDelay(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* PRESETS & CHARSET */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preset</label>
                  <select
                    value={customPreset}
                    onChange={(e) =>
                      setCustomPreset(e.target.value as "none" | "hacker" | "matrix" | "terminal" | "cyberpunk")
                    }
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 cursor-pointer">
                    <option value="none">Custom</option>
                    <option value="hacker">Hacker</option>
                    <option value="matrix">Matrix</option>
                    <option value="terminal">Terminal</option>
                    <option value="cyberpunk">Cyberpunk</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Easing</label>
                  <select
                    value={customEasing}
                    onChange={(e) => setCustomEasing(e.target.value as "linear" | "easeIn" | "easeOut" | "easeInOut")}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 cursor-pointer">
                    <option value="linear">Linear</option>
                    <option value="easeOut">Ease Out</option>
                    <option value="easeIn">Ease In</option>
                    <option value="easeInOut">Ease In Out</option>
                  </select>
                </div>
              </div>

              {/* TRIGGER OPTION */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trigger</label>
                <div className="flex rounded-xl overflow-hidden border border-white/10 bg-black/50">
                  {(["auto", "hover", "click", "focus", "manual"] as const).map((trig) => (
                    <button
                      key={trig}
                      onClick={() => setCustomTrigger(trig)}
                      className={`flex-1 py-3 text-xs font-mono transition-colors ${customTrigger === trig ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-gray-500 hover:text-gray-300"}`}>
                      {trig}
                    </button>
                  ))}
                </div>
              </div>

              {customPreset === "none" && (
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
                  {(["random", "left", "right"] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setCustomDirection(dir)}
                      className={`flex-1 py-3 text-xs font-mono transition-colors ${customDirection === dir ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-gray-500 hover:text-gray-300"}`}>
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* BOOLEAN TOGGLES */}
              <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/5 bg-black/30 mt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={customLoop}
                    onChange={(e) => setCustomLoop(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Loop Animation</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={customPreserveSpaces}
                    onChange={(e) => setCustomPreserveSpaces(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    Preserve Spaces
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={customPreserveSymbols}
                    onChange={(e) => setCustomPreserveSymbols(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    Preserve Symbols
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="w-full border-t border-white/5 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <a
            href="https://github.com/gilangabdian/as?tab=MIT-1-ov-file"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-gray-500 uppercase tracking-widest hover:text-gray-200 transition-colors w-fit">
            MIT
          </a>
          <span className="text-gray-700">|</span>
          <TimeAgo />
        </div>
      </footer>
    </main>
  );
}

function TimeAgo() {
  const [timeStr, setTimeStr] = useState("built just now");

  useEffect(() => {
    // Project creation date (UTC time)
    const buildDate = new Date("2026-08-04T14:00:00Z");

    const updateTime = () => {
      const seconds = Math.floor((new Date().getTime() - buildDate.getTime()) / 1000);
      let interval = seconds / 31536000;
      if (interval > 1) {
        setTimeStr(`built ${Math.floor(interval)} years ago`);
        return;
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        setTimeStr(`built ${Math.floor(interval)} months ago`);
        return;
      }
      interval = seconds / 86400;
      if (interval > 1) {
        setTimeStr(`built ${Math.floor(interval)} days ago`);
        return;
      }
      interval = seconds / 3600;
      if (interval > 1) {
        setTimeStr(`built ${Math.floor(interval)} hours ago`);
        return;
      }
      interval = seconds / 60;
      if (interval > 1) {
        setTimeStr(`built ${Math.floor(interval)} minutes ago`);
        return;
      }
      setTimeStr(`built ${Math.floor(seconds)} seconds ago`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000); // update every second so it feels dynamic
    return () => clearInterval(timer);
  }, []);

  return <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">{timeStr}</span>;
}
