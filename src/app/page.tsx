'use client';

import { Scene } from '@/components/canvas/Scene';
import Image from 'next/image';
import logoImg from '@/app/asset/Entangle_Protocol_-_Logo_header.png';
import entImg from '@/app/asset/ep_graphic_elements_compressed.png';
import websiteCodeImg from '@/app/asset/website_code_image.png';
import { ChainIcons } from '@/app/ChainIcons';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Cpu,
  Database,
  Globe,
  Hexagon,
  Lock,
  Network,
  Orbit,
  Server,
  Shield,
  Zap,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const heroVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
};

const flowSteps = [
  ['Send', 'dApp calls sendMessage()'],
  ['Emit', 'Event dispatched on-chain'],
  ['Scan', 'Miner detects event'],
  ['Check', 'Validator verifies'],
  ['Attest', 'Validators threshold signatures'],
  ['Auction', '2s sealed bid window'],
  ['Deliver', 'Winner executes tx'],
  ['Score', 'Proof verified & recorded'],
] as const;

const deliveryBenchmarks = [
  ['5 - 12s', 'Solana & High Perf', '(Sui/Stellar)'],
  ['8 - 25s', 'EVM L2s (Arb, Base)', ''],
  ['60s+', 'Ethereum L1 (Finality)', ''],
] as const;

const developerPillars = [
  ['Standardized Interface', 'Write once using our Solidity SDK. Deploy to EVM, Solana, Cosmos, and Stellar without changes.'],
  ['Automated Security', 'Signatures verified on-chain. Fees calculated automatically. No manual oracle management needed.'],
  ['Instant Integration', "Copy our interface. Call sendMessage(). You're cross-chain in under 10 minutes."],
] as const;

const chainSupport = [
  ['Ethereum', 'EVM L1'],
  ['Arbitrum', 'EVM L2'],
  ['Optimism', 'EVM L2'],
  ['Base', 'EVM L2'],
  ['Solana', 'SVM'],
  ['Sui', 'Move'],
  ['Cosmos', 'IBC'],
  ['Stellar', 'Soroban'],
] as const;

const securityItems = [
  ['Multi-Chain Signatures', 'EVM: secp256k1 / ecrecover. Non-EVM: ed25519 (Solana, Sui, Cosmos).'],
  ['On-Chain Verification', 'Smart contracts enforce cryptographic proofs. verifyMessage(msg_hash, sig_bundle).'],
  ['Trust Minimized', 'No single validator can authorize a delivery. Consensus threshold required for all ops.'],
] as const;

const scannerItems = [
  ['Real-time Polling', 'Queries RPC nodes every block to detect MessageDispatched events.'],
  ['Event Filtering', 'Validates payload structure and ensures correct source contract emission.'],
  ['Validator Feed', 'Propagates verified events to the Validator set for consensus.'],
] as const;

const relayItems = [
  ['Sealed Auctions', 'Bids latency & gas in 2s windows. Fastest + cheapest wins.'],
  ['Cross-Chain Delivery', 'Executes transaction on destination contract immediately.'],
  ['Proof Submission', 'Returns delivery proof on-chain to unlock fees & TAO.'],
] as const;

const scoringDimensions = [
  ['D1', 'Latency', 'Time from source dispatch to destination delivery measured in ms.'],
  ['D2', 'Confirmation', 'Delivery within promised deadline. Missed deadlines = zero score.'],
  ['D3', 'Gas Efficiency', 'Optimizing on-chain costs vs. oracle estimates.'],
  ['D4', 'Integrity', 'Payload hash matching source event exactly.'],
  ['D5', 'Reliability', 'Historical uptime and successful delivery rate.'],
] as const;

const roadmap = [
  {
    phase: 'Phase 1',
    status: 'Active now',
    items: [
      'Testnets Deployed - Sepolia, Arb Sepolia, Solana Devnet',
      'Multisig Governance - Deployed across 5 ecosystems',
      'Security Audits - Smart contracts in final review',
      'Monitoring Stack - Alerting & dashboards live',
    ],
  },
  {
    phase: 'Phase 2',
    status: 'Up next',
    items: [
      'Mainnet Launch - ETH, Arb, Solana, Sui, Cosmos',
      'End Bootstrap Mode - Competitive scoring begins',
      'Real Integrations - First dApps go live',
      'Full Economics - Relay reserve funded by fees',
    ],
  },
  {
    phase: 'Phase 3+',
    status: 'Future',
    items: [
      'Ecosystem Growth - ChainAdapter plugins',
      'ZK Verification - Trustless proof alternative',
      'Institutional Scale - Operator program',
      'DAO Governance - Community parameter control',
    ],
  },
] as const;

function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={(centered ? 'max-w-3xl mx-auto text-center ' : 'max-w-3xl ') + "relative z-10"}>
      <span className="text-gray-200 font-medium type-body mb-5 block text-shadow-strong">{eyebrow}</span>
      <h2 className={`type-title ${description ? 'mb-6' : 'mb-0'} text-metallic-premium drop-shadow-xl leading-[1.15]`}>{title}</h2>
      {description ? (
        <p className="type-body text-gray-100 leading-relaxed text-shadow-strong">{description}</p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <main className="relative w-full bg-[#020205] text-white selection:bg-[#cccccc] selection:text-black">
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <Scene />
      </div>

      <header className="fixed top-0 inset-x-0 mx-auto z-50 flex items-center justify-between py-3 px-6 md:px-12 pointer-events-auto bg-[#020205]/40 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Image
            src={logoImg}
            alt="Entangle Protocol Logo"
            width={44}
            height={44}
            className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.18)]"
            priority
          />
          <span className="font-light text-base lowercase text-gray-200">entangle protocol</span>
        </div>

        <a href="/final_whitepaper.pdf" target="_blank" rel="noopener noreferrer">
          <button
            className="px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Whitepaper
          </button>
        </a>
      </header>

      <div className="relative z-10 w-full flex flex-col pb-0">
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
          <motion.div initial="hidden" animate="visible" variants={heroVariant} className="flex flex-col items-center w-full max-w-6xl relative z-10">
            <div className="relative">
              <h1 className="type-display mb-8 text-metallic-premium drop-shadow-2xl max-w-[1400px] overflow-visible">
                <span className="block text-[0.92em] md:text-[0.88em]">Seamless&nbsp;Messaging</span>
                <span className="block whitespace-nowrap text-[0.92em] md:text-[0.88em] pb-3">Across&nbsp;Every&nbsp;Chain</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                onClick={() => scrollTo('developers')}
                className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                GitHub
              </button>
              <a href="https://entangle-protocol-docs.vercel.app/" target="_blank" rel="noopener noreferrer">
                <button
                  className="px-8 py-3.5 bg-black/40 backdrop-blur-md border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm shadow-xl"
                >
                  Docs
                </button>
              </a>
            </div>
          </motion.div>
        </section>

        {false && (
          <section className="my-24 md:my-32 px-6 md:px-12 max-w-5xl mx-auto w-full relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="grid w-full gap-5 md:grid-cols-2">
              <div className="rounded-[2.5rem] border border-white/10 bg-black/20 px-8 py-10 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors">
                <div className="type-display text-white mb-4">$3.7T</div>
                <div className="type-body text-white mb-2">Blockchains don&apos;t talk.</div>
                <div className="type-body text-gray-400 leading-relaxed">Trapped in isolated ecosystems.</div>
              </div>
              <div className="rounded-[2.5rem] border border-white/10 bg-black/20 px-8 py-10 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors">
                <div className="type-display text-white mb-4">$2.7B</div>
                <div className="type-body text-white mb-2">Stolen from bridges.</div>
                <div className="type-body text-gray-400 leading-relaxed">(2021-2023). Users chain-jailed. Adoption stalls.</div>
              </div>
            </motion.div>
          </section>
        )}

        <section className="my-24 md:my-32 py-20 px-8 md:px-16 lg:py-24 lg:px-20 max-w-[1300px] mx-auto w-full surface-glass-extreme rounded-[2.5rem] shadow-2xl relative z-10 border border-white/5 overflow-hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              viewport={{ once: true }}
              className="relative w-full flex justify-center overflow-visible"
            >

              <Image
                src={entImg}
                alt="Entangle Protocol Network Structure"
                className="relative z-10 w-full h-auto object-contain scale-125 drop-shadow-[0_0_20px_rgba(204,204,204,0.15)] hover:scale-[1.30] transition-transform duration-700 ease-out opacity-80"
                priority
              />
            </motion.div>

            <div className="flex flex-col justify-center h-full xl:pl-10 relative">

              <div className="relative z-10">
                <SectionHeader
                  eyebrow="A different philosophy"
                  title={
                    <span className="text-white">
                      What if the relay network was a market, not an operator?
                    </span>
                  }
                />

                <div className="w-20 h-[3px] bg-gradient-to-r from-white/60 to-transparent my-8 rounded-full"></div>

                <p className="type-body text-gray-400 font-light max-w-xl mb-6">
                  Entangle turns trust into competition. Thousands of independent miners race to detect cross-chain messages and deliver them. The fastest, most accurate ones win. The rest are scored out automatically, not by us, but by math.
                </p>
                <p className="type-body text-white font-medium max-w-xl">
                  This is what Bittensor makes possible.
                </p>
              </div>
            </div>
          </motion.div>
        </section>


        <section id="simple-integration" className="w-full relative z-10 my-24 md:my-32 px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden max-w-[1300px] mx-auto w-full">

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">

              {/* Left Side: Text Content */}
              <div className="flex flex-col justify-center h-full xl:pr-10 relative">
                <div className="relative z-10 space-y-10">
                  <h2 className="type-title text-metallic-premium drop-shadow-2xl mb-8">
                    Entangle Design Principle
                  </h2>

                  <div className="space-y-3">
                    <h3 className="type-subtitle text-white">No single point of anything</h3>
                    <p className="type-body text-gray-400 font-light leading-relaxed">
                      N-of-M validators attest every message. No single validator can authorize a delivery. No single miner controls the relay.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="type-subtitle text-white">Incentives over promises</h3>
                    <p className="type-body text-gray-400 font-light leading-relaxed">
                      We don't ask miners to be honest. We make honesty the profitable strategy. Bad actors earn near zero and exit naturally.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="type-subtitle text-white">One interface. Every chain.</h3>
                    <p className="type-body text-gray-400 font-light leading-relaxed">
                      sendMessage(). verifyMessage(). Two functions. That's the entire surface area your dApp needs to touch. What happens in between is invisible to you. As it should be.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Code Image */}
              <div className="relative w-full flex justify-center items-center">
                <Image
                  src={websiteCodeImg}
                  alt="Integration Code Example"
                  className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] opacity-75"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="reference-run" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">



            <div className="flex flex-col items-center justify-center text-center w-full relative z-10 mb-8 pt-3">
              <h2 className="type-title mb-2 w-full text-center text-metallic-premium drop-shadow-2xl">
                Live Performance
              </h2>
            </div>

            {/* Delivery Benchmarks inserted into Live Performance section with ORIGINAL design */}
            <div className="relative z-10 flex flex-col md:flex-row gap-4 mb-8 w-full max-w-[950px] mx-auto text-left">
              {deliveryBenchmarks.map(([value, title, subtitle]) => (
                <div key={title} className="flex-1 border-l-[3px] border-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors p-5 shadow-lg">
                  <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-2 drop-shadow-[0_0_15px_rgba(204,204,204,0.2)] mt-1">{value}</div>
                  <div className="text-[#888] type-label mb-1 font-semibold uppercase">{title}</div>
                  {subtitle ? <div className="text-[#555] type-label leading-relaxed">{subtitle}</div> : null}
                </div>
              ))}
            </div>

            {/* Main Reference Run Container */}
            <div className="relative z-10 w-full max-w-[950px] mx-auto border border-white/5 bg-black/20 backdrop-blur-md rounded-[10px] shadow-inner overflow-hidden">

              {/* Header Slice */}
              <div className="bg-white/[0.03] px-5 py-2 flex items-center justify-between border-b border-white/5">
                <div className="text-[11px]">
                  <span className="text-[#666]">Reference Run ID:</span>
                  <span className="text-white font-bold ml-2">#TEST-2026-03-17-A</span>
                </div>
                <div className="bg-[#cccccc] text-black font-bold type-label px-3 py-1.5 rounded-[4px] flex items-center gap-1.5 shadow-[0_0_15px_rgba(204,204,204,0.3)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"></path></svg>
                  Verified
                </div>
              </div>

              {/* Execution Diagram */}
              <div className="relative px-5 py-10 md:py-14 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0">

                {/* Connecting Line - starts at right edge of left circle, ends at left edge of right circle */}
                <div className="hidden md:block absolute top-[calc(3.5rem+36px)] left-[calc(1.25rem+126px)] right-[calc(1.25rem+126px)] h-[1.5px] bg-gradient-to-r from-[#cccccc]/80 via-[#111111] to-[#cccccc]/80 z-0 shadow-[0_0_15px_rgba(204,204,204,0.4)]"></div>

                {/* Left Node (Sepolia) */}
                <div className="relative z-10 flex flex-col items-center text-center w-full md:w-[180px]">
                  <div className="w-[72px] h-[72px] rounded-full border-[2px] border-[#cccccc] bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(204,204,204,0.3)] flex items-center justify-center mb-3 z-10 hover:bg-black/60 transition-colors">
                    <svg className="w-[30px] h-[30px] text-white" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M15.925 23.969L15.823 24l-7.447-4.391 7.553 10.638 7.57-10.638-7.574 4.36zM15.986 0L8.358 12.67l7.625 4.542 7.643-4.542L15.986 0z" />
                    </svg>
                  </div>
                  <div className="type-subtitle text-white mb-1.5">Sepolia</div>
                  <div className="text-[#666] text-[12px] mb-1.5 whitespace-nowrap">Message Dispatched</div>
                  <div className="bg-[#cccccc]/10 text-[#cccccc] border border-[#cccccc]/20 rounded-[4px] px-2.5 py-1 text-[11px] mb-3 min-w-[130px]">
                    0x4f90576e...
                  </div>
                  <div className="text-[#555] text-[10px] bg-transparent mt-0.5">Block 10464665</div>
                </div>

                {/* Middle Node (ENTANGLE RELAY) - Desktop: absolutely centered on the line */}
                <div className="hidden md:flex absolute left-1/2 top-[calc(3.5rem+36px)] -translate-x-1/2 -translate-y-1/2 z-10 w-[170px] bg-[#0a0a0f]/80 hover:bg-white/5 transition-colors backdrop-blur-md border border-white/5 rounded-[8px] p-4 flex-col items-center text-center">
                  <div className="text-[#777] type-label mb-1">Entangle Relay</div>
                  <div className="text-white text-[26px] font-bold mb-0.5">8.3s</div>
                  <div className="flex items-center gap-1 text-[#cccccc] text-[9px] font-bold mt-0.5">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    Optimized
                  </div>
                </div>
                {/* Middle Node (ENTANGLE RELAY) - Mobile: inline flow */}
                <div className="md:hidden relative z-10 w-[170px] bg-transparent hover:bg-white/5 transition-colors backdrop-blur-sm border border-white/5 rounded-[8px] p-4 flex flex-col items-center text-center">
                  <div className="text-[#777] type-label mb-1">Entangle Relay</div>
                  <div className="text-white text-[26px] font-bold mb-0.5">8.3s</div>
                  <div className="flex items-center gap-1 text-[#cccccc] text-[9px] font-bold mt-0.5">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    Optimized
                  </div>
                </div>

                {/* Right Node (Arbitrum) */}
                <div className="relative z-10 flex flex-col items-center text-center w-full md:w-[180px]">
                  <div className="w-[72px] h-[72px] rounded-full border-[2px] border-[#cccccc] bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(204,204,204,0.3)] flex items-center justify-center mb-3 z-10 hover:bg-black/60 transition-colors">
                    <svg className="w-[30px] h-[30px] text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zm0 6l-10 5 10 5 10-5-10-5zm0 6l-10 5 10 5 10-5-10-5z" />
                    </svg>
                  </div>
                  <div className="type-subtitle text-white mb-1.5 whitespace-nowrap">Arbitrum Sepolia</div>
                  <div className="text-[#666] text-[12px] mb-1.5 whitespace-nowrap">Message Received</div>
                  <div className="bg-[#cccccc]/10 text-[#cccccc] border border-[#cccccc]/20 rounded-[4px] px-2.5 py-1 text-[11px] mb-3 min-w-[130px]">
                    0xf802b3b6...
                  </div>
                  <div className="text-[#555] text-[10px] bg-transparent mt-0.5">isRelayed = true</div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {false && (
          <section id="protocol" className="my-24 md:my-32 py-16 md:py-24 px-6 max-w-[1400px] mx-auto w-full surface-glass-strong rounded-[2rem] shadow-2xl relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <div className="mb-8 px-4 w-full relative z-10">
                <div className="flex flex-col items-center text-center w-full relative z-10 mb-8">
                  <h2 className="type-title mb-5 text-metallic-premium drop-shadow-2xl">How It Flows</h2>
                  <p className="type-body text-gray-400 max-w-2xl">From source transaction to destination delivery in 8 automated steps.</p>
                </div>

                <div className="relative z-10 mt-40 mb-16 w-full mx-auto overflow-x-auto md:overflow-visible pb-16 md:pb-0">
                  <div className="min-w-[1200px] w-full px-12 md:px-0">
                    <div className="relative z-10 w-full h-[180px] mt-24 mb-24 flex items-center">

                      {/* The Bus Topology Path */}
                      <div className="absolute inset-x-8 md:inset-x-0 inset-y-0 pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#cccccc" stopOpacity="0.1" />
                              <stop offset="15%" stopColor="#cccccc" />
                              <stop offset="85%" stopColor="#cccccc" />
                              <stop offset="100%" stopColor="#cccccc" stopOpacity="0.1" />
                            </linearGradient>
                            <filter id="glowFlow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          {/* Main Bus Line */}
                          <path
                            d="M 0,50 L 100,50"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                          />
                          <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 0,50 L 100,50"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2.5"
                            vectorEffect="non-scaling-stroke"
                            filter="url(#glowFlow)"
                          />

                          {/* Connector Branches */}
                          {flowSteps.map((_, i) => {
                            const x = 10 + i * (80 / 7);
                            const isTop = (i % 2 === 0);
                            const yNodeBox = isTop ? -25 : 125;
                            return (
                              <motion.line
                                key={i}
                                x1={x}
                                y1="50"
                                x2={x}
                                y2={yNodeBox}
                                stroke="rgba(204,204,204,0.3)"
                                strokeWidth="1.5"
                                vectorEffect="non-scaling-stroke"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
                              />
                            );
                          })}
                        </svg>
                      </div>

                      <div className="absolute inset-x-8 md:inset-x-0 inset-y-0">
                        {/* Junction Dots overlay */}
                        {flowSteps.map((_, i) => {
                          const x = 10 + i * (80 / 7);
                          return (
                            <motion.div
                              key={`junction-${i}`}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true, margin: '-50px' }}
                              transition={{ duration: 0.3, delay: 1.0 + (i * 0.1) }}
                              className="absolute w-[6px] h-[6px] rounded-full bg-[#0a0d10] border-[1.5px] border-[#cccccc] pointer-events-none"
                              style={{ left: `${x}%`, top: `50%`, transform: 'translate(-50%, -50%)', zIndex: 10 }}
                            />
                          )
                        })}

                        {flowSteps.map((step, i) => {
                          const colorClass = 'bg-[#cccccc]';
                          const textColorClass = 'text-[#cccccc]';

                          const x = 10 + i * (80 / 7);
                          const isTop = (i % 2 === 0);
                          const y = isTop ? 0 : 100;
                          const textPos = isTop ? 'top' : 'bottom';

                          return (
                            <div key={i} style={{ left: `${x}%`, top: `${y}%` }} className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group">
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: 0.2 + (i * 0.15), type: 'spring', stiffness: 200, damping: 20 }}
                                className="relative flex items-center justify-center"
                              >
                                {/* Circle Node */}
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-black text-[12px] relative z-20 ${colorClass} shadow-[0_0_15px_rgba(204,204,204,0.5)] border-[1.5px] border-transparent group-hover:border-white/50 transition-all duration-300 group-hover:scale-110`}>
                                  {i + 1}
                                </div>

                                {/* Outer Rotating Ring */}
                                <div className="absolute inset-[-5px] rounded-full border border-dashed border-[#cccccc]/50 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                {/* Text Content */}
                                <div className={`absolute ${textPos === 'top' ? 'bottom-[100%] mb-4' : 'top-[100%] mt-4'} text-center flex flex-col items-center pointer-events-none z-30`}>
                                  <div className="w-[160px] h-[95px] bg-black/20 backdrop-blur-md px-4 py-3 rounded-[12px] flex flex-col items-center justify-center gap-1.5 border border-white/10 shadow-inner hover:bg-white/5 transition-colors">
                                    <div className={`type-subtitle ${textColorClass} text-center w-full leading-tight`}>{step[0]}</div>
                                    <div className="text-[11px] md:text-[12px] text-gray-400 leading-[1.3] text-center w-full">{step[1]}</div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </section>
        )}


        <section id="protocol-flow" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            <div className="flex flex-col items-center text-center w-full relative z-10 mb-10 pt-4">
              <h2 className="type-title mb-2 text-metallic-premium drop-shadow-2xl">
                Three steps - Fully autonomous
              </h2>
            </div>

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 border border-white/5 rounded-[12px] bg-black/20 backdrop-blur-md shadow-inner relative z-10">

              {/* Card 1: Scan */}
              <div className="p-6 md:p-8 flex flex-col items-start hover:bg-white/5 transition-colors">
                <div className="text-[#555] font-mono text-[10px] tracking-widest mb-8 font-bold">01 / 03</div>

                <div className="mb-8 w-10 h-10 relative flex items-center justify-start text-[#cccccc]">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" strokeDasharray="3 3.5" />
                    <line x1="12" y1="2" x2="12" y2="5" strokeLinecap="round" />
                    <line x1="12" y1="19" x2="12" y2="22" strokeLinecap="round" />
                    <line x1="2" y1="12" x2="5" y2="12" strokeLinecap="round" />
                    <line x1="19" y1="12" x2="22" y2="12" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>

                <h3 className="type-subtitle text-white mb-3">Scan</h3>
                <p className="type-body text-[#888] mb-10 flex-grow pr-2">
                  Scanner miners continuously watch source chain contracts for <span className="text-[#cccccc] font-mono text-[12px] bg-[#cccccc]/10 px-1 py-0.5 rounded">MessageDispatched</span> events and report them to validators with cryptographic precision.
                </p>

                <div className="mt-auto inline-block bg-[#cccccc]/10 text-[#cccccc] text-[10px] px-3 py-1.5 rounded-[4px] font-bold border border-[#cccccc]/20 whitespace-nowrap">
                  SCANNER MINERS <span className="opacity-70 mx-1">&rarr;</span> 30% TAO
                </div>
              </div>

              {/* Card 2: Auction */}
              <div className="p-6 md:p-8 flex flex-col items-start hover:bg-white/5 transition-colors">
                <div className="text-[#555] font-mono text-[10px] tracking-widest mb-8 font-bold">02 / 03</div>

                <div className="mb-8 w-10 h-10 relative flex items-center justify-start text-[#cccccc]">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <circle cx="8" cy="7" r="1" fill="currentColor" stroke="none" />
                    <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
                    <circle cx="16" cy="7" r="1" fill="currentColor" stroke="none" />
                    <path d="M7 13l5 4 5-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3 className="type-subtitle text-white mb-3">Auction</h3>
                <p className="type-body text-[#888] mb-10 flex-grow pr-2">
                  Validators verify events, collect threshold attestations, and run a transparent relay auction — selecting the optimal miner by latency, gas estimate, and historical accuracy.
                </p>

                <div className="mt-auto inline-block bg-[#cccccc]/10 text-[#cccccc] text-[10px] px-3 py-1.5 rounded-[4px] font-bold border border-[#cccccc]/20 whitespace-nowrap">
                  VALIDATORS <span className="opacity-70 mx-1">&rarr;</span> ORCHESTRATION
                </div>
              </div>

              {/* Card 3: Relay */}
              <div className="p-6 md:p-8 flex flex-col items-start hover:bg-white/5 transition-colors">
                <div className="text-[#555] font-mono text-[10px] tracking-widest mb-8 font-bold">03 / 03</div>

                <div className="mb-8 w-10 h-10 relative flex items-center justify-start text-[#cccccc]">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 7.5 A 9.5 9.5 0 1 0 20 16.5" strokeLinecap="round" />
                    <polygon points="21.5,9.5 16.5,12 21.5,14.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>

                <h3 className="type-subtitle text-white mb-3">Relay</h3>
                <p className="type-body text-[#888] mb-10 flex-grow pr-2">
                  The winning relay miner executes the delivery on the destination chain using the validator-issued threshold signature bundle, then submits cryptographic proof back to earn TAO emissions.
                </p>

                <div className="mt-auto inline-block bg-[#cccccc]/10 text-[#cccccc] text-[10px] px-3 py-1.5 rounded-[4px] font-bold border border-[#cccccc]/20 whitespace-nowrap">
                  RELAY MINERS <span className="opacity-70 mx-1">&rarr;</span> 70% TAO
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competition Table Section */}
        <section id="competition" className="w-full relative z-10 my-24 md:my-32 px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            {/* Header */}
            <div className="flex flex-col items-center text-center w-full relative z-10 mb-8 pt-4">
              <h2 className="type-title text-metallic-premium drop-shadow-2xl">
                The only relay network with real competition
              </h2>
            </div>

            {/* Inner Table Container */}
            <div className="border border-white/5 rounded-[12px] bg-black/20 backdrop-blur-md shadow-inner overflow-x-auto relative z-10 p-6 md:p-8">
              <div className="min-w-[800px] relative">

                {/* Shiny Highlight behind Entangle column (33% to 50% width) */}
                <div className="absolute top-10 bottom-10 left-[31%] w-[20%] bg-white/[0.06] blur-[60px] rounded-full pointer-events-none z-0"></div>

                <div className="relative z-10">
                  {/* Table Header */}
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 text-[11px] uppercase tracking-[0.2em] font-mono font-bold items-end border-b border-white/[0.08] pb-5 mb-2">
                    <div className="text-[#888] pl-2">Feature</div>
                    <div className="relative text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                      <div className="absolute top-[-24px] left-0 right-10 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                      Entangle
                    </div>
                    <div className="text-[#888]">Wormhole</div>
                    <div className="text-[#888]">LayerZero</div>
                    <div className="text-[#888]">Axelar</div>
                  </div>

                  {/* Rows */}
                  <div className="flex flex-col">
                    {[
                      { f: "Open miner competition", e: "check", w: "cross", l: "cross", a: "cross" },
                      { f: "Permissionless mining", e: "check", w: "cross", l: "cross", a: "cross" },
                      { f: "Economic incentives for relayers", e: "TAO emissions", w: "Fixed fees only", l: "Fixed fees only", a: "Fixed fees only" },
                      { f: "Source-chain-only fee for users", e: "check", w: "cross", l: "Partial", a: "cross" },
                      { f: "Dynamic gas oracle", e: "check", w: "cross", l: "cross", a: "cross" },
                      { f: "Two-phase bid competition", e: "gas", w: "cross", l: "cross", a: "cross" },
                      { f: "Self-sustaining economics", e: "fee", w: "cross", l: "cross", a: "cross" },
                      { f: "Decentralised chain watching", e: "scan", w: "Guardian set", l: "DVN set", a: "Validator set" },
                    ].map((row, i) => (
                      <div key={i} className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 py-5 hover:bg-white/[0.02] transition-colors items-center text-[13px] ${i !== 7 ? 'border-b border-white/[0.03]' : ''}`}>
                        <div className="text-white font-medium pl-2 tracking-wide">{row.f}</div>

                        <div className="text-white font-medium flex items-center gap-3 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                          {row.e === "check" && <svg className="w-[16px] h-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                          {row.e === "gas" && <><svg className="w-[16px] h-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> No gas waste</>}
                          {row.e === "fee" && <><svg className="w-[16px] h-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Fee flywheel</>}
                          {row.e === "scan" && <><svg className="w-[16px] h-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Scanner miners</>}
                          {row.e !== "check" && row.e !== "gas" && row.e !== "fee" && row.e !== "scan" && row.e}
                        </div>

                        <div className="text-[#666] font-medium tracking-wide">
                          {row.w === "cross" ? <svg className="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> : row.w}
                        </div>
                        <div className="text-[#666] font-medium tracking-wide">
                          {row.l === "cross" ? <svg className="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> : row.l}
                        </div>
                        <div className="text-[#666] font-medium tracking-wide">
                          {row.a === "cross" ? <svg className="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> : row.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </section>


        {/* Protocol Properties Section */}
        {/* Protocol Properties Section */}
        <section className="w-full relative z-10 my-24 md:my-32 px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            {/* Header */}
            <div className="flex flex-col items-center text-center w-full relative z-10 mb-10 pt-4">
              <h2 className="type-title mb-4 text-metallic-premium drop-shadow-2xl">
                Built for Permanent Infrastructure
              </h2>
            </div>

            {/* Grid Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/5 rounded-[12px] bg-black/20 backdrop-blur-md shadow-inner relative z-10 overflow-hidden">
              {[
                {
                  title: "TRUSTLESS VERIFICATION",
                  desc: "Every message is verified by a threshold of independent validators through cryptographic signature bundles. No single party can forge or censor a message. Verification is provable on-chain — not claimed off-chain.",
                  icon: <svg className="w-[18px] h-[18px] text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                },
                {
                  title: "DECENTRALIZED ROUTING",
                  desc: "An open competitive market of relay miners routes messages. No whitelist. No permissioned set. Any entity can register as a relay miner, compete in auctions, and earn TAO — creating the first truly open relay commodity market.",
                  icon: <svg className="w-[18px] h-[18px] text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                },
                {
                  title: "FIVE ECOSYSTEMS",
                  desc: "EVM, Solana, SUI, Cosmos/CosmWasm, and Stellar — each supported with a native contract, dedicated chain adapter, and custom finality logic. The same protocol, adapted to every execution environment.",
                  icon: <svg className="w-[18px] h-[18px] text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                },
                {
                  title: "PROGRAMMABLE INTEROP",
                  desc: "Arbitrary payload routing — not just token transfers. Send any calldata across any chain. Build cross-chain governance, multichain DeFi, AI-coordinated systems, and interoperable smart contracts with one SDK.",
                  icon: <svg className="w-[18px] h-[18px] text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                },
                {
                  title: "BITTENSOR-NATIVE",
                  desc: "Built as a Bittensor subnet — scoring is governed by Yuma Consensus, not a team. TAO emissions reward genuine performance. The incentive mechanism is decentralized, auditable, and cannot be gamed by the protocol team.",
                  icon: <svg className="w-[18px] h-[18px] text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                },
                {
                  title: "FAILSAFE DELIVERY",
                  desc: "Every relay round has a priority-ordered standby queue. If the winning relay miner times out or fails, the protocol automatically triggers failover to the next-best standby — preventing any single miner from becoming a delivery bottleneck.",
                  icon: <svg className="w-[18px] h-[18px] text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                }
              ].map((item, i) => (
                <div key={i} className={`p-6 md:p-7 lg:p-8 transition-colors group flex flex-col items-start hover:bg-white/[0.02] border-white/5 ${i < 3 ? 'border-b md:border-b-0 lg:border-b' : ''} ${i % 3 !== 2 ? 'border-b lg:border-b-0 lg:border-r' : 'border-b lg:border-b-0'} ${i === 4 || i === 5 ? '!border-b-0' : ''}`}>
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-[12px] md:text-[13px] font-bold text-white mb-2.5 tracking-wider uppercase font-sans">
                    {item.title}
                  </h3>
                  <p className="text-[12px] lg:text-[13px] text-[#888] leading-[1.65] font-medium mb-0 pr-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {false && (
          <section id="developers" className="my-24 md:my-32 px-6 w-full max-w-[1100px] mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
              <div className="grid xl:grid-cols-2 gap-12 xl:gap-20 items-stretch relative z-10">

                {/* Left Column */}
                <div className="relative z-10 w-full h-full group py-6 xl:py-0 flex flex-col">
                  <div className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl relative shadow-inner p-8 md:p-10 flex-1 flex flex-col justify-center">
                    <div className="inline-block relative z-10 mb-8">
                      <h2 className="type-title text-metallic-premium drop-shadow-2xl">
                        One contract<br />
                        <span>Any chain</span>
                      </h2>
                    </div>

                    <div className="space-y-6 relative">
                      <div className="flex gap-6 relative">
                        <div className="w-6 shrink-0 flex items-start justify-center pt-1">
                          <Network className="w-5 h-5 text-[#cccccc]" />
                        </div>
                        <div>
                          <h3 className="type-subtitle text-white mb-1.5">Standardized Interface</h3>
                          <p className="type-body text-gray-400">Write once using our Solidity SDK. Deploy to EVM, Solana, Cosmos, and Stellar without changes.</p>
                        </div>
                      </div>

                      <div className="flex gap-6 relative">
                        <div className="w-6 shrink-0 flex items-start justify-center pt-1">
                          <Shield className="w-5 h-5 text-[#cccccc]" />
                        </div>
                        <div>
                          <h3 className="type-subtitle text-white mb-1.5">Automated Security</h3>
                          <p className="type-body text-gray-400">Signatures verified on-chain. Fees calculated automatically. No manual oracle management needed.</p>
                        </div>
                      </div>

                      <div className="flex gap-6 relative">
                        <div className="w-6 shrink-0 flex items-start justify-center pt-1">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="type-subtitle text-white mb-1.5">Instant Integration</h3>
                          <p className="type-body text-gray-400">Copy our interface. Call <span className="bg-[#0b1d26] text-[#cccccc] px-1.5 py-0.5 rounded text-[12px] border border-[#cccccc]/10 font-mono">sendMessage()</span>. You&apos;re cross-chain in under 10 minutes.</p>
                        </div>
                      </div>

                      <div className="ml-12 pt-4">
                        <button
                          onClick={() => scrollTo('actions')}
                          className="px-6 py-3 bg-white text-black font-bold text-[12px] rounded-[4px] hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2.5 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        >
                          Start Building <span className="text-lg leading-none font-normal relative top-[1px]">&rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="relative z-10 w-full h-full max-w-lg mx-auto xl:mx-0 xl:ml-auto group py-10 xl:py-0 flex flex-col">
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl relative shadow-inner flex-1 flex flex-col">
                    <div className="bg-black/40 border-b border-white/5 py-3 px-4 flex items-center backdrop-blur-sm">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#b5b5b5]" />
                        <div className="w-3 h-3 rounded-full bg-[#8a8a8a]" />
                        <div className="w-3 h-3 rounded-full bg-[#d8d8d8]" />
                      </div>
                      <div className="type-label font-medium text-gray-500 flex-1 text-center pr-12 tracking-widest">CrossChainSwap.sol</div>
                    </div>
                    {/* Code syntax mostly uncolored, but comments specifically dimmed */}
                    <pre className="p-6 md:p-8 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-gray-300 overflow-x-auto bg-transparent font-mono">
                      <code>
                        {`import "IEntangle.sol";\n\n`}
                        <span className="text-gray-500">{`// 1. Define destination`}</span>
                        {`\nstring memory dstChain = "arbitrum";\nbytes memory dstAddr = abi.encode(user);\n\n`}
                        <span className="text-gray-500">{`// 2. Pack your payload`}</span>
                        {`\nbytes memory payload = abi.encode(\n  "SWAP",\n  tokenAddress,\n  amount\n);\n\n`}
                        <span className="text-gray-500">{`// 3. Send message!`}</span>
                        {`\nuint256 fees = entangle.getFee(\n  dstChain, payload.length\n);\n\nentangle.sendMessage{value: fees}(\n  dstChain,\n  dstAddr,\n  payload\n);`}
                      </code>
                    </pre>
                  </div>
                </div>

              </div>
            </motion.div>
          </section>
        )}



        <section id="chain-support" className="my-24 md:my-32 px-6 w-full max-w-[1100px] mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="flex flex-col items-center text-center w-full relative z-10 mb-10">
              <h2 className="type-title text-metallic-premium drop-shadow-2xl">Five Ecosystem. One relay layer.</h2>
            </div>

            <div className="border border-white/5 bg-black/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-inner relative z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5 border-b border-white/5">
                {chainSupport.slice(0, 4).map(([name, type], idx) => {
                  let extra = "";
                  if (name === 'Ethereum') extra = "border-t-[3px] border-t-white pt-6 !border-t-[#cccccc]";
                  else extra = "border-t-[3px] border-t-transparent pt-6";

                  return (
                    <div key={name} className={`flex flex-col items-center justify-center pb-6 bg-transparent hover:bg-white/5 transition-colors ${extra} relative group`}>
                      <div className="mb-4 h-12 flex items-center justify-center w-full">
                        {name === 'Ethereum' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)]">
                            <ChainIcons.ethereum className="w-[38px] h-[38px] text-white" />
                          </div>
                        )}
                        {name === 'Arbitrum' && (
                          <div className="flex flex-col justify-center items-center opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
                            <img
                              src="/chain-logos/arbitrum.svg"
                              alt="Arbitrum logo"
                              className="w-[44px] h-[44px] [filter:grayscale(1)_brightness(1.45)_contrast(1.1)]"
                            />
                          </div>
                        )}
                        {name === 'Optimism' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)]">
                            <ChainIcons.optimism className="w-[42px] h-[42px] text-white" />
                          </div>
                        )}
                        {name === 'Base' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]">
                            <ChainIcons.base className="w-[38px] h-[38px] text-white ring-1 ring-white/20 rounded-[8px]" />
                          </div>
                        )}
                      </div>
                      <div className="type-subtitle text-white mb-2">{name}</div>
                      <div className="type-label text-gray-500">{type}</div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5 border-b border-white/5">
                {chainSupport.slice(4, 8).map(([name, type], idx) => {
                  let extra = "";
                  if (name === 'Solana') extra = "border-t-[3px] border-t-white pt-6 !border-t-[#cccccc]";
                  else extra = "border-t-[3px] border-t-transparent pt-6";

                  return (
                    <div key={name} className={`flex flex-col items-center justify-center pb-6 bg-transparent hover:bg-white/5 transition-colors ${extra} relative group`}>
                      <div className="mb-4 h-12 flex items-center justify-center w-full">
                        {name === 'Solana' && (
                          <div
                            aria-label="Solana logo"
                            className="mt-1 w-[46px] h-[46px] bg-white opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)]"
                            style={{
                              WebkitMaskImage: "url('/chain-logos/solana.svg')",
                              maskImage: "url('/chain-logos/solana.svg')",
                              WebkitMaskRepeat: 'no-repeat',
                              maskRepeat: 'no-repeat',
                              WebkitMaskPosition: 'center',
                              maskPosition: 'center',
                              WebkitMaskSize: 'contain',
                              maskSize: 'contain',
                            }}
                          />
                        )}
                        {name === 'Sui' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)] mt-1">
                            <svg width="40" height="48" viewBox="0 0 64 64" fill="#ffffff">
                              <path d="M32 4c9 0 22 21 22 32 0 12.2-9.8 22-22 22S10 48.2 10 36C10 25 23 4 32 4z" />
                              <path d="M23 36c0 5 4 9 9 9 2.8 0 5.3-1.2 7-3.1" fill="none" stroke="#020205" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        {name === 'Cosmos' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] mt-1">
                            <img
                              src="/chain-logos/cosmos.svg"
                              alt="Cosmos logo"
                              className="w-[50px] h-[50px] [filter:grayscale(1)_brightness(1.8)_contrast(1.05)]"
                            />
                          </div>
                        )}
                        {name === 'Stellar' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mt-1">
                            <ChainIcons.stellar className="w-[44px] h-[44px] text-white" />
                          </div>
                        )}
                      </div>
                      <div className="type-subtitle text-white mb-2">{name}</div>
                      <div className="type-label text-gray-500">{type}</div>
                    </div>
                  );
                })}
              </div>

              {/* Banner at bottom */}
              <div className="p-4 bg-transparent flex items-center justify-start border-l-[4px] border-[#cccccc]">
                <div className="flex items-center gap-4 pl-2">
                  <span className="text-gray-300 text-xl">⏱️</span>
                  <div className="text-white type-body">
                    <span className="font-semibold">&lt; 10s Delivery on L2s.</span> <span className="text-gray-500 ml-2">Add a new chain with just one adapter class.</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        <section id="realtime-fees" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">



            <div className="flex flex-col items-center justify-center text-center w-full relative z-10 mb-12 pt-6">
              <h2 className="type-title text-metallic-premium drop-shadow-2xl text-center w-full">
                Incentives Aligned by Design
              </h2>
            </div>

            {/* Flow Diagram Container */}
            <div className="relative flex flex-col xl:flex-row items-center justify-center gap-[40px] xl:gap-[0px] w-full max-w-[950px] mx-auto z-10">

              {/* 1. Left Block: User / dApp */}
              <div className="w-full sm:w-[280px] xl:w-[260px] bg-black/20 backdrop-blur-md shadow-inner border border-[#444444] rounded-[10px] p-5 relative z-10 shrink-0">
                <div className="flex justify-between items-start mb-4 mt-1">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-2V9h2zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" /></svg>
                  <div className="flex gap-2 mt-0.5 items-center">
                    <svg className="w-[12px] h-[12px] text-white" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M15.925 23.969L15.823 24l-7.447-4.391 7.553 10.638 7.57-10.638-7.574 4.36zM15.986 0L8.358 12.67l7.625 4.542 7.643-4.542L15.986 0z" />
                    </svg>
                    <div className="w-[13px] h-[13px] rounded-full bg-[#cccccc]"></div>
                  </div>
                </div>
                <div className="type-subtitle text-white mb-1">User / dApp</div>
                <div className="text-[#666] type-body mb-4">Calls <span className="bg-[#0b1d26] text-[#cccccc] px-1.5 py-0.5 rounded text-[12px] border border-[#cccccc]/10 font-mono">sendMessage()</span></div>
                <div className="text-[#bbb] type-body font-semibold">Pays Native Gas Fee</div>

                {/* Outbound connection line */}
                <div className="hidden xl:block absolute right-[-40px] top-1/2 w-[40px] h-[1.5px] bg-[#777777] -translate-y-1/2 z-0"></div>
                {/* Arrow Head */}
                <div className="hidden xl:block absolute right-[-40px] top-1/2 w-[0] h-[0] border-t-[5px] border-b-[5px] border-l-[6px] border-transparent border-l-[#777777] transform -translate-y-1/2 z-10"></div>
              </div>

              {/* spacer */}
              <div className="hidden xl:block w-[40px] shrink-0"></div>

              {/* 2. Middle Block: ENTANGLE CORE */}
              <div className="w-[280px] bg-black/20 backdrop-blur-md shadow-inner border border-[#444444] rounded-[8px] p-5 relative z-10 shrink-0 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                <div className="absolute top-[-1px] left-0 right-0 h-[3px] bg-white rounded-t-[8px] opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>

                <div className="text-white type-label mb-4 mt-0.5">Entangle Core</div>

                <div className="space-y-4">
                  {/* Gas Oracle */}
                  <div className="bg-transparent hover:bg-white/5 transition-colors border border-white/5 rounded-[6px] p-3 flex gap-4 items-center">
                    <div className="bg-[#cccccc]/10 p-2.5 rounded-[4px] border border-[#cccccc]/20">
                      <svg className="w-[16px] h-[16px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9v11c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-2.21-1.79-4-4-4h-1V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13h8c0 1.66 1.34 3 3 3s3-1.34 3-3V9c0-.46.15-.88.4-1.22l3.37-3.37zM10 18H5V8h4.5c.28 0 .5.22.5.5v9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white type-body font-bold mb-0.5 leading-none">Gas Oracle</div>
                      <div className="text-[#666] text-[10px]">Median price every 2m</div>
                    </div>
                  </div>

                  {/* Circuit Breaker */}
                  <div className="bg-transparent hover:bg-white/5 transition-colors border border-white/5 rounded-[6px] p-3 flex gap-4 items-center">
                    <div className="bg-[#cccccc]/10 p-2.5 rounded-[4px] border border-[#cccccc]/20">
                      <svg className="w-[16px] h-[16px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white type-body font-bold mb-0.5 leading-none">Circuit Breaker</div>
                      <div className="text-[#666] text-[10px]">Staleness check &gt;50 blks</div>
                    </div>
                  </div>
                </div>

                {/* Outbound connection lines (Forking UP and DOWN from Center) */}
                {/* Top diagonal line */}
                <div className="hidden xl:block absolute right-[-62px] top-1/2 w-[62px] h-[1.5px] bg-[#777777] transform rotate-[35deg] origin-left z-0"></div>
                {/* Bottom diagonal line */}
                <div className="hidden xl:block absolute right-[-62px] top-1/2 w-[62px] h-[1.5px] bg-[#777777] transform rotate-[-35deg] origin-left z-0"></div>

                {/* Note: since elements origin from left, a positive rotation angles downwards. Negative angles upwards. We swapped them if needed, but rotate-[35deg] visually goes DOWN, rotate-[-35deg] goes UP relative to right-facing vectors. */}
              </div>

              {/* gap for the branching lines */}
              <div className="hidden xl:block w-[50px] shrink-0 relative z-0"></div>

              {/* 3. Right Blocks Column */}
              <div className="flex flex-col gap-4 xl:gap-4 shrink-0 w-full sm:w-[320px] xl:w-[300px]">

                {/* Top: 30% Protocol Treasury */}
                <div className="bg-black/20 backdrop-blur-md shadow-inner border border-[#444444] border-l-[3px] border-l-[#cccccc] rounded-[8px] p-5 shadow-[0_0_20px_rgba(204,204,204,0.06)] relative z-10 w-full overflow-hidden hover:bg-white/5 transition-colors">
                  <div className="absolute inset-0 border border-[#cccccc]/[0.05] rounded-[8px] pointer-events-none"></div>
                  <div className="text-[48px] font-bold text-[#cccccc] leading-none mb-1 mt-0.5 drop-shadow-[0_0_15px_rgba(204,204,204,0.3)]">30%</div>
                  <div className="text-white type-body xl:type-subtitle mb-2">Protocol Treasury</div>
                  <div className="text-[#888] text-[11px] leading-relaxed mb-4 w-[95%]">
                    Accumulates native assets (ETH, SOL, ATOM). Funds operations and growth.
                  </div>

                  <div className="inline-block bg-[#cccccc]/10 text-[#cccccc] text-[10px] px-2 py-1 rounded-[4px] font-bold">
                    On-chain
                  </div>
                </div>

                {/* Bottom: 70% Relay Reserve */}
                <div className="bg-black/20 backdrop-blur-md shadow-inner border border-[#444444] border-l-[3px] border-l-[#cccccc] rounded-[8px] p-5 shadow-[0_0_20px_rgba(204,204,204,0.06)] relative z-10 w-full overflow-hidden hover:bg-white/5 transition-colors">
                  <div className="absolute inset-0 border border-[#cccccc]/[0.05] rounded-[8px] pointer-events-none"></div>
                  <div className="text-[48px] font-bold text-[#cccccc] leading-none mb-1 mt-0.5 drop-shadow-[0_0_15px_rgba(204,204,204,0.3)]">70%</div>
                  <div className="text-white type-body xl:type-subtitle mb-2">Relay Reserve</div>
                  <div className="text-[#888] text-[11px] leading-relaxed mb-4 w-[95%]">
                    Direct rewards for Relay Miners who successfully execute transactions.
                  </div>

                  <div className="inline-block bg-[#cccccc]/10 text-[#cccccc] text-[10px] px-2 py-1 rounded-[4px] font-bold">
                    Miner Reward
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {false && (
          <section id="consensus" className="w-full relative z-10 my-24 md:my-32 px-6">
            <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden max-w-[1100px] mx-auto w-full">

              <div className="relative z-10 pt-4 md:pt-8">
                <div className="flex flex-col items-center text-center w-full relative z-10 mb-8">
                  <h2 className="type-title text-metallic-premium drop-shadow-2xl">
                    Threshold Signatures<br />
                    <span>No Single Validator</span>
                  </h2>
                </div>
              </div>

              <div className="relative z-10 mt-8 md:mt-10 grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-8 items-center">

                {/* Graphical representation of the consensus model */}
                <div className="relative flex flex-col items-center justify-center h-full">

                  {/* Properly Aligned Dashed Schematic Crosshairs */}
                  <div className="absolute top-[140px] left-[-50vw] w-[200vw] border-t border-dashed border-white/5 pointer-events-none z-0"></div>

                  <div className="relative w-[280px] h-[280px] z-10">

                    {/* Central Faint Blue Box */}
                    <div className="absolute inset-[35px] bg-[#0c1f26] flex items-center justify-center">

                      {/* Glowing Cyan Shield & Circle */}
                      <div className="w-[86px] h-[86px] rounded-full border-[1.5px] border-[#cccccc] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(204,204,204,0.2)]">
                        <svg className="w-[38px] h-[38px] text-[#cccccc]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>

                      {/* Faint corner lines pointing perfectly strictly to the 4 corners of the box */}
                      <div className="absolute -top-[16px] -left-[16px] w-[32px] h-[1px] bg-[#555] rotate-45"></div>
                      <div className="absolute -top-[16px] -right-[16px] w-[32px] h-[1px] bg-[#555] -rotate-45"></div>
                      <div className="absolute -bottom-[16px] -left-[16px] w-[32px] h-[1px] bg-[#555] -rotate-45"></div>
                      <div className="absolute -bottom-[16px] -right-[16px] w-[32px] h-[1px] bg-[#555] rotate-45"></div>
                    </div>

                    {/* V1 - Top center */}
                    <div className="absolute top-[0px] left-1/2 -translate-x-1/2 w-[34px] h-[34px] rounded-full border border-[#cccccc] bg-[#000] text-[#ccc] text-[10px] sm:text-[11px] flex items-center justify-center z-20 hover:bg-[#cccccc]/20 transition-colors">V1</div>

                    {/* V2 - Top right */}
                    <div className="absolute top-[60px] right-[-4px] w-[34px] h-[34px] rounded-full border border-[#cccccc] bg-[#000] text-[#ccc] text-[10px] sm:text-[11px] flex items-center justify-center z-20 hover:bg-[#cccccc]/20 transition-colors">V2</div>

                    {/* V3 - Bottom right */}
                    <div className="absolute bottom-[30px] right-[10px] w-[34px] h-[34px] rounded-full border border-[#cccccc] bg-[#000] text-[#ccc] text-[10px] sm:text-[11px] flex items-center justify-center z-20 hover:bg-[#cccccc]/20 transition-colors">V3</div>

                    {/* V4 - Bottom left */}
                    <div className="absolute bottom-[30px] left-[10px] w-[34px] h-[34px] rounded-full border border-[#cccccc] bg-[#000] text-[#ccc] text-[10px] sm:text-[11px] flex items-center justify-center z-20 hover:bg-[#cccccc]/20 transition-colors">V4</div>

                    {/* V5 - Top left */}
                    <div className="absolute top-[60px] left-[-4px] w-[34px] h-[34px] rounded-full border border-[#cccccc] bg-[#000] text-[#ccc] text-[10px] sm:text-[11px] flex items-center justify-center z-20 hover:bg-[#cccccc]/20 transition-colors">V5</div>
                  </div>

                  <div className="mt-8 text-center text-[#555] text-[10px]">
                    N-of-M Consensus Model
                  </div>
                </div>

                {/* Separated Highlighted Cards */}
                <div className="flex flex-col gap-4">

                  {/* Multi-Chain Signatures */}
                  <div className="border border-white/5 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner rounded-r-xl p-5 md:p-6 hover:bg-white/5 transition-colors">
                    <h3 className="type-subtitle text-white mb-3 md:mb-4">Multi-Chain Signatures</h3>
                    <div className="type-body">
                      <div className="mb-2">
                        <span className="text-white">EVM:</span> <span className="bg-[#0b1d26] text-[#cccccc] px-2 py-0.5 rounded type-body mx-1 border border-[#cccccc]/10">secp256k1</span> <span className="text-[#888]">/ ecrecover</span>
                      </div>
                      <div>
                        <span className="text-white inline-block mt-0.5">Non-EVM:</span> <span className="bg-[#0b1d26] text-[#cccccc] px-2 py-0.5 rounded type-body mx-1 border border-[#cccccc]/10">ed25519</span> <span className="text-[#888]">(Solana, Sui, Cosmos)</span>
                      </div>
                    </div>
                  </div>

                  {/* On-Chain Verification */}
                  <div className="border border-white/5 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner rounded-r-xl p-5 md:p-6 hover:bg-white/5 transition-colors">
                    <h3 className="type-subtitle text-white mb-3 md:mb-4">On-Chain Verification</h3>
                    <p className="text-[#888] type-body mb-4">Smart contracts enforce cryptographic proofs.</p>
                    <div className="bg-[#0b1d26] border border-[#cccccc]/10 text-[#cccccc] type-body px-3 py-1.5 inline-block rounded">
                      verifyMessage(msg_hash, sig_bundle)
                    </div>
                  </div>

                  {/* Trust Minimized */}
                  <div className="border border-white/5 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner rounded-r-xl p-5 md:p-6 hover:bg-white/5 transition-colors">
                    <h3 className="type-subtitle text-white mb-3 md:mb-4">Trust Minimized</h3>
                    <p className="text-[#888] type-body max-w-sm">
                      No single validator can authorize a delivery.<br />
                      Consensus threshold required for all ops.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </section>
        )}



        {false && (
          <section id="operators" className="w-full relative z-10 my-24 md:my-32 px-6">
            <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

              {/* Glowing cyan orb softly placed on left */}
              <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#cccccc]/[0.035] rounded-full blur-[90px] pointer-events-none"></div>

              <div className="p-8 md:p-12 lg:p-16 relative z-10 flex flex-col items-center text-center">
                <h2 className="type-title mb-6 text-metallic-premium drop-shadow-2xl">
                  Dual Incentive Mechanism:<br className="hidden md:block" />
                  Native Token Fees + Subnet Rewards
                </h2>

                <p className="type-body text-[#888] max-w-[650px] leading-[1.65] mb-12">
                  Participate in the Entangle Subnet on Bittensor. Earn continuous rewards<br className="hidden md:block" />
                  for securing cross-chain communication.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 bg-black/20 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-md max-w-[700px] w-full shadow-inner">
                  <button className="px-8 py-3.5 bg-white text-black font-bold type-body rounded-[4px] hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    Start Earning <span className="text-lg leading-none font-normal relative top-[1px]">&rarr;</span>
                  </button>

                  <a href="#" className="text-[#999] type-body underline underline-offset-[5px] decoration-[#444] hover:text-white hover:decoration-white transition-colors leading-none">
                    Read the Miner Documentation
                  </a>
                </div>
              </div>

            </div>
          </section>
        )}

        {false && (
          <section id="scanner-miner" className="w-full relative z-10 my-24 md:my-32 px-6">
            <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden max-w-[1100px] mx-auto w-full">



              <div className="flex flex-col items-center text-center w-full relative z-10 mb-8">
                <h2 className="type-title text-metallic-premium drop-shadow-2xl">
                  Scanner Miner
                </h2>
              </div>

              <div className="rounded-[1.5rem] bg-black/20 backdrop-blur-md shadow-inner border border-white/10 relative mx-auto w-full max-w-[900px] overflow-hidden mt-8 md:mt-10 hover:bg-black/30 transition-colors">
                {/* Cyan top bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#cccccc] shadow-[0_0_20px_rgba(204,204,204,0.4)]"></div>

                <div className="flex flex-col md:flex-row relative">
                  {/* Faint internal vertical divider for desktop */}
                  <div className="hidden md:block absolute left-[38%] top-[10%] bottom-[10%] w-[1px] bg-white/20"></div>

                  {/* Left Column Component */}
                  <div className="w-full md:w-[38%] pt-16 pb-14 px-8 flex flex-col items-center text-center">
                    <div className="w-[96px] h-[96px] rounded-full border-[1.5px] border-[#cccccc] bg-[#cccccc]/[0.05] flex items-center justify-center shadow-[0_0_30px_rgba(204,204,204,0.2)] mb-8">
                      <svg className="w-[40px] h-[40px] text-[#cccccc]" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M192 32c0-17.7 14.3-32 32-32C383.1 0 512 128.9 512 288c0 17.7-14.3 32-32 32s-32-14.3-32-32C448 164.3 347.7 64 224 64c-17.7 0-32-14.3-32-32zM60.6 220.6L164.7 324.7l28.4-28.4c-.7-2.6-1.1-5.4-1.1-8.3c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32c-2.9 0-5.6-.4-8.3-1.1l-28.4 28.4L291.4 451.4c14.5 14.5 11.8 38.8-7.3 46.3C260.5 506.9 234.9 512 208 512C93.1 512 0 418.9 0 304c0-26.9 5.1-52.5 14.4-76.1c7.5-19 31.8-21.8 46.3-7.3zM224 96c106 0 192 86 192 192c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-70.7-57.3-128-128-128c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                      </svg>
                    </div>

                    <div className="text-[72px] font-bold text-[#cccccc] leading-none mb-4">~30%</div>
                    <div className="type-label text-[#cccccc] mb-4">Subnet TAO Emissions</div>

                    <p className="text-[#666] type-body max-w-[200px]">
                      Rewards distributed per epoch based on discovery speed and accuracy.
                    </p>
                  </div>

                  {/* Right Column Component */}
                  <div className="w-full md:w-[62%] pt-16 pb-14 px-10 md:pr-14 md:pl-12">
                    <h3 className="type-subtitle text-white mb-3">Discovery Mechanism</h3>
                    <p className="text-[#a1a1a1] type-body mb-10 w-[95%]">
                      The Scanner Miner constantly monitor connected blockchains for activity.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        <div className="text-[#a1a1a1] type-body">
                          <span className="text-white font-medium">Real-time Polling:</span> Queries RPC nodes every block to detect <span className="text-[12px] bg-[#1a1a1a]/80 text-[#ccc] px-1.5 py-0.5 rounded">MessageDispatched</span> events.
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 4c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v2.59c0 .27-.11.52-.29.71L15 13.41V20c0 .35-.2.66-.51.84l-4 2.33A.996.996 0 019 22v-8.59L3.29 7.3A1 1 0 013 6.59V4z" />
                        </svg>
                        <div className="text-[#a1a1a1] type-body">
                          <span className="text-white font-medium">Event Filtering:</span> Validates payload structure and ensures correct source contract emission.
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <div className="text-[#a1a1a1] type-body">
                          <span className="text-white font-medium">Validator Feed:</span> Propagates verified events to the Validator set for consensus.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Panel */}
                <div className="border-t border-white/5 bg-transparent hover:bg-white/5 transition-colors px-10 py-5 flex items-center w-full">
                  <svg className="w-[16px] h-[16px] text-[#cccccc] mr-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span className="text-[#cccccc] type-label mt-[1px]">Required Stake: 100 TAO to register UID</span>
                </div>
              </div>

            </div>
          </section>
        )}

        {false && (
          <section id="relay-miner" className="w-full relative z-10 my-24 md:my-32 px-6">
            <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden max-w-[1100px] mx-auto w-full">




              <div className="flex flex-col items-center text-center w-full relative z-10 mb-8">
                <h2 className="type-title text-metallic-premium drop-shadow-2xl">
                  Relay Miner
                </h2>
              </div>

              <div className="rounded-[1.5rem] bg-black/20 backdrop-blur-md shadow-inner border border-white/10 relative mx-auto w-full max-w-[900px] overflow-hidden mt-8 md:mt-10 hover:bg-black/30 transition-colors">
                {/* Neutral top bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#cccccc] shadow-[0_0_20px_rgba(204,204,204,0.4)]"></div>

                <div className="flex flex-col md:flex-row relative">
                  {/* Faint internal vertical divider for desktop */}
                  <div className="hidden md:block absolute left-[38%] top-[10%] bottom-[10%] w-[1px] bg-white/20"></div>

                  {/* Left Column Component */}
                  <div className="w-full md:w-[38%] pt-16 pb-14 px-8 flex flex-col items-center text-center">
                    <div className="w-[96px] h-[96px] rounded-full border-[1.5px] border-[#cccccc] bg-[#cccccc]/[0.05] flex items-center justify-center shadow-[0_0_30px_rgba(204,204,204,0.2)] mb-8">
                      <svg className="w-[38px] h-[38px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </div>

                    <div className="text-[72px] font-bold text-[#cccccc] leading-none mb-4">~70%</div>
                    <div className="type-label text-[#cccccc] mb-4">Subnet TAO Emissions</div>

                    <p className="text-[#666] type-body max-w-[200px]">
                      Rewards earned by winning auctions and successfully executing deliveries.
                    </p>
                  </div>

                  {/* Right Column Component */}
                  <div className="w-full md:w-[62%] pt-16 pb-14 px-10 md:pr-14 md:pl-12">
                    <h3 className="type-subtitle text-white mb-3">Execution Mechanism</h3>
                    <p className="text-[#a1a1a1] type-body mb-10 w-[95%]">
                      Relay Miners actively compete to physically deliver messages across chains with speed and security.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 6l4 4L7 21l-4-4L14 6z" />
                          <path d="M18 2l4 4-3 3-4-4 3-3z" />
                        </svg>
                        <div className="text-[#a1a1a1] type-body">
                          <span className="text-white font-medium">Sealed Auctions:</span> Bids latency & gas in 2s windows. Fastest + cheapest wins.
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <svg className="w-[16px] h-[16px] text-[#cccccc] mt-0.5 shrink-0 -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 8h-3V4H3v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM8 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17.5 9.5l1.96 2.5H17.5v-2.5z" />
                        </svg>
                        <div className="text-[#a1a1a1] type-body">
                          <span className="text-white font-medium">Cross-Chain Delivery:</span> Executes transaction on destination contract immediately.
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0 px-[1px]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 2v20l3-3 3 3 3-3 3 3 3-3 3 3V2H3zm14 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z" />
                        </svg>
                        <div className="text-[#a1a1a1] type-body">
                          <span className="text-white font-medium">Proof Submission:</span> Returns delivery proof on-chain to unlock fees & TAO.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Panel */}
                <div className="border-t border-white/5 bg-transparent hover:bg-white/5 transition-colors px-10 py-5 flex items-center w-full">
                  <svg className="w-[16px] h-[16px] text-[#cccccc] mr-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span className="text-[#cccccc] type-label mt-[1px]">Verified Delivery: &lt; 10s Latency</span>
                </div>
              </div>

            </div>
          </section>
        )}




        {false && (
          <section id="the-auction" className="w-full relative z-10 my-24 md:my-32 px-6">
            <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">



              <div className="flex flex-col items-center text-center w-full relative z-10 mb-20 pt-10">
                <div className="type-label text-[#cccccc] mb-5">The Auction</div>
                <h2 className="type-title mb-5 text-metallic-premium drop-shadow-2xl">
                  Sealed-Bid Velocity
                </h2>
                <p className="type-body text-[#888]">
                  Fastest & cheapest miner wins execution rights.
                </p>
              </div>

              {/* Diagram container */}
              <div className="relative flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-[60px] xl:gap-[80px] w-full mt-16 max-w-[900px] mx-auto">

                {/* 1. RELAY MINERS column */}
                <div className="flex flex-col relative w-full sm:w-[240px] xl:w-[200px] shrink-0 xl:justify-center">
                  <div className="text-[#7a7a7a] text-[12px] text-center xl:text-left mb-3">Relay Miners</div>

                  <div className="relative w-full flex flex-col gap-4">
                    {/* Desktop connection lines drawn behind the items */}
                    <div className="hidden xl:block absolute left-[100%] top-[30px] w-[30px] bottom-[30px] border-t-[1.5px] border-b-[1.5px] border-l-0 border-r-[1.5px] border-[#777777] rounded-r-[6px] z-0"></div>
                    <div className="hidden xl:block absolute left-[100%] ml-[30px] top-1/2 -translate-y-1/2 w-[50px] h-[1.5px] bg-[#777777] z-0"></div>
                    {/* Arrow head */}
                    <div className="hidden xl:block absolute left-[100%] ml-[74px] top-1/2 -translate-y-1/2 w-[0] h-[0] border-t-[5px] border-b-[5px] border-l-[6px] border-transparent border-l-[#777777] z-10"></div>

                    {[
                      { id: 'A' },
                      { id: 'B' },
                      { id: 'C' }
                    ].map((miner) => (
                      <div key={miner.id} className="w-full bg-black/20 backdrop-blur-md border border-[#444444] rounded-[8px] p-4 py-4 flex items-center gap-4 relative z-10 shadow-inner hover:bg-white/5 transition-colors">
                        <svg className="w-[18px] h-[18px] text-[#666] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 6h16v4H4zm2 1h2v2H6z" />
                          <path d="M4 14h16v4H4zm2 1h2v2H6z" />
                        </svg>
                        <div>
                          <div className="text-white text-[18px] font-bold leading-tight">Miner {miner.id}</div>
                          <div className="text-[#8a8a8a] text-[14px] mt-2 whitespace-nowrap flex items-center">
                            Sealed Bid
                            <svg className="w-[12px] h-[12px] ml-1.5 text-[#666] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. SCORING FORMULA container */}
                <div className="relative bg-black/20 backdrop-blur-md border border-[#444444] rounded-[12px] py-[50px] px-8 md:py-[60px] md:px-10 w-full max-w-[440px] xl:w-[440px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-inner z-10 shrink-0">

                  {/* Top Floating Badge */}
                  <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-[#050505] border-[1.5px] border-[#777777] rounded-[30px] px-5 py-1.5 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(204,204,204,0.15)] shadow-inner whitespace-nowrap z-20">
                    <svg className="w-3.5 h-3.5 text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0012 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                    </svg>
                    <span className="text-[#cccccc] font-bold text-[11px] mt-[1px]">2s Window</span>
                  </div>

                  <div className="absolute top-[26px] left-1/2 -translate-x-1/2 text-center text-[#444] type-label tracking-[0.1em] whitespace-nowrap">Scoring Formula</div>

                  <div className="flex justify-between items-center gap-4 w-full">
                    <div className="text-[20px] font-bold leading-[2.2]">
                      <div className="text-[#888] mb-1 text-[22px] font-semibold">Score = </div>
                      <div className="flex items-center">
                        <span className="inline-block w-[16px] shrink-0 mr-[4px]"></span>
                        <span className="text-[#cccccc]">0.40</span> <span className="text-[#444] mx-[3px] text-[14px]">×</span> <span className="text-white">Latency</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#555] inline-block w-[16px] shrink-0 mr-[4px]">+</span>
                        <span className="text-[#cccccc]">0.40</span> <span className="text-[#444] mx-[3px] text-[14px]">×</span> <span className="text-white">Gas Cost</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#555] inline-block w-[16px] shrink-0 mr-[4px]">+</span>
                        <span className="text-white">0.20</span> <span className="text-[#444] mx-[3px] text-[14px]">×</span> <span className="text-white">Accuracy</span>
                      </div>
                    </div>

                    <div className="w-[70px] h-[70px] shrink-0 relative">
                      <svg className="w-[70px] h-[70px] transform -rotate-90" viewBox="0 0 36 36">
                        {/* Background Accuracy 20% (gray ring part) */}
                        <path
                          className="text-[#2a2a2a]"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Neutral 40% (bottom part) */}
                        <path
                          className="text-[#cccccc]"
                          strokeWidth="3.5"
                          strokeDasharray="40 100"
                          strokeDashoffset="-40"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Cyan 40% (top right part) */}
                        <path
                          className="text-[#cccccc]"
                          strokeWidth="3.5"
                          strokeDasharray="40 100"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Arrow pointing to Winner Executes */}
                  <div className="hidden xl:block absolute left-[100%] top-1/2 -translate-y-1/2 w-[80px] h-[1.5px] bg-[#777777] z-0"></div>
                  <div className="hidden xl:block absolute left-[100%] ml-[74px] top-1/2 -translate-y-1/2 w-[0] h-[0] border-t-[5px] border-b-[5px] border-l-[6px] border-transparent border-l-[#777777]"></div>
                </div>

                {/* 3. WINNER EXECUTES */}
                <div className="w-full sm:w-[240px] xl:w-[150px] bg-black/20 backdrop-blur-md border-[1.5px] border-[#444444] rounded-[8px] p-6 lg:p-7 flex flex-col items-center justify-center gap-4 relative z-10 shadow-[0_0_25px_rgba(204,204,204,0.15)] shadow-inner shrink-0 xl:self-center">
                  <svg className="w-[30px] h-[30px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 5h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H5a1 1 0 0 0-1 1v2.22A4.78 4.78 0 0 0 8.78 13h.14a4.98 4.98 0 0 0 2.08 3h-2a1 1 0 0 0-1 1v2h-2v2h12v-2h-2v-2a1 1 0 0 0-1-1h-2a4.98 4.98 0 0 0 2.08-3h.14A4.78 4.78 0 0 0 19 8.22V6a1 1 0 0 0-1-1zM6 8.22V7h1v4.61A2.78 2.78 0 0 1 6 8.22zM17 7v1.22A2.78 2.78 0 0 1 14.39 12H18V7z" />
                  </svg>
                  <div className="text-white type-label text-center leading-tight">
                    Winner<br />Executes
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {false && (
          <section id="scoring" className="w-full relative z-10 my-24 md:my-32 px-6">
            <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">



              <div className="relative z-10 mb-8 pt-5 flex flex-col items-center text-center w-full gap-4 pb-4">
                <h2 className="type-title text-metallic-premium drop-shadow-2xl">
                  5-Dimension Scoring
                </h2>
                <p className="type-body text-[#888] max-w-[500px]">
                  Quality drives rewards. Miners are scored on every delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 relative z-10 w-full max-w-[1020px] mx-auto">

                {/* 1. Latency (25%) */}
                <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D1</div>
                  <div className="text-white type-subtitle mb-1 drop-shadow-md">Latency</div>
                  <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">25%</div>
                  <div className="type-body text-gray-300 drop-shadow-md">
                    Time from source dispatch to destination delivery measured in ms.
                  </div>
                </div>

                {/* 2. Confirmation (25%) */}
                <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D2</div>
                  <div className="text-white type-subtitle mb-1 drop-shadow-md">Confirmation</div>
                  <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">25%</div>
                  <div className="type-body text-gray-300 drop-shadow-md">
                    Delivery within promised deadline.<br />Missed deadlines = zero score.
                  </div>
                </div>

                {/* 3. Gas Efficiency (20%) */}
                <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
                  <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D3</div>
                  <div className="text-white type-subtitle mb-1 drop-shadow-md">Gas Efficiency</div>
                  <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">20%</div>
                  <div className="type-body text-gray-300 relative z-10 drop-shadow-md">
                    Optimizing on-chain costs vs. oracle estimates.
                  </div>
                </div>

                {/* 4. Integrity (15%) */}
                <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
                  <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D4</div>
                  <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-1 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">15%</div>
                  <div className="text-white type-subtitle mb-3 drop-shadow-md">Integrity</div>
                  <div className="type-body text-gray-300 relative z-10 drop-shadow-md">
                    Payload hash matching source event exactly.
                  </div>
                </div>

                {/* 5. Reliability (15%) */}
                <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D5</div>
                  <div className="text-white type-subtitle mb-1 drop-shadow-md">Reliability</div>
                  <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">15%</div>
                  <div className="type-body text-gray-300 drop-shadow-md">
                    Historical uptime and successful delivery rate.
                  </div>
                </div>

                {/* 6. Blended Score Box */}
                <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  <div className="text-white type-subtitle mb-1 drop-shadow-md">Blended Score</div>
                  <div className="type-label text-gray-400 mb-3">Final Formula</div>
                  <div className="text-[16px] leading-[1.6] font-mono whitespace-nowrap drop-shadow-md">
                    <div className="text-white mb-1">Score =</div>
                    <div>
                      <span className="text-[#cccccc]">0.70</span> <span className="text-[#666]">×</span> <span className="text-white">Exec</span> <span className="text-[#666]"> +</span>
                    </div>
                    <div>
                      <span className="text-[#cccccc]">0.30</span> <span className="text-[#666]">×</span> <span className="text-white">Bid</span>
                    </div>
                  </div>
                </div>

              </div>



            </div>
          </section>
        )}




        <section id="actions" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">


            <div className="flex flex-col items-center text-center w-full relative z-10 mb-8 pt-4">
              <h2 className="type-title mb-2 text-metallic-premium drop-shadow-2xl">
                Infrastructure for a Multi-chain World
              </h2>
            </div>

            {/* 3 Columns architecture grid */}
            <div className="relative z-10 w-full max-w-[1020px] mx-auto flex flex-col lg:flex-row border-x border-b border-white/5 rounded-b-[4px] bg-black/20 backdrop-blur-md shadow-inner">

              {/* Verticle Dividers are now applied as right-borders on the first two cards */}

              {/* 1. Developers */}
              <div className="flex-1 border-t-[3px] border-[#cccccc] p-8 lg:p-10 flex flex-col relative z-10 border-b border-white/5 lg:border-b-0 lg:border-r hover:bg-white/5 transition-colors">
                <div className="w-[50px] h-[50px] rounded-full bg-[#cccccc]/10 flex items-center justify-center mb-8">
                  <svg className="w-5 h-5 text-[#cccccc]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <div className="text-white text-[28px] font-bold mb-4">Developers</div>
                <div className="type-body text-[#888] leading-[1.7] mb-8 flex-grow">
                  Integrate omnichain messaging in minutes. One SDK for EVM, Solana, and Cosmos.
                </div>

                <div className="text-[11px] text-[#777] leading-[1.8] mb-8">
                  <div><span className="text-[#cccccc]">&gt;</span> npm install @entangle/sdk</div>
                  <div><span className="text-[#cccccc]">&gt;</span> import {'{'} Entangle {'}'}</div>
                </div>

                <a href="https://entangle-protocol-docs.vercel.app/" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <button className="w-full bg-white hover:bg-gray-200 text-black font-bold type-label py-4 px-4 rounded-[4px] transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Read the Docs
                  </button>
                </a>

                <div className="text-[#888] type-label hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                  View GitHub
                </div>
              </div>

              {/* 2. Operators */}
              <div className="flex-1 bg-transparent border-t-[3px] border-[#cccccc] p-8 lg:p-10 flex flex-col relative z-10 border-b border-white/5 lg:border-b-0 lg:border-r hover:bg-white/5 transition-colors">
                <div className="w-[50px] h-[50px] rounded-full bg-[#cccccc]/10 flex items-center justify-center mb-8">
                  <svg className="w-5 h-5 text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v4H4zm0 8h16v4H4zm2-6h2v2H6zm0 8h2v2H6z" /></svg>
                </div>
                <div className="text-white text-[28px] font-bold mb-4">Operators</div>
                <div className="type-body text-[#888] leading-[1.7] mb-8 flex-grow">
                  Secure the network and earn dual rewards. Run Validators, Scanners, or Relay Miners.
                </div>

                <div className="text-[11px] text-[#777] leading-[1.8] mb-8">
                  <div><span className="text-[#cccccc]">$</span> 70% Relay Rewards</div>
                  <div><span className="text-[#cccccc]">$</span> 30% Scanner Rewards</div>
                </div>

                <button className="w-full bg-white hover:bg-gray-200 text-black font-bold type-label py-4 px-4 rounded-[4px] transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Run a Node
                </button>

                <div className="text-[#888] type-label hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9h4v12H5zm7-5h4v17h-4zm7 8h4v9h-4z" /></svg>
                  Subnet Stats
                </div>
              </div>

              {/* 3. Community */}
              <div className="flex-1 border-t-[3px] border-[#ffffff] p-8 lg:p-10 flex flex-col relative z-10 border-b lg:border-b-0 border-white/5 hover:bg-white/5 transition-colors">
                <div className="w-[50px] h-[50px] rounded-full bg-[#222] flex items-center justify-center mb-8">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                </div>
                <div className="text-white text-[28px] font-bold mb-4">Community</div>
                <div className="type-body text-[#888] leading-[1.7] mb-8 flex-grow">
                  Join the conversation. Governance proposals, ecosystem updates, and support.
                </div>

                <div className="text-[11px] text-[#777] leading-[1.8] mb-8">
                  <div><span className="text-white">#</span> announcements</div>
                  <div><span className="text-white">#</span> governance</div>
                </div>

                <a href="https://discord.gg/CMWKzW8y" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <button className="w-full bg-white hover:bg-gray-200 text-black font-bold type-label py-4 px-4 rounded-[4px] transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Join Discord
                  </button>
                </a>

                <a href="https://x.com/webuildentangle" target="_blank" rel="noopener noreferrer" className="text-[#888] type-label hover:text-white cursor-pointer transition-colors flex items-center justify-center text-center">
                  Follow Us
                </a>
              </div>

            </div>
          </div>
        </section>

        {false && (
          <section id="roadmap" className="w-full relative z-10 my-24 md:my-32 px-6">
            <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

              <div className="flex flex-col items-center text-center w-full max-w-[1020px] mx-auto mb-4 relative z-10">
                <h2 className="type-title mb-8 text-metallic-premium drop-shadow-2xl">
                  Roadmap To Scale
                </h2>

                {/* Timeline Header Area */}
                <div className="hidden lg:grid grid-cols-3 gap-8 w-full mb-[0px] h-[45px] relative">
                  {/* Full-width horizontal line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#cccccc] opacity-70 z-0"></div>

                  {/* Node 1 */}
                  <div className="relative h-full">
                    {/* Vertical line centered */}
                    <div className="absolute top-0 left-1/2 -translate-x-[0.75px] w-[1.5px] h-full bg-[#cccccc] opacity-70"></div>
                    {/* Circle centered */}
                    <div className="absolute top-[-7px] left-1/2 -translate-x-1/2 w-[16px] h-[16px] rounded-full border-[3px] border-[#cccccc] bg-black/80 backdrop-blur-md z-10 transition-transform hover:scale-110"></div>
                  </div>

                  {/* Node 2 */}
                  <div className="relative h-full">
                    {/* Vertical line centered */}
                    <div className="absolute top-0 left-1/2 -translate-x-[0.75px] w-[1.5px] h-full bg-[#cccccc] opacity-70"></div>
                    {/* Circle centered */}
                    <div className="absolute top-[-7px] left-1/2 -translate-x-1/2 w-[16px] h-[16px] rounded-full border-[3px] border-[#cccccc] bg-black/80 backdrop-blur-md z-10 transition-transform hover:scale-110"></div>
                  </div>

                  {/* Node 3 */}
                  <div className="relative h-full">
                    {/* Vertical line centered */}
                    <div className="absolute top-0 left-1/2 -translate-x-[0.75px] w-[1.5px] h-full bg-[#ffffff] opacity-70"></div>
                    {/* Circle centered */}
                    <div className="absolute top-[-7px] left-1/2 -translate-x-1/2 w-[16px] h-[16px] rounded-full border-[3px] border-[#ffffff] bg-black/80 backdrop-blur-md z-10 transition-transform hover:scale-110"></div>
                  </div>

                </div>

                {/* Grid Content Area for Phases */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Phase 1 */}
                  <div className="relative border-t-[1.5px] border-[#cccccc] bg-gradient-to-br from-[#cccccc]/[0.05] to-transparent bg-black/20 backdrop-blur-md shadow-inner border-x border-b border-x-white/5 border-b-white/5 hover:bg-white/[0.02] transition-colors p-6 md:p-8 rounded-b-[8px]">
                    <div className="text-white type-subtitle mb-6">{roadmap[0].phase}</div>

                    <div className="inline-flex items-center gap-2 border border-[#cccccc]/30 bg-[#cccccc]/10 rounded-[4px] px-3 py-1.5 mb-8 text-[#cccccc] type-label">
                      <div className="w-2 h-2 rounded-full bg-[#cccccc]"></div>
                      {roadmap[0].status}
                    </div>

                    <div className="space-y-6">
                      {roadmap[0].items.map((item, i) => {
                        const [title, desc] = item.split(' - ');
                        return (
                          <div key={i} className="flex gap-4 items-start">
                            <svg className="w-[16px] h-[16px] text-[#cccccc] shrink-0 mt-[2px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <div>
                              <div className="text-[#dedede] type-body font-semibold mb-1">{title}</div>
                              <div className="text-[#666] text-[12px] leading-relaxed">{desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative border-t-[1.5px] border-[#cccccc] bg-gradient-to-br from-[#cccccc]/[0.05] to-transparent bg-black/20 backdrop-blur-md shadow-inner border-x border-b border-x-white/5 border-b-white/5 hover:bg-white/[0.02] transition-colors p-6 md:p-8 rounded-b-[8px]">
                    <div className="text-white type-subtitle mb-6">{roadmap[1].phase}</div>

                    <div className="inline-flex items-center gap-2 border border-[#cccccc]/30 bg-[#cccccc]/10 rounded-[4px] px-3 py-1.5 mb-8 text-[#cccccc] type-label">
                      <svg className="w-3 h-3 text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
                      {roadmap[1].status}
                    </div>

                    <div className="space-y-6">
                      {roadmap[1].items.map((item, i) => {
                        const [title, desc] = item.split(' - ');
                        return (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-[16px] h-[16px] rounded-full bg-[#cccccc] flex items-center justify-center shrink-0 mt-[2px]">
                              <svg className="w-[10px] h-[10px] text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <div>
                              <div className="text-[#dedede] type-body font-semibold mb-1">{title}</div>
                              <div className="text-[#666] text-[12px] leading-relaxed">{desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Phase 3+ */}
                  <div className="relative border-t-[1.5px] border-[#ffffff] bg-gradient-to-br from-[#ffffff]/[0.05] to-transparent bg-black/20 backdrop-blur-md shadow-inner border-x border-b border-x-white/5 border-b-white/5 hover:bg-white/[0.02] transition-colors p-6 md:p-8 rounded-b-[8px]">
                    <div className="text-white type-subtitle mb-6">{roadmap[2].phase}</div>

                    <div className="inline-flex items-center gap-2 border border-[#ffffff]/30 bg-[#ffffff]/10 rounded-[4px] px-3 py-1.5 mb-8 text-[#ffffff] type-label">
                      <div className="w-2 h-2 rounded-full border-2 border-white bg-transparent"></div>
                      {roadmap[2].status}
                    </div>

                    <div className="space-y-6">
                      {roadmap[2].items.map((item, i) => {
                        const [title, desc] = item.split(' - ');
                        return (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-[14px] h-[14px] rounded-full border-[2px] border-white bg-transparent shrink-0 mt-[3px]"></div>
                            <div>
                              <div className="text-[#dedede] type-body font-semibold mb-1">{title}</div>
                              <div className="text-[#666] text-[12px] leading-relaxed">{desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                <div className="border-t border-[#1a1a1a] mt-6 pt-4 flex justify-end gap-5 text-white">
                  <svg className="w-5 h-5 hover:text-gray-400 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .08 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" /></svg>
                  <svg className="w-5 h-5 hover:text-gray-400 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
                  <svg className="w-5 h-5 hover:text-gray-400 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.946 2.4189-2.1568 2.4189z" /></svg>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER CTA */}
        <section className="pt-24 pb-16 flex flex-col items-center text-center px-4 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-10 bg-black/60 backdrop-blur-md shadow-2xl">
            <Image src={logoImg} alt="Entangle Protocol" width={40} height={40} className="object-contain brightness-150 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          </div>
          <h2 className="type-title mb-8 text-metallic-premium drop-shadow-2xl">Join The Network</h2>

          <p className="type-subtitle text-gray-100 font-medium mb-12 max-w-2xl leading-relaxed text-shadow-strong">
            The infrastructure layer cross-chain<br />commerce has been waiting for.
          </p>
          <div className="flex gap-4 mb-24">
            <a href="https://discord.gg/CMWKzW8y" target="_blank" rel="noopener noreferrer">
              <button className="px-10 py-4 bg-white text-black font-bold text-base rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 duration-200">Discord</button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-10 type-body text-gray-300 font-semibold w-full border-t border-white/20 pt-12 max-w-5xl drop-shadow-sm">
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">Mine</span>
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">Validate</span>
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">Build</span>
            <span className="hover:text-white cursor-pointer transition-colors shadow-sm">GitHub</span>
            <a href="https://x.com/webuildentangle" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors shadow-sm">Twitter / X</a>
          </div>
        </section>
      </div>
    </main>
  );
}
