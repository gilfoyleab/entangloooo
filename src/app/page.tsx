'use client';

import { Scene } from '@/components/canvas/Scene';
import { useEffect, useState } from 'react';
import { Network, Shield, Zap, Code, Cpu, Activity, ArrowRight, CheckCircle2, Globe, Server, Database, Lock, Hexagon, CircleDashed, Orbit } from 'lucide-react';
import { motion, Variants, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for the sticky navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const heroVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], 
        delay: 0.8 
      } 
    }
  };

  return (
    <main className="relative w-full bg-[#020205] font-sans text-white selection:bg-[#00d2ff] selection:text-black">

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <Scene />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 mx-auto z-50 flex items-center justify-between py-4 px-6 md:px-12 pointer-events-auto bg-[#020205]/40 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center opacity-80">
            <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <span className="font-light tracking-[0.2em] text-lg lowercase text-gray-200">entangle</span>
        </div>

        {/* Nav Links Removed */}

        <button className="px-6 py-2 text-sm font-medium text-white transition-all bg-white/10 border rounded-full shadow-xl border-white/20 hover:bg-white/20 backdrop-blur-sm">
          Launch App
        </button>
      </header>

      {/* Main Content Flow */}
      <div className="relative z-10 w-full flex flex-col pb-0">

        {/* HERO SECTION */}
        <section className="min-h-[110vh] flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div initial="hidden" animate="visible" variants={heroVariant} className="flex flex-col items-center w-full max-w-6xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs font-medium text-gray-200 mb-8 uppercase tracking-[0.2em] shadow-xl">
              <span>Bittensor Subnet</span>
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              <span>Cross-Chain Messaging</span>
            </div>

            <h1 className="text-5xl md:text-[6.5rem] font-medium tracking-tight mb-8 leading-[1.05] text-metallic-premium drop-shadow-2xl">
              BLOCKCHAINS.<br />CONNECTED.
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-gray-200 font-normal leading-relaxed mb-12 text-shadow-strong">
              Decentralized cross-chain messaging secured by competing miners and validators on Bittensor.
              <span className="text-white block mt-2 font-medium">No bridges. No custodians. Just a protocol.</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 mb-24">
              <button className="px-8 py-3.5 bg-black/40 backdrop-blur-md border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm tracking-wide shadow-xl">
                Explore the Protocol
              </button>
              <button className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Run a Miner
              </button>
            </div>

            {/* <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-xs text-gray-300 uppercase tracking-widest font-semibold border-t border-white/20 pt-8 w-full max-w-3xl text-shadow-strong">
              <div className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span> Validators Live</div>
              <div className="flex items-center gap-2.5"><Activity className="w-3.5 h-3.5 text-blue-400 drop-shadow-md" /> Messages Routing</div>
              <div className="flex items-center gap-2.5"><Database className="w-3.5 h-3.5 text-pink-400 drop-shadow-md" /> TAO Streaming</div>
            </div> */}
          </motion.div>
        </section>

        {/* THE PROBLEM */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gray-300 uppercase tracking-[0.2em] font-medium text-xs mb-6 block text-shadow-strong">The Multichain Problem</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-metallic-premium drop-shadow-xl">
                THE CHAINS <br />DON'T TALK.
              </h2>
              <p className="text-lg md:text-xl text-gray-100 font-normal leading-relaxed mb-10 text-shadow-strong">
                Blockchains are isolated by design. Moving value or data across them requires a trusted intermediary — bridges that have been exploited for billions. The status quo is broken.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-10">
                <div>
                  <div className="text-4xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">$2.8B</div>
                  <div className="text-gray-200 text-sm font-medium text-shadow-strong">Lost to bridge exploits since 2021</div>
                </div>
                <div>
                  <div className="text-4xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">13+</div>
                  <div className="text-gray-200 text-sm font-medium text-shadow-strong">Major bridge hacks recorded</div>
                </div>
                <div className="col-span-2">
                  <div className="text-4xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">100%</div>
                  <div className="text-gray-200 text-sm font-medium text-shadow-strong">Rely on a centralised trust point</div>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-10 bg-black/50 border border-white/20">
              <h3 className="text-lg font-semibold mb-8 flex items-center gap-3 text-white"><Lock className="w-4 h-4 text-gray-300" /> Notable Bridge Exploits</h3>
              <div className="space-y-6">
                {[
                  { name: "Ronin Network", date: "March 2022 · Validator key compromise", amount: "$625M" },
                  { name: "Poly Network", date: "August 2021 · Smart contract exploit", amount: "$611M" },
                  { name: "BNB Bridge", date: "October 2022 · BSC token hub exploit", amount: "$570M" },
                  { name: "Wormhole", date: "February 2022 · Signature verification flaw", amount: "$320M" },
                  { name: "Nomad Bridge", date: "August 2022 · Fraudulent message replay", amount: "$190M" }
                ].map((exploit, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">{exploit.name}</div>
                      <div className="text-xs text-gray-300 font-medium">{exploit.date}</div>
                    </div>
                    <div className="text-[#ff4b82] font-mono font-medium text-sm tracking-tight drop-shadow">{exploit.amount}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-200 font-medium leading-relaxed">
                All exploited a single trusted party. <br /> <strong className="text-white font-bold">Entangle eliminates this.</strong>
              </div>
            </div>
          </motion.div>
        </section>

        {/* APPROACH & PROPERTIES */}
        <section id="protocol" className="py-32 px-6 md:px-12 bg-black/20 backdrop-blur-[2px]">
          <div className="max-w-7xl mx-auto w-full text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="max-w-3xl mx-auto mb-20">
              <span className="text-gray-300 uppercase tracking-[0.2em] font-medium text-xs mb-6 block text-shadow-strong">The Entangle Approach</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-metallic-premium drop-shadow-xl">A PROTOCOL, <br />NOT A BRIDGE.</h2>
              <p className="text-lg md:text-xl text-gray-100 font-normal leading-relaxed text-shadow-strong">
                Entangle is a Bittensor subnet — not a bridge. A decentralized network where autonomous validators verify cross-chain events and a competitive market of relay miners execute delivery.
                <br /><br />
                No custody. No whitelist. No single point of failure. The incentive mechanism is TAO — not a team's discretion.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { title: "Trustless verification", desc: "Every message proven by cryptographic threshold signatures" },
                { title: "Permissionless participation", desc: "Anyone can register as a miner or validator — no whitelist" },
                { title: "TAO-incentivised quality", desc: "Yuma Consensus scores performance — not a multisig vote" }
              ].map((feature, i) => (
                <div key={i} className="glass-panel bg-black/50 border-white/20 p-8 rounded-3xl group hover:bg-black/70 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-white mb-6 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all" />
                  <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MESSAGE ROUTING 5 STEPS */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-metallic-premium drop-shadow-xl">HOW A MESSAGE <br />CROSSES A CHAIN.</h2>
            <p className="text-lg md:text-xl text-gray-100 font-normal leading-relaxed text-shadow-strong">
              Every cross-chain relay is a complete autonomous economic event. Five deterministic steps — no human in the loop at any point.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6 mb-24">
            {[
              { step: "01", icon: <Hexagon strokeWidth={2} />, title: "Dispatch", desc: "dApp calls sendMessage() on source chain." },
              { step: "02", icon: <CircleDashed strokeWidth={2} />, title: "Detect", desc: "Scanner miners race to detect the event." },
              { step: "03", icon: <Shield strokeWidth={2} />, title: "Verify", desc: "Validators independently verify via RPC." },
              { step: "04", icon: <Network strokeWidth={2} />, title: "Auction", desc: "Relay miners bid on gas and latency." },
              { step: "05", icon: <Orbit strokeWidth={2} />, title: "Execute", desc: "receiveMessage() fires on destination." }
            ].map((s, i) => (
              <div key={i} className="relative group pt-8">
                <div className="text-5xl font-bold text-white/20 absolute top-0 left-4 z-0 group-hover:text-white/40 transition-colors">{s.step}</div>
                <div className="relative z-10 p-6 border-l-2 border-white/30 h-full bg-gradient-to-r from-black/40 to-transparent group-hover:border-white/60 transition-colors rounded-r-xl">
                  <div className="text-gray-200 mb-6 group-hover:text-white transition-colors">{s.icon}</div>
                  <h3 className="text-base font-semibold mb-2 text-white drop-shadow-md">{s.title}</h3>
                  <p className="text-xs text-gray-200 font-medium leading-relaxed drop-shadow-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-12 text-center bg-black/20 rounded-3xl p-8 backdrop-blur-sm mt-8">
            <div>
              <div className="text-3xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">90s</div><div className="text-gray-200 text-xs font-semibold tracking-wide uppercase text-shadow-strong">EVM relay deadline</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">4/6</div><div className="text-gray-200 text-xs font-semibold tracking-wide uppercase text-shadow-strong">Validator threshold</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">100%</div><div className="text-gray-200 text-xs font-semibold tracking-wide uppercase text-shadow-strong">Permissionless</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">TAO</div><div className="text-gray-200 text-xs font-semibold tracking-wide uppercase text-shadow-strong">Native incentive</div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE / STACK */}
        <section id="subnet" className="py-32 px-6 md:px-12 border-y border-white/20 bg-black/30 backdrop-blur-[2px]">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <span className="text-gray-200 uppercase tracking-[0.2em] font-medium text-xs mb-6 block text-center text-shadow-strong">The Stack</span>
              <h2 className="text-4xl font-semibold tracking-tight mb-16 text-center text-metallic-premium drop-shadow-xl">WHERE ENTANGLE SITS</h2>
              <div className="space-y-4 max-w-4xl mx-auto">
                {[
                  { layer: "Layer 0", name: "Bittensor", desc: "Provides incentive mechanism via Yuma Consensus. TAO emissions reward quality.", tag: "Intelligence" },
                  { layer: "Layer 0.5", name: "Entangle", desc: "Decentralized relay network. Validators verify. Miners execute. No trust required.", tag: "Messaging" },
                  { layer: "Layer 1", name: "Blockchains", desc: "EVM, Solana, SUI, Cosmos, Stellar — connected as equal participants.", tag: "Execution" },
                  { layer: "Layer 2+", name: "Applications", desc: "Multichain DeFi, cross-chain governance, AI-coordinated systems.", tag: "Products" }
                ].map((tier, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6 items-center glass-panel bg-black/60 border-white/20 p-6 md:p-8 rounded-2xl hover:bg-black/80 transition-colors shadow-2xl">
                    <div className="w-full md:w-32 shrink-0">
                      <div className="text-xs text-gray-300 font-mono font-medium mb-1 drop-shadow-md">{tier.layer}</div>
                      <div className="text-xl font-semibold text-white drop-shadow-md">{tier.name}</div>
                    </div>
                    <div className="flex-1 text-gray-200 text-sm font-normal leading-relaxed md:border-l border-white/20 md:pl-8 my-2 md:my-0 drop-shadow-sm">
                      {tier.desc}
                    </div>
                    <div className="w-full md:w-32 text-left md:text-right">
                      <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white shadow-inner">{tier.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* DEVELOPERS SECTION WITH CODE SNIPPET */}
        <section id="developers" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <span className="text-gray-200 uppercase tracking-[0.2em] font-medium text-xs mb-6 block text-shadow-strong">For Developers</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8 text-metallic-premium drop-shadow-xl">SHIP CROSS-CHAIN <br />IN MINUTES.</h2>
            <p className="text-lg md:text-xl text-gray-100 font-normal leading-relaxed mb-10 text-shadow-strong">
              One interface. Five ecosystems. Any payload. The Entangle SDK abstracts every chain's quirks behind a single call.
            </p>
            <ul className="space-y-8 bg-black/40 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <li>
                <strong className="text-white block text-lg font-semibold mb-2 drop-shadow-md">Multichain DeFi</strong>
                <span className="text-base text-gray-200 font-medium leading-relaxed drop-shadow-sm">Compose liquidity and yield strategies across EVM and Solana from a single contract call.</span>
              </li>
              <li>
                <strong className="text-white block text-lg font-semibold mb-2 drop-shadow-md">Cross-Chain Governance</strong>
                <span className="text-base text-gray-200 font-medium leading-relaxed drop-shadow-sm">Token holders on any chain vote on proposals that execute across the full ecosystem.</span>
              </li>
              <li>
                <strong className="text-white block text-lg font-semibold mb-2 drop-shadow-md">AI-Coordinated Systems</strong>
                <span className="text-base text-gray-200 font-medium leading-relaxed drop-shadow-sm">Route Bittensor AI agent instructions to smart contracts on any chain.</span>
              </li>
            </ul>
            <button className="mt-12 px-8 py-3.5 bg-white/20 border border-white/30 text-white font-semibold text-sm tracking-wide rounded-full hover:bg-white/30 transition-colors shadow-[0_4px_16px_rgba(255,255,255,0.1)]">Read the Docs</button>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="glass-panel rounded-2xl overflow-hidden relative border-2 border-white/20 shadow-2xl bg-[#0a0a0a]">
            <div className="bg-white/10 border-b border-white/20 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              </div>
              <div className="text-xs font-mono font-medium text-gray-300">sendMessage.sol</div>
            </div>
            <pre className="p-8 text-[14px] font-mono font-medium leading-relaxed text-gray-100 overflow-x-auto bg-black border-t border-white/5">
              <code className="text-[#c678dd]">import</code> <code className="text-[#98c379]">"@entangle/IEntangle.sol"</code>;{'\n\n'}
              <code className="text-[#c678dd]">contract</code> MyApp {'{\n'}
              {'  '}IEntangle <code className="text-[#c678dd]">public immutable</code> entangle;{'\n\n'}
              {'  '}<code className="text-[#c678dd]">function</code> <code className="text-[#61afef]">sendToSolana</code>({'\n'}
              {'    '}<code className="text-[#c678dd]">bytes calldata</code> dstAddr,{'\n'}
              {'    '}<code className="text-[#c678dd]">bytes calldata</code> payload{'\n'}
              {'  '}) <code className="text-[#c678dd]">external payable</code> {'{\n\n'}
              {'    '}<code className="text-[#5c6370] italic">// Calculate required fee</code>{'\n'}
              {'    '}<code className="text-[#c678dd]">uint256</code> fee = entangle.calculateFee({'\n'}
              {'      '}<code className="text-[#98c379]">"solana_mainnet"</code>,{'\n'}
              {'      '}payload.length{'\n'}
              {'    '});{'\n\n'}
              {'    '}<code className="text-[#5c6370] italic">// Entangle handles the rest.</code>{'\n'}
              {'    '}entangle.sendMessage{'{'}<code className="text-[#d19a66]">value</code>: fee{'}'}({'\n'}
              {'      '}<code className="text-[#98c379]">"solana_mainnet"</code>,{'\n'}
              {'      '}dstAddr, payload{'\n'}
              {'    '});{'\n'}
              {'  }'}{'\n'}
              {'}'}
            </pre>
          </motion.div>
        </section>

        {/* SUPPORTED CHAINS */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full text-center bg-black/20 rounded-3xl backdrop-blur-sm border border-white/10 mt-12 mb-12">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-gray-200 uppercase mb-12 text-shadow-strong">Supported Chains</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "Ethereum", ticker: "ETH", status: "Live" },
              { name: "Solana", ticker: "SOL", status: "Live" },
              { name: "SUI", ticker: "SUI", status: "Live" },
              { name: "Cosmos", ticker: "COS", status: "Live" },
              { name: "Stellar", ticker: "XLM", status: "Live" },
              { name: "Polygon", ticker: "POL", status: "Coming soon" },
              { name: "Avalanche", ticker: "AVA", status: "Coming soon" },
              { name: "Base", ticker: "BSE", status: "Coming soon" },
            ].map((chain, i) => (
              <div key={i} className="glass-panel bg-black/50 border-white/20 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-black/80 hover:border-white/40 transition-all shadow-lg">
                <div className="font-medium text-sm text-white mb-1 drop-shadow-md">{chain.name}</div>
                <div className={`text-[10px] uppercase font-bold tracking-widest ${chain.status === 'Live' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'text-gray-400'}`}>{chain.status}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MINERS & VALIDATORS */}
        <section id="miners" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="glass-panel bg-black/60 p-10 md:p-14 rounded-3xl group border-l-[6px] border-[#00d2ff] hover:bg-black/80 transition-colors shadow-2xl">
            <span className="text-gray-300 uppercase tracking-[0.2em] font-medium text-xs mb-6 block text-shadow-strong">For Miners</span>
            <h2 className="text-4xl font-semibold mb-6 text-white tracking-tight drop-shadow-xl">RELAY IS A <br />COMMODITY NOW.</h2>
            <p className="text-gray-200 text-base font-medium leading-relaxed mb-10 text-shadow-strong">
              Miners compete. Validators verify. TAO rewards quality. No gatekeepers — just infrastructure performance rewarded every epoch.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12 bg-black/40 p-6 rounded-2xl border border-white/10">
              <div><div className="text-2xl font-bold text-white mb-1 drop-shadow-md">30%</div><div className="text-xs uppercase tracking-widest text-gray-300 font-semibold drop-shadow-sm">Scanner Emissions</div></div>
              <div><div className="text-2xl font-bold text-white mb-1 drop-shadow-md">70%</div><div className="text-xs uppercase tracking-widest text-gray-300 font-semibold drop-shadow-sm">Relay Emissions</div></div>
            </div>
            <button className="text-white font-bold text-sm flex items-center gap-3 tracking-wide drop-shadow-md hover:translate-x-2 transition-transform">Run a Miner <ArrowRight className="w-5 h-5 text-[#00d2ff]" /></button>
          </div>

          <div id="validators" className="glass-panel bg-black/60 p-10 md:p-14 rounded-3xl group border-l-[6px] border-[#ff1a66] hover:bg-black/80 transition-colors shadow-2xl">
            <span className="text-gray-300 uppercase tracking-[0.2em] font-medium text-xs mb-6 block text-shadow-strong">For Validators</span>
            <h2 className="text-4xl font-semibold mb-6 text-white tracking-tight drop-shadow-xl">SECURE THE NETWORK.<br />EARN CONSENSUS.</h2>
            <p className="text-gray-200 text-base font-medium leading-relaxed mb-10 text-shadow-strong">
              Validators are the trust anchors of Entangle — running the gas oracle, orchestrating relay auctions, collecting threshold attestations, and applying Yuma Consensus.
            </p>
            <ul className="space-y-6 text-sm font-semibold text-gray-200 mb-12 bg-black/40 p-6 rounded-2xl border border-white/10">
              <li className="flex gap-4 items-center"><span className="text-[#ff1a66] font-bold text-lg">01</span> <span className="drop-shadow-sm">Maintain on-chain gas prices securely.</span></li>
              <li className="flex gap-4 items-center"><span className="text-[#ff1a66] font-bold text-lg">02</span> <span className="drop-shadow-sm">Exchange signatures via P2P.</span></li>
              <li className="flex gap-4 items-center"><span className="text-[#ff1a66] font-bold text-lg">03</span> <span className="drop-shadow-sm">Organize competitive relay auctions.</span></li>
            </ul>
            <button className="text-white font-bold text-sm flex items-center gap-3 tracking-wide drop-shadow-md hover:translate-x-2 transition-transform">Validator Docs <ArrowRight className="w-5 h-5 text-[#ff1a66]" /></button>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="pt-32 pb-12 flex flex-col items-center text-center px-4 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-10 bg-black/60 backdrop-blur-md shadow-2xl">
            <div className="w-6 h-6 rounded-full bg-white animate-spin shadow-[0_0_15px_rgba(255,255,255,0.8)]" style={{ animationDuration: '4s' }} />
          </div>
          <h2 className="text-6xl font-semibold tracking-tight mb-8 text-metallic-premium drop-shadow-2xl">JOIN THE NETWORK.</h2>
          <p className="text-xl text-gray-100 font-medium mb-12 max-w-2xl leading-relaxed text-shadow-strong">
            The relay layer of Web3 is being built right now. <br />The question is whether you're building it.
          </p>
          <div className="flex gap-4 mb-24">
            <button className="px-10 py-4 bg-white text-black font-bold text-base tracking-wide rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 duration-200">Launch App</button>
          </div>

          <div className="flex flex-wrap justify-center gap-10 text-[13px] text-gray-300 font-semibold tracking-widest w-full border-t border-white/20 pt-12 max-w-5xl uppercase drop-shadow-sm">
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">Mine</span>
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">Validate</span>
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">Build</span>
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">GitHub</span>
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">Discord</span>
          </div>
        </section>

      </div>
    </main>
  );
}
