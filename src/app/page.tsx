'use client';

import { Scene } from '@/components/canvas/Scene';
import Image from 'next/image';
import logoImg from '@/app/asset/logo.png';
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
  ['SEND', 'dApp calls sendMessage()'],
  ['EMIT', 'Event Dispatched on-chain'],
  ['SCAN', 'Miner detects event'],
  ['CHECK', 'Validator verifies'],
  ['ATTEST', 'Validators Threshold signatures'],
  ['AUCTION', '2s sealed bid window'],
  ['DELIVER', 'Winner executes tx'],
  ['SCORE', 'Proof verified & recorded'],
] as const;

const deliveryBenchmarks = [
  ['5 - 12s', 'SOLANA & HIGH PERF', '(SUI/STELLAR)'],
  ['8 - 25s', 'EVM L2S (ARB, BASE)', ''],
  ['60s+', 'ETHEREUM L1 (FINALITY)', ''],
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
  ['SUI', 'MOVE'],
  ['Cosmos', 'IBC'],
  ['Stellar', 'SOROBAN'],
] as const;

const securityItems = [
  ['Multi-Chain Signatures', 'EVM: secp256k1 / ecrecover. Non-EVM: ed25519 (Solana, SUI, Cosmos).'],
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
    phase: 'PHASE 1',
    status: 'ACTIVE NOW',
    items: [
      'Testnets Deployed - Sepolia, Arb Sepolia, Solana Devnet',
      'Multisig Governance - Deployed across 5 ecosystems',
      'Security Audits - Smart contracts in final review',
      'Monitoring Stack - Alerting & dashboards live',
    ],
  },
  {
    phase: 'PHASE 2',
    status: 'UP NEXT',
    items: [
      'Mainnet Launch - ETH, Arb, Solana, SUI, Cosmos',
      'End Bootstrap Mode - Competitive scoring begins',
      'Real Integrations - First dApps go live',
      'Full Economics - Relay reserve funded by fees',
    ],
  },
  {
    phase: 'PHASE 3+',
    status: 'FUTURE',
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
      <span className="text-gray-200 uppercase font-medium text-[13px] mb-5 block text-shadow-strong">{eyebrow}</span>
      <h2 className={`text-4xl md:text-5xl md: md: font-semibold ${description ? 'mb-6' : 'mb-0'} text-metallic-premium drop-shadow-xl leading-[1.15]`}>{title}</h2>
      {description ? (
        <p className="text-lg md:text-xl text-gray-100 font-normal leading-relaxed text-shadow-strong">{description}</p>
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

      <header className="fixed top-0 inset-x-0 mx-auto z-50 flex items-center justify-between py-4 px-6 md:px-12 pointer-events-auto bg-[#020205]/40 backdrop-blur-md border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={logoImg}
            alt="Entangle Protocol Logo"
            width={36}
            height={36}
            className="object-contain drop-shadow-[0_0_8px_rgba(204,204,204,0.4)]"
            priority
          />
          <span className="font-light text-lg lowercase text-gray-200">entangle protocol</span>
        </div>

        <button
          onClick={() => scrollTo('actions')}
          className="px-6 py-2 text-sm font-medium text-white transition-all bg-white/10 border rounded-full shadow-xl border-white/20 hover:bg-white/20 backdrop-blur-sm"
        >
          Launch App
        </button>
      </header>

      <div className="relative z-10 w-full flex flex-col pb-0">
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
          <motion.div initial="hidden" animate="visible" variants={heroVariant} className="flex flex-col items-center w-full max-w-6xl relative z-10">
            <div className="relative">
              <h1 className="text-5xl md:text-[5.35rem] lg:text-[5.95rem] font-medium mb-8 leading-[0.9] text-metallic-premium drop-shadow-2xl max-w-[1400px]">
                <span className="block">AI-POWERED</span>
                <span className="block whitespace-nowrap text-[0.92em] md:text-[0.88em]">CROSS-CHAIN MESSAGING.</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                onClick={() => scrollTo('developers')}
                className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Start Building
              </button>
              <button
                onClick={() => scrollTo('operators')}
                className="px-8 py-3.5 bg-black/40 backdrop-blur-md border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm shadow-xl"
              >
                Start Earning
              </button>
            </div>
          </motion.div>
        </section>

        <section className="my-24 md:my-32 px-6 md:px-12 max-w-5xl mx-auto w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="grid w-full gap-5 md:grid-cols-2">
            <div className="rounded-[2.5rem] border border-white/10 bg-black/20 px-8 py-10 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors">
              <div className="text-5xl md:text-6xl font-semibold text-white mb-4">$3.7T</div>
              <div className="text-xl text-white mb-2">Blockchains don&apos;t talk.</div>
              <div className="text-sm uppercase text-gray-400 leading-relaxed">Trapped in isolated ecosystems.</div>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-black/20 px-8 py-10 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors">
              <div className="text-5xl md:text-6xl font-semibold text-white mb-4">$2.7B</div>
              <div className="text-xl text-white mb-2">Stolen from bridges.</div>
              <div className="text-sm uppercase text-gray-400 leading-relaxed">(2021-2023). Users chain-jailed. Adoption stalls.</div>
            </div>
          </motion.div>
        </section>

        <section className="my-24 md:my-32 py-10 px-6 md:px-8 max-w-7xl mx-auto w-full surface-glass-strong rounded-[2rem] shadow-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
            <div>
              <SectionHeader
                eyebrow="Introducing"
                title={
                  <>
                    <span className="text-white">
                      AI-OPTIMIZED
                      <br />
                      RELAY NETWORK
                      <br />
                      CONNECTING
                    </span>
                    <br />
                    <span className="text-gray-400">EVERY CHAIN.</span>
                  </>
                }

              />
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-md shadow-inner p-6 hover:bg-white/5 transition-colors">
                <div className="text-[11px] uppercase text-gray-400 mb-3">01</div>
                <div className="text-xl font-semibold text-white mb-2">One protocol.</div>
                <p className="text-sm text-gray-200 leading-relaxed">A single relay layer for cross-chain communication instead of chain-by-chain bridge deployments.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-md shadow-inner p-6 hover:bg-white/5 transition-colors">
                <div className="text-[11px] uppercase text-gray-400 mb-3">02</div>
                <div className="text-xl font-semibold text-white mb-2">Any chain.</div>
                <p className="text-sm text-gray-200 leading-relaxed">EVM, Solana, Cosmos, Stellar, and future adapters all map into the same integration surface.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-md shadow-inner p-6 hover:bg-white/5 transition-colors">
                <div className="text-[11px] uppercase text-gray-400 mb-3">03</div>
                <div className="text-xl font-semibold text-white mb-2">No centralized choke points.</div>
                <p className="text-sm text-gray-200 leading-relaxed">Threshold signatures, validator consensus, and open miner auctions replace trusted bridge operators.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="protocol" className="my-24 md:my-32 py-10 px-6 max-w-[1100px] mx-auto w-full surface-glass-extreme rounded-[2rem] shadow-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <div className="mb-8 px-4 w-full relative z-10">
              <div className="inline-block relative z-10">
                <h2 className="text-4xl md:text-5xl md: font-semibold mb-4 text-metallic-premium drop-shadow-2xl">HOW IT FLOWS</h2>
                <p className="text-gray-400 text-lg md:text-xl">From source transaction to destination delivery in 8 automated steps.</p>
              </div>

              <div className="relative z-10 mt-32 mb-16 w-full max-w-5xl mx-auto overflow-x-auto md:overflow-visible pb-16 md:pb-0">
                <div className="min-w-[800px] w-full px-12 md:px-0">
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
                                <div className="w-[140px] h-[76px] bg-black/90 backdrop-blur-md px-3 py-2 rounded-[12px] flex flex-col items-center justify-center border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                                  <div className={`text-[10px] font-black mb-1 ${textColorClass} uppercase text-center w-full`}>{step[0]}</div>
                                  <div className="text-[10px] text-gray-400 leading-[1.3] text-center w-full">{step[1]}</div>
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

        <section className="my-24 md:my-32 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 rounded-[2rem]">
            <div className="relative text-center w-full z-10 mb-10">
              <div className="inline-block">
                <div className="text-4xl md:text-6xl font-semibold leading-[1.1] pb-1 text-metallic-premium uppercase text-center drop-shadow-2xl">DELIVERY BENCHMARKS</div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {deliveryBenchmarks.map(([value, title, subtitle]) => (
                <div key={title} className="rounded-[2rem] border border-white/5 bg-black/20 backdrop-blur-md shadow-inner px-8 py-10 transition-colors hover:bg-white/5">
                  <div className="text-4xl md:text-5xl font-semibold text-white mb-5">{value}</div>
                  <div className="text-[13px] uppercase text-gray-300 mb-2 font-medium">{title}</div>
                  {subtitle ? <div className="text-xs text-gray-400 mt-2">{subtitle}</div> : null}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="developers" className="my-24 md:my-32 px-6 w-full max-w-[1100px] mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="grid xl:grid-cols-2 gap-12 xl:gap-20 items-stretch relative z-10">

              {/* Left Column */}
              <div className="relative z-10 w-full h-full group py-6 xl:py-0 flex flex-col">
                <div className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl relative shadow-inner p-8 md:p-10 flex-1 flex flex-col justify-center">
                  <div className="inline-block relative z-10 mb-8">
                    <h2 className="text-4xl md:text-5xl md: font-semibold leading-[1.1] text-metallic-premium drop-shadow-2xl">
                      One contract.<br />
                      <span>Any chain.</span>
                    </h2>
                  </div>

                  <div className="space-y-6 relative">
                    <div className="flex gap-6">
                      <div className="w-6 shrink-0"></div>
                      <div>
                        <h3 className="text-[17px] font-bold text-white mb-1.5">Standardized Interface</h3>
                        <p className="text-gray-400 text-[13px] leading-relaxed">Write once using our Solidity SDK. Deploy to EVM, Solana, Cosmos, and Stellar without changes.</p>
                      </div>
                    </div>

                    <div className="flex gap-6 relative">
                      <div className="w-6 shrink-0 flex items-start justify-center pt-1">
                        <Shield className="w-5 h-5 text-[#cccccc]" />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-white mb-1.5">Automated Security</h3>
                        <p className="text-gray-400 text-[13px] leading-relaxed">Signatures verified on-chain. Fees calculated automatically. No manual oracle management needed.</p>
                      </div>
                    </div>

                    <div className="flex gap-6 relative">
                      <div className="w-6 shrink-0 flex items-start justify-center pt-1">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-white mb-1.5">Instant Integration</h3>
                        <p className="text-gray-400 text-[13px] leading-relaxed">Copy our interface. Call <span className="bg-[#0b1d26] text-[#cccccc] px-1.5 py-0.5 rounded text-[12px] border border-[#cccccc]/10 font-mono">sendMessage()</span>. You&apos;re cross-chain in under 10 minutes.</p>
                      </div>
                    </div>

                    <div className="ml-12 pt-4">
                      <button
                        onClick={() => scrollTo('actions')}
                        className="px-6 py-3 bg-white text-black font-bold uppercase text-[12px] rounded-[4px] hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2.5 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      >
                        START BUILDING <span className="text-lg leading-none font-normal relative top-[1px]">&rarr;</span>
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
                    <div className="text-xs font-medium text-gray-500 flex-1 text-center pr-12">CrossChainSwap.sol</div>
                  </div>
                  {/* Code syntax left uncolored explicitly as requested */}
                  <pre className="p-6 md:p-8 text-[13px] leading-relaxed text-gray-300 overflow-x-auto bg-transparent">
                    <code>{`import "IEntangle.sol";

// 1. Define destination
string memory dstChain = "arbitrum";
bytes memory dstAddr = abi.encode(user);

// 2. Pack your payload
bytes memory payload = abi.encode(
  "SWAP",
  tokenAddress,
  amount
);

// 3. Send message!
uint256 fees = entangle.getFee(
  dstChain, payload.length
);

entangle.sendMessage{value: fees}(
  dstChain,
  dstAddr,
  payload
);`}</code>
                  </pre>
                </div>
              </div>

            </div>
          </motion.div>
        </section>



        <section id="chain-support" className="my-24 md:my-32 px-6 w-full max-w-[1100px] mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="inline-block relative z-10 mb-8">
              <h2 className="text-4xl md:text-5xl md: font-semibold leading-[1.1] pb-1 mb-3 text-metallic-premium drop-shadow-2xl">Chain Support</h2>
              <p className="text-gray-400 text-sm md:text-[15px]">One clean interface. Connecting the biggest ecosystems.</p>
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
                          <div className="w-8 h-[52px] relative opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)] flex flex-col items-center">
                            <svg width="34" height="52" viewBox="0 0 256 417" fill="none">
                              <path d="M127.962 0L0 212.32l127.962 75.639V0z" fill="#cccccc" />
                              <path d="M127.961 0v287.958l127.962-75.638L127.961 0z" fill="#888888" />
                              <path d="M127.962 416.905v-104.72L0 236.585z" fill="#999999" />
                              <path d="M127.961 416.905v-104.718L256 236.587z" fill="#555555" />
                            </svg>
                          </div>
                        )}
                        {name === 'Arbitrum' && (
                          <div className="flex flex-col justify-center items-center opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                            <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
                              <path d="M12 2L1 7l11 5 11-5L12 2zm0 13.5L1.5 10l-1 .5L12 16l11.5-5.5-1-.5L12 15.5zm0 4.5L1.5 14.5l-1 .5L12 20.5l11.5-5.5-1-.5L12 20z" />
                            </svg>
                          </div>
                        )}
                        {name === 'Optimism' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)]">
                            <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="#cccccc" strokeWidth="6.5">
                              {/* Gap perfectly in the top-middle (12 o'clock) */}
                              <path d="M 30 7 A 18 18 0 1 1 18 7" />
                            </svg>
                          </div>
                        )}
                        {name === 'Base' && <div className="w-[42px] h-[42px] rounded-full bg-[#cccccc] drop-shadow-[0_0_8px_rgba(204,204,204,0.5)] opacity-90 group-hover:opacity-100 transition-opacity"></div>}
                      </div>
                      <div className="text-lg font-bold text-white mb-2">{name}</div>
                      <div className="text-[10px] font-medium text-gray-500">{type}</div>
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
                          <svg
                            className="mt-1 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)]"
                            width="46"
                            height="46"
                            viewBox="0 0 64 64"
                            fill="#cccccc"
                            aria-hidden="true"
                          >
                            <path d="M40.5 6.5c1.8-1.8 4.8 0 4 2.4l-6.8 20H50c2.7 0 4.2 3.1 2.4 5.1l-24.7 27c-1.8 2-5 0.3-4.3-2.2l6.5-22.1H17.5c-2.7 0-4.2-3.1-2.4-5.1l25.4-25.1z" />
                          </svg>
                        )}
                        {name === 'SUI' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(204,204,204,0.5)] mt-1">
                            <svg width="40" height="48" viewBox="0 0 64 64" fill="#cccccc">
                              <path d="M32 4c9 0 22 21 22 32 0 12.2-9.8 22-22 22S10 48.2 10 36C10 25 23 4 32 4z" />
                              <path d="M23 36c0 5 4 9 9 9 2.8 0 5.3-1.2 7-3.1" fill="none" stroke="#020205" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        {name === 'Cosmos' && (
                          <div className="relative flex items-center justify-center opacity-90 group-hover:opacity-100 w-[50px] h-[50px] transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mt-1">
                            <div className="w-[11px] h-[11px] rounded-full bg-white z-10"></div>
                            <svg viewBox="0 0 24 24" className="w-[50px] h-[50px] text-white absolute" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(30 12 12)" />
                              <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(-30 12 12)" />
                              <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(90 12 12)" />
                            </svg>
                          </div>
                        )}
                        {name === 'Stellar' && (
                          <div className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mt-1">
                            <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                              <g transform="rotate(-45 24 24)">
                                {/* Single unified rocket body + fins shape */}
                                <path
                                  d="M24 4 Q19 4 16 16 Q14 24 14 32 L8 38 L12 40 L16 35 Q18 42 24 42 Q30 42 32 35 L36 40 L40 38 L34 32 Q34 24 32 16 Q29 4 24 4 Z"
                                  fill="#ffffff"
                                />
                                {/* Porthole window */}
                                <circle cx="24" cy="20" r="4" fill="#0a0a0a" />
                              </g>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="text-lg font-bold text-white mb-2">{name}</div>
                      <div className="text-[10px] font-medium text-gray-500">{type}</div>
                    </div>
                  );
                })}
              </div>

              {/* Banner at bottom */}
              <div className="p-4 bg-transparent flex items-center justify-start border-l-[4px] border-[#cccccc]">
                <div className="flex items-center gap-4 pl-2">
                  <span className="text-gray-300 text-xl">⏱️</span>
                  <div className="text-white text-[14px]">
                    <span className="font-semibold">&lt; 10s Delivery on L2s.</span> <span className="text-gray-500 ml-2">Add a new chain with just one adapter class.</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>


        <section id="simple-integration" className="w-full relative z-10 my-24 md:my-32 px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="surface-glass-strong p-6 md:p-6 lg:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="inline-block relative z-10 mb-8">
              <h2 className="text-4xl md:text-5xl md: font-semibold leading-[1.1] pb-1 text-metallic-premium drop-shadow-2xl">
                Simple Integration.
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10">

              {/* Connector Line left side (Desktop) */}
              <div className="w-4 shrink-0 relative hidden md:block">
                <div className="absolute left-1/2 top-[40px] bottom-[40px] w-[2px] bg-gradient-to-b from-[#cccccc] via-[#555] to-[#cccccc] -translate-x-1/2 flex flex-col justify-between items-center z-10">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#cccccc] -mt-1 shadow-[0_0_10px_rgba(204,204,204,0.8)]"></div>
                  <div className="w-[10px] h-[10px] rounded-full bg-[#cccccc] -mb-1 shadow-[0_0_10px_rgba(204,204,204,0.8)]"></div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4 relative">

                {/* Source Block Wrapper */}
                <div className="relative pt-6">
                  <div className="absolute right-0 top-0 text-[#cccccc] text-[10px] md:text-[11px] font-semibold uppercase flex items-center gap-2">
                    SOURCE <span className="text-sm md:text-lg leading-none">&rarr;</span>
                  </div>

                  <div className="rounded-[12px] border border-[#cccccc]/20 bg-black/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)] shadow-inner w-full text-[11px] sm:text-[12px] md:text-[13px]">
                    <div className="bg-black/40 border-b border-[#ffffff10] py-2 px-4 md:py-3 md:px-5 flex items-center gap-3 backdrop-blur-sm">
                      <div className="flex gap-2 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[#b5b5b5]" />
                        <div className="w-3 h-3 rounded-full bg-[#8a8a8a]" />
                        <div className="w-3 h-3 rounded-full bg-[#d8d8d8]" />
                      </div>
                      <div className="text-gray-500 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">Sender.sol (Source Chain)</div>
                    </div>

                    <pre className="px-4 py-3 md:px-6 md:py-4 leading-snug text-[#c9c9d1] overflow-x-auto">
                      <code>
                        <span className="text-[#cccccc]">function</span> <span className="text-[#cccccc]">sendCrossChain</span>(<span className="text-gray-400">uint256</span> amount) <span className="text-[#cccccc]">external payable</span> {"{"}
                        {"\n  "}<span className="text-[#cccccc]">bytes</span> <span className="text-[#cccccc]">memory</span> payload = abi.<span className="text-[#cccccc]">encode</span>(amount);
                        {"\n  "}<span className="text-[#cccccc]">uint256</span> fee = entangle.<span className="text-[#cccccc]">getRequiredFee</span>(dstChainId, payload.length);
                        {"\n  "}<span className="text-gray-500">// 1. Dispatch Message</span>
                        {"\n  "}entangle.<span className="text-[#cccccc]">sendMessage</span>{"{"}<span className="text-[#cccccc]">value</span>: fee{"}"}(dstChainId, dstAddr, payload);
                        {"\n"}{"}"}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center -my-1 relative z-10 py-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>

                {/* Destination Block Wrapper */}
                <div className="relative pt-6">
                  <div className="absolute right-0 top-0 text-[#cccccc] text-[10px] md:text-[11px] font-semibold uppercase flex items-center gap-2">
                    DESTINATION <span className="text-sm md:text-lg leading-none">&rarr;</span>
                  </div>

                  <div className="rounded-[12px] border border-[#cccccc]/20 bg-black/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)] shadow-inner w-full text-[11px] sm:text-[12px] md:text-[13px]">
                    <div className="bg-black/40 border-b border-[#ffffff10] py-2 px-4 md:py-3 md:px-5 flex items-center gap-3 backdrop-blur-sm">
                      <div className="flex gap-2 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[#b5b5b5]" />
                        <div className="w-3 h-3 rounded-full bg-[#8a8a8a]" />
                        <div className="w-3 h-3 rounded-full bg-[#d8d8d8]" />
                      </div>
                      <div className="text-gray-500 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">Receiver.sol (Destination Chain)</div>
                    </div>

                    <pre className="px-4 py-3 md:px-6 md:py-4 leading-snug text-[#c9c9d1] overflow-x-auto">
                      <code>
                        <span className="text-[#cccccc]">function</span> <span className="text-[#cccccc]">receiveEntangleMessage</span>(
                        {"\n  "}<span className="text-[#cccccc]">bytes</span> <span className="text-[#cccccc]">memory</span> payload, <span className="text-[#cccccc]">bytes</span> <span className="text-[#cccccc]">memory</span> sigs, ...
                        {"\n"}) <span className="text-[#cccccc]">external payable</span> {"{"}
                        {"\n  "}<span className="text-gray-500">// 2. Verify Origin (Security)</span>
                        {"\n  "}<span className="text-[#cccccc]">require</span>(<span className="text-[#cccccc]">msg.sender</span> == <span className="text-[#cccccc]">address</span>(entangle), "Only Entangle");
                        {"\n  "}<span className="text-gray-500">// 3. Execute Logic</span>
                        {"\n  "}<span className="text-[#cccccc]">uint256</span> amount = abi.<span className="text-[#cccccc]">decode</span>(payload, (<span className="text-[#cccccc]">uint256</span>));
                        {"\n  "}<span className="text-[#cccccc]">_mint</span>(amount);
                        {"\n"}{"}"}
                      </code>
                    </pre>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </section>





        <section id="consensus" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden max-w-[1100px] mx-auto w-full">

            <div className="relative z-10 pt-4 md:pt-8">
              <div className="inline-block relative z-10">
                <h2 className="text-4xl md:text-5xl md: md: font-semibold leading-[1.1] pb-1 text-metallic-premium drop-shadow-2xl">
                  Threshold signatures.<br />
                  <span>No single validator.</span>
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
                  N-OF-M CONSENSUS MODEL
                </div>
              </div>

              {/* Stacked Highlighted Cards */}
              <div className="flex flex-col bg-black/20 backdrop-blur-md shadow-inner rounded-2xl overflow-hidden border border-white/5">

                {/* Multi-Chain Signatures */}
                <div className="border-b border-white/5 border-l-[3px] border-l-[#cccccc] p-5 md:p-6 bg-transparent hover:bg-white/5 transition-colors">
                  <h3 className="text-white text-[17px] font-bold mb-3 md:mb-4">Multi-Chain Signatures</h3>
                  <div className="text-[13px] md:text-[14px]">
                    <div className="mb-2">
                      <span className="text-white">EVM:</span> <span className="bg-[#0b1d26] text-[#cccccc] px-2 py-0.5 rounded text-[13px] mx-1 border border-[#cccccc]/10">secp256k1</span> <span className="text-[#888]">/ ecrecover</span>
                    </div>
                    <div>
                      <span className="text-white inline-block mt-0.5">Non-EVM:</span> <span className="bg-[#0b1d26] text-[#cccccc] px-2 py-0.5 rounded text-[13px] mx-1 border border-[#cccccc]/10">ed25519</span> <span className="text-[#888]">(Solana, SUI, Cosmos)</span>
                    </div>
                  </div>
                </div>

                {/* On-Chain Verification */}
                <div className="border-b border-white/5 border-l-[3px] border-l-[#cccccc] p-5 md:p-6 bg-transparent hover:bg-white/5 transition-colors">
                  <h3 className="text-white text-[17px] font-bold mb-3 md:mb-4">On-Chain Verification</h3>
                  <p className="text-[#888] text-[13px] md:text-[14px] mb-4">Smart contracts enforce cryptographic proofs.</p>
                  <div className="bg-[#0b1d26] border border-[#cccccc]/10 text-[#cccccc] text-[13px] px-3 py-1.5 inline-block rounded">
                    verifyMessage(msg_hash, sig_bundle)
                  </div>
                </div>

                {/* Trust Minimized */}
                <div className="border-l-[3px] border-l-[#cccccc] p-5 md:p-6 bg-transparent hover:bg-white/5 transition-colors">
                  <h3 className="text-white text-[17px] font-bold mb-3 md:mb-4">Trust Minimized</h3>
                  <p className="text-[#888] text-[13px] md:text-[14px] leading-relaxed max-w-sm">
                    No single validator can authorize a delivery.<br />
                    Consensus threshold required for all ops.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>



        <section id="operators" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            {/* Glowing cyan orb softly placed on left */}
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#cccccc]/[0.035] rounded-full blur-[90px] pointer-events-none"></div>

            <div className="p-8 md:p-12 lg:p-16 relative z-10">
              <h2 className="text-4xl md:text-5xl md: md: font-semibold mb-6 text-metallic-premium drop-shadow-2xl">
                Dual Income: Native Fees +<br className="hidden md:block" />
                Protocol Rewards
              </h2>

              <p className="text-[#888] text-[15px] md:text-[17px] max-w-[650px] leading-[1.65] mb-12">
                Participate in the Entangle Subnet on Bittensor. Earn continuous rewards<br className="hidden md:block" />
                for securing cross-chain communication.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 bg-black/20 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-md max-w-[700px] shadow-inner">
                <button className="px-8 py-3.5 bg-white text-black font-bold uppercase text-[13px] rounded-[4px] hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  START EARNING <span className="text-lg leading-none font-normal relative top-[1px]">&rarr;</span>
                </button>

                <a href="#" className="text-[#999] text-[14px] md:text-[15px] underline underline-offset-[5px] decoration-[#444] hover:text-white hover:decoration-white transition-colors leading-none">
                  Read the Miner Documentation
                </a>
              </div>
            </div>

          </div>
        </section>

        <section id="scanner-miner" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden max-w-[1100px] mx-auto w-full">

            {/* Horizontal Line separating sections yaa do it */}

            <div className="absolute top-[100px] left-[-20vw] right-[-20vw] h-[1px] bg-[#111111] pointer-events-none z-0"></div>

            <div className="inline-block relative z-10 mb-8 pl-2">
              <h2 className="text-4xl md:text-5xl md: md: font-semibold text-metallic-premium drop-shadow-2xl">
                Scanner Miner
              </h2>
            </div>

            <div className="rounded-[1.5rem] bg-black/20 backdrop-blur-md shadow-inner border border-white/10 relative mx-auto w-full max-w-[900px] overflow-hidden mt-8 md:mt-10 hover:bg-black/30 transition-colors">
              {/* Cyan top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#cccccc] shadow-[0_0_20px_rgba(204,204,204,0.4)]"></div>

              <div className="flex flex-col md:flex-row relative">
                {/* Faint internal vertical divider for desktop */}
                <div className="hidden md:block absolute left-[38%] top-[10%] bottom-[10%] w-[1px] bg-[#ffffff08]"></div>

                {/* Left Column Component */}
                <div className="w-full md:w-[38%] pt-16 pb-14 px-8 flex flex-col items-center text-center">
                  <div className="w-[96px] h-[96px] rounded-full border-[1.5px] border-[#cccccc] bg-[#cccccc]/[0.05] flex items-center justify-center shadow-[0_0_30px_rgba(204,204,204,0.2)] mb-8">
                    <svg className="w-[38px] h-[38px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 2c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19zM12 3C7.03 3 3 7.03 3 12c0 3.32 1.8 6.22 4.5 7.79l1-1.73C6.39 16.89 5 14.61 5 12c0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.61-1.39 4.89-3.5 6.06l1 1.73C19.2 18.22 21 15.32 21 12c0-4.97-4.03-9-9-9z" />
                    </svg>
                  </div>

                  <div className="text-[72px] font-bold text-[#cccccc] leading-none mb-4 shadow-[#cccccc] drop-shadow-[0_0_15px_rgba(204,204,204,0.6)]">~30%</div>
                  <div className="text-[10px] font-semibold text-[#cccccc] mb-4">SUBNET TAO EMISSIONS</div>

                  <p className="text-[#666] text-[13px] leading-relaxed max-w-[200px]">
                    Rewards distributed per epoch based on discovery speed and accuracy.
                  </p>
                </div>

                {/* Right Column Component */}
                <div className="w-full md:w-[62%] pt-16 pb-14 px-10 md:pr-14 md:pl-12">
                  <h3 className="text-white text-[17px] font-bold mb-3">Discovery Mechanism</h3>
                  <p className="text-[#a1a1a1] text-[15px] leading-[1.6] mb-10 w-[95%]">
                    The Scanner Miner constantly monitor connected blockchains for activity.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      <div className="text-[#a1a1a1] text-[14px] leading-relaxed">
                        <span className="text-white font-medium">Real-time Polling:</span> Queries RPC nodes every block to detect <span className="text-[12px] bg-[#1a1a1a]/80 text-[#ccc] px-1.5 py-0.5 rounded">MessageDispatched</span> events.
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 4c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v2.59c0 .27-.11.52-.29.71L15 13.41V20c0 .35-.2.66-.51.84l-4 2.33A.996.996 0 019 22v-8.59L3.29 7.3A1 1 0 013 6.59V4z" />
                      </svg>
                      <div className="text-[#a1a1a1] text-[14px] leading-relaxed">
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
                      <div className="text-[#a1a1a1] text-[14px] leading-relaxed">
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
                <span className="text-[#cccccc] text-[10px] font-bold uppercase mt-[1px]">REQUIRED STAKE: 100 TAO TO REGISTER UID</span>
              </div>
            </div>

          </div>
        </section>

        <section id="relay-miner" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden max-w-[1100px] mx-auto w-full">


            {/* Horizontal Line separating sections */}
            <div className="absolute top-[100px] left-[-20vw] right-[-20vw] h-[1px] bg-[#111111] pointer-events-none z-0"></div>

            <div className="inline-block relative z-10 mb-8 pl-2">
              <h2 className="text-4xl md:text-5xl md: md: font-semibold leading-[1.1] pb-1 text-metallic-premium drop-shadow-2xl">
                Relay Miner
              </h2>
            </div>

            <div className="rounded-[1.5rem] bg-black/20 backdrop-blur-md shadow-inner border border-white/10 relative mx-auto w-full max-w-[900px] overflow-hidden mt-8 md:mt-10 hover:bg-black/30 transition-colors">
              {/* Neutral top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#cccccc] shadow-[0_0_20px_rgba(204,204,204,0.4)]"></div>

              <div className="flex flex-col md:flex-row relative">
                {/* Faint internal vertical divider for desktop */}
                <div className="hidden md:block absolute left-[38%] top-[10%] bottom-[10%] w-[1px] bg-[#ffffff08]"></div>

                {/* Left Column Component */}
                <div className="w-full md:w-[38%] pt-16 pb-14 px-8 flex flex-col items-center text-center">
                  <div className="w-[96px] h-[96px] rounded-full border-[1.5px] border-[#cccccc] bg-[#cccccc]/[0.05] flex items-center justify-center shadow-[0_0_30px_rgba(204,204,204,0.2)] mb-8">
                    <svg className="w-[38px] h-[38px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>

                  <div className="text-[72px] font-bold text-[#cccccc] leading-none mb-4 shadow-[#cccccc] drop-shadow-[0_0_15px_rgba(204,204,204,0.6)]">~70%</div>
                  <div className="text-[10px] font-semibold text-[#cccccc] mb-4">SUBNET TAO EMISSIONS</div>

                  <p className="text-[#666] text-[13px] leading-relaxed max-w-[200px]">
                    Rewards earned by winning auctions and successfully executing deliveries.
                  </p>
                </div>

                {/* Right Column Component */}
                <div className="w-full md:w-[62%] pt-16 pb-14 px-10 md:pr-14 md:pl-12">
                  <h3 className="text-white text-[17px] font-bold mb-3">Execution Mechanism</h3>
                  <p className="text-[#a1a1a1] text-[15px] leading-[1.6] mb-10 w-[95%]">
                    Relay Miners actively compete to physically deliver messages across chains with speed and security.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 6l4 4L7 21l-4-4L14 6z" />
                        <path d="M18 2l4 4-3 3-4-4 3-3z" />
                      </svg>
                      <div className="text-[#a1a1a1] text-[14px] leading-relaxed">
                        <span className="text-white font-medium">Sealed Auctions:</span> Bids latency & gas in 2s windows. Fastest + cheapest wins.
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <svg className="w-[16px] h-[16px] text-[#cccccc] mt-0.5 shrink-0 -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 8h-3V4H3v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM8 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17.5 9.5l1.96 2.5H17.5v-2.5z" />
                      </svg>
                      <div className="text-[#a1a1a1] text-[14px] leading-relaxed">
                        <span className="text-white font-medium">Cross-Chain Delivery:</span> Executes transaction on destination contract immediately.
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <svg className="w-[14px] h-[14px] text-[#cccccc] mt-1 shrink-0 px-[1px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 2v20l3-3 3 3 3-3 3 3 3-3 3 3V2H3zm14 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z" />
                      </svg>
                      <div className="text-[#a1a1a1] text-[14px] leading-relaxed">
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
                <span className="text-[#cccccc] text-[10px] font-bold uppercase mt-[1px]">VERIFIED DELIVERY: &lt; 10s LATENCY</span>
              </div>
            </div>

          </div>
        </section>




        <section id="the-auction" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-visible">



            <div className="relative z-10 mb-20 pt-10">
              <div className="text-[11px] text-[#cccccc] uppercase mb-5 font-bold">THE AUCTION</div>
              <h2 className="text-4xl md:text-5xl md: font-semibold leading-[1.1] pb-1 mb-5 text-metallic-premium drop-shadow-2xl">
                Sealed-Bid Velocity.
              </h2>
              <p className="text-[#888] text-[18px]">
                Fastest & cheapest miner wins execution rights.
              </p>
            </div>

            {/* Diagram container */}
            <div className="relative flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-[60px] xl:gap-[80px] w-full mt-16 max-w-[900px] mx-auto xl:mr-auto xl:ml-0">

              {/* 1. RELAY MINERS column */}
              <div className="flex flex-col gap-4 relative w-full sm:w-[240px] xl:w-[200px] shrink-0 xl:justify-center">
                <div className="text-[#666] text-[10px] text-center xl:text-left mb-2">RELAY MINERS</div>

                {/* Desktop connection lines drawn behind the items */}
                <div className="hidden xl:block absolute left-[100%] top-[45px] w-[30px] h-[155px] border-t border-b border-l-0 border-r border-[#333] translate-y-[0px] rounded-r-[6px] z-0"></div>
                <div className="hidden xl:block absolute left-[100%] ml-[30px] top-1/2 -translate-y-[2px] w-[40px] h-[1px] bg-[#333] z-0"></div>
                {/* Arrow head */}
                <div className="hidden xl:block absolute left-[100%] ml-[66px] top-1/2 -translate-y-[6px] w-[0] h-[0] border-t-[5px] border-b-[5px] border-l-[6px] border-transparent border-l-[#333]"></div>

                {[
                  { id: 'A' },
                  { id: 'B' },
                  { id: 'C' }
                ].map((miner) => (
                  <div key={miner.id} className="w-full bg-black/20 backdrop-blur-md border border-white/5 rounded-[8px] p-4 py-4 flex items-center gap-4 relative z-10 shadow-inner hover:bg-white/5 transition-colors">
                    <svg className="w-[18px] h-[18px] text-[#666] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16v4H4zm2 1h2v2H6z" />
                      <path d="M4 14h16v4H4zm2 1h2v2H6z" />
                    </svg>
                    <div>
                      <div className="text-white text-[13px] font-bold">Miner {miner.id}</div>
                      <div className="text-[#555] text-[10px] mt-[2px] whitespace-nowrap flex items-center">
                        Sealed Bid
                        <svg className="w-[9px] h-[9px] ml-1.5 text-[#444] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. SCORING FORMULA container */}
              <div className="relative bg-black/20 backdrop-blur-md border border-white/5 rounded-[12px] p-8 md:p-10 w-full max-w-[440px] xl:w-[440px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-inner z-10 shrink-0">

                {/* Top Floating Badge */}
                <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-[#cccccc]/40 rounded-[30px] px-5 py-1.5 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(204,204,204,0.15)] shadow-inner whitespace-nowrap z-20">
                  <svg className="w-3.5 h-3.5 text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0012 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                  <span className="text-[#cccccc] font-bold text-[11px] mt-[1px]">2s Window</span>
                </div>

                <div className="text-center text-[#444] text-[10px] mb-7 mt-2 uppercase">SCORING FORMULA</div>

                <div className="flex justify-between items-center gap-6">
                  <div className="text-[20px] font-bold leading-[2.2]">
                    <div className="text-[#888] mb-1 text-[22px] font-semibold">Score = </div>
                    <div>
                      <span className="text-[#cccccc]">0.40</span> <span className="text-[#444] mx-[2px] text-[14px]">×</span> <span className="text-white">Latency</span>
                    </div>
                    <div>
                      <span className="text-[#555] mr-[5px] text-[14px]">+</span><span className="text-[#cccccc]">0.40</span> <span className="text-[#444] mx-[2px] text-[14px]">×</span> <span className="text-white">Gas Cost</span>
                    </div>
                    <div>
                      <span className="text-[#555] mr-[5px] text-[14px]">+</span><span className="text-white">0.20</span> <span className="text-[#444] mx-[2px] text-[14px]">×</span> <span className="text-white">Accuracy</span>
                    </div>
                  </div>

                  <div className="w-[70px] h-[70px] shrink-0 mt-5 relative">
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
                <div className="hidden xl:block absolute left-[100%] top-1/2 -translate-y-[2px] w-[35px] h-[1px] bg-[#333] z-0"></div>
                <div className="hidden xl:block absolute left-[100%] ml-[33px] top-1/2 -translate-y-[6px] w-[0] h-[0] border-t-[5px] border-b-[5px] border-l-[6px] border-transparent border-l-[#333]"></div>
              </div>

              {/* 3. WINNER EXECUTES */}
              <div className="w-full sm:w-[240px] xl:w-[150px] bg-black/20 backdrop-blur-md border-[1.5px] border-[#cccccc]/40 rounded-[8px] p-6 lg:p-7 flex flex-col items-center justify-center gap-4 relative z-10 shadow-[0_0_25px_rgba(204,204,204,0.15)] shadow-inner shrink-0 xl:self-center">
                <svg className="w-[30px] h-[30px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H5a1 1 0 0 0-1 1v2.22A4.78 4.78 0 0 0 8.78 13h.14a4.98 4.98 0 0 0 2.08 3h-2a1 1 0 0 0-1 1v2h-2v2h12v-2h-2v-2a1 1 0 0 0-1-1h-2a4.98 4.98 0 0 0 2.08-3h.14A4.78 4.78 0 0 0 19 8.22V6a1 1 0 0 0-1-1zM6 8.22V7h1v4.61A2.78 2.78 0 0 1 6 8.22zM17 7v1.22A2.78 2.78 0 0 1 14.39 12H18V7z" />
                </svg>
                <div className="text-white text-[12px] font-bold text-center leading-tight">
                  WINNER<br />EXECUTES
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="scoring" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            {/* The top crosshair grid line */}
            <div className="absolute top-[120px] left-[-20vw] right-[-20vw] h-[1px] bg-[#1a1a1a] pointer-events-none z-0"></div>

            <div className="relative z-10 mb-8 pt-5 flex flex-col gap-4 pb-4">
              <h2 className="text-4xl md:text-5xl md: font-semibold leading-[1.1] pb-1 text-metallic-premium drop-shadow-2xl">
                5-Dimension Scoring.
              </h2>
              <p className="text-[#888] text-[16px] max-w-[500px] leading-relaxed">
                Quality drives rewards. Miners are scored on every delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 relative z-10 w-full max-w-[1020px] mx-auto">

              {/* 1. Latency (25%) */}
              <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D1</div>
                <div className="text-white text-[20px] font-bold mb-1 drop-shadow-md">Latency</div>
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">25%</div>
                <div className="text-gray-300 text-[13px] leading-relaxed drop-shadow-md">
                  Time from source dispatch to destination delivery measured in ms.
                </div>
              </div>

              {/* 2. Confirmation (25%) */}
              <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D2</div>
                <div className="text-white text-[20px] font-bold mb-1 drop-shadow-md">Confirmation</div>
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">25%</div>
                <div className="text-gray-300 text-[13px] leading-relaxed drop-shadow-md">
                  Delivery within promised deadline.<br />Missed deadlines = zero score.
                </div>
              </div>

              {/* 3. Gas Efficiency (20%) */}
              <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
                <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D3</div>
                <div className="text-white text-[20px] font-bold mb-1 drop-shadow-md">Gas Efficiency</div>
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">20%</div>
                <div className="text-gray-300 text-[13px] leading-relaxed relative z-10 drop-shadow-md">
                  Optimizing on-chain costs vs. oracle estimates.
                </div>
              </div>

              {/* 4. Integrity (15%) */}
              <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
                <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D4</div>
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-1 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">15%</div>
                <div className="text-white text-[20px] font-bold mb-3 drop-shadow-md">Integrity</div>
                <div className="text-gray-300 text-[13px] leading-relaxed relative z-10 drop-shadow-md">
                  Payload hash matching source event exactly.
                </div>
              </div>

              {/* 5. Reliability (15%) */}
              <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">D5</div>
                <div className="text-white text-[20px] font-bold mb-1 drop-shadow-md">Reliability</div>
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-4 drop-shadow-[0_0_15px_rgba(204,204,204,0.4)]">15%</div>
                <div className="text-gray-300 text-[13px] leading-relaxed drop-shadow-md">
                  Historical uptime and successful delivery rate.
                </div>
              </div>

              {/* 6. Blended Score Box */}
              <div className="relative border border-white/10 border-l-[3px] border-l-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors rounded-r-xl py-5 pl-6 pr-5 shadow-2xl z-20">
                <div className="absolute top-4 right-4 bg-white/10 text-[#bbb] text-[10px] px-1.5 py-0.5 rounded leading-none backdrop-blur-sm">Σ</div>
                <div className="text-white text-[20px] font-bold mb-1 drop-shadow-md">Blended Score</div>
                <div className="text-gray-400 text-[10px] uppercase mb-4 font-bold">FINAL FORMULA</div>
                <div className="text-[14px] leading-[1.8] drop-shadow-md">
                  <div className="text-gray-300 mb-2">Score = </div>
                  <div><span className="text-[#cccccc] font-bold">0.70</span> <span className="text-white mx-1 text-xs px-0.5">×</span> <span className="text-gray-200">Exec +</span></div>
                  <div><span className="text-[#cccccc] font-bold">0.30</span> <span className="text-white mx-1 text-xs px-0.5">×</span> <span className="text-gray-200">Bid</span></div>
                </div>
              </div>

            </div>

            {/* Sub-footer scale line */}
            <div className="relative z-10 w-full max-w-[1020px] mx-auto mt-12 mb-4 flex pl-2 pr-2">
              {/* Exactly left side Cyan 50%, right side Pink 50% split */}
              <div className="h-[6px] w-[50%] bg-[#cccccc] shadow-[0_0_20px_rgba(204,204,204,0.4)]"></div>
              <div className="h-[6px] w-[50%] bg-[#cccccc] shadow-[0_0_20px_rgba(204,204,204,0.4)]"></div>
            </div>

          </div>
        </section>




        <section id="realtime-fees" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            {/* Horizontal Line separating sections */}
            <div className="absolute top-[200px] left-[-20vw] right-[-20vw] h-[1px] bg-[#1a1a1a] pointer-events-none z-0"></div>
            {/* The faint vertical separator grid line */}
            <div className="absolute top-0 bottom-[100px] left-[35%] w-[1px] bg-[#1a1a1a] pointer-events-none z-0 hidden xl:block"></div>

            <div className="relative z-10 mb-12 pt-6">
              <h2 className="text-4xl md:text-5xl md: font-semibold mb-4 text-metallic-premium drop-shadow-2xl">
                Real-time Fees. Real-time Rewards.
              </h2>
              <p className="text-[#888] text-[16px] max-w-[600px] leading-relaxed">
                A self-sustaining model earning native assets (ETH, SOL, USDC).<br />
                Revenue is independent of TAO price.
              </p>
            </div>

            {/* Flow Diagram Container */}
            <div className="relative flex flex-col xl:flex-row items-center justify-center gap-[40px] xl:gap-[0px] w-full max-w-[950px] mx-auto z-10">

              {/* 1. Left Block: User / dApp */}
              <div className="w-full sm:w-[280px] xl:w-[260px] bg-black/20 backdrop-blur-md shadow-inner border border-white/5 rounded-[10px] p-5 relative z-10 shrink-0">
                <div className="flex justify-between items-start mb-4 mt-1">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-2V9h2zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" /></svg>
                  <div className="flex gap-2 mt-0.5 items-center">
                    <svg className="w-[12px] h-[12px] text-[#627eea]" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M15.925 23.969L15.823 24l-7.447-4.391 7.553 10.638 7.57-10.638-7.574 4.36zM15.986 0L8.358 12.67l7.625 4.542 7.643-4.542L15.986 0z" />
                    </svg>
                    <div className="w-[13px] h-[13px] rounded-full bg-[#cccccc]"></div>
                  </div>
                </div>
                <div className="text-white text-[17px] font-bold mb-1">User / dApp</div>
                <div className="text-[#666] text-[13px] mb-4">Calls <span className="bg-[#0b1d26] text-[#cccccc] px-1.5 py-0.5 rounded text-[12px] border border-[#cccccc]/10 font-mono">sendMessage()</span></div>
                <div className="text-[#bbb] text-[13px] font-semibold">Pays Native Gas Fee</div>

                {/* Outbound connection line */}
                <div className="hidden xl:block absolute right-[-40px] top-1/2 w-[40px] h-[1px] bg-[#333] -translate-y-[0.5px] z-0"></div>
                <div className="hidden xl:block absolute right-[-44px] top-1/2 w-[0] h-[0] border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-[#333] -translate-y-[4px] z-10"></div>
              </div>

              {/* spacer */}
              <div className="hidden xl:block w-[40px] shrink-0"></div>

              {/* 2. Middle Block: ENTANGLE CORE */}
              <div className="w-[280px] bg-black/20 backdrop-blur-md shadow-inner border border-white/5 rounded-[8px] p-5 relative z-10 shrink-0 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                <div className="absolute top-[-1px] left-0 right-0 h-[3px] bg-white rounded-t-[8px] opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>

                <div className="text-white text-[12px] font-bold uppercase mb-4 mt-0.5">ENTANGLE CORE</div>

                <div className="space-y-4">
                  {/* Gas Oracle */}
                  <div className="bg-transparent hover:bg-white/5 transition-colors border border-white/5 rounded-[6px] p-3 flex gap-4 items-center">
                    <div className="bg-[#cccccc]/10 p-2.5 rounded-[4px] border border-[#cccccc]/20">
                      <svg className="w-[16px] h-[16px] text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9v11c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-2.21-1.79-4-4-4h-1V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13h8c0 1.66 1.34 3 3 3s3-1.34 3-3V9c0-.46.15-.88.4-1.22l3.37-3.37zM10 18H5V8h4.5c.28 0 .5.22.5.5v9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-[13px] font-bold mb-0.5 leading-none">Gas Oracle</div>
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
                      <div className="text-white text-[13px] font-bold mb-0.5 leading-none">Circuit Breaker</div>
                      <div className="text-[#666] text-[10px]">Staleness check &gt;50 blks</div>
                    </div>
                  </div>
                </div>

                {/* Outbound connection lines (Forking UP and DOWN) */}
                {/* Top line up */}
                <div className="hidden xl:block absolute right-[-50px] top-[50px] w-[50px] h-[1px] bg-[#333] transform rotate-[-25deg] origin-left z-0"></div>
                {/* Bottom line down */}
                <div className="hidden xl:block absolute right-[-50px] bottom-[50px] w-[50px] h-[1px] bg-[#333] transform rotate-[25deg] origin-left z-0"></div>
              </div>

              {/* gap for the branching lines */}
              <div className="hidden xl:block w-[50px] shrink-0 relative z-0"></div>

              {/* 3. Right Blocks Column */}
              <div className="flex flex-col gap-4 xl:gap-4 shrink-0 w-full sm:w-[320px] xl:w-[300px]">

                {/* Top: 30% Protocol Treasury */}
                <div className="bg-black/20 backdrop-blur-md shadow-inner border border-white/5 border-l-[3px] border-l-[#cccccc] rounded-[8px] p-5 shadow-[0_0_20px_rgba(204,204,204,0.06)] relative z-10 w-full overflow-hidden hover:bg-white/5 transition-colors">
                  <div className="absolute inset-0 border border-[#cccccc]/[0.05] rounded-[8px] pointer-events-none"></div>
                  <div className="text-[48px] font-bold text-[#cccccc] leading-none mb-1 mt-0.5 drop-shadow-[0_0_15px_rgba(204,204,204,0.3)]">30%</div>
                  <div className="text-white text-[15px] xl:text-[17px] font-bold mb-2">Protocol Treasury</div>
                  <div className="text-[#888] text-[11px] leading-relaxed mb-4 w-[95%]">
                    Accumulates native assets (ETH, SOL, ATOM). Funds operations and growth.
                  </div>

                  <div className="inline-block bg-[#cccccc]/10 text-[#cccccc] text-[10px] px-2 py-1 rounded-[4px] uppercase font-bold">
                    ON-CHAIN
                  </div>
                </div>

                {/* Bottom: 70% Relay Reserve */}
                <div className="bg-black/20 backdrop-blur-md shadow-inner border border-white/5 border-l-[3px] border-l-[#cccccc] rounded-[8px] p-5 shadow-[0_0_20px_rgba(204,204,204,0.06)] relative z-10 w-full overflow-hidden hover:bg-white/5 transition-colors">
                  <div className="absolute inset-0 border border-[#cccccc]/[0.05] rounded-[8px] pointer-events-none"></div>
                  <div className="text-[48px] font-bold text-[#cccccc] leading-none mb-1 mt-0.5 drop-shadow-[0_0_15px_rgba(204,204,204,0.3)]">70%</div>
                  <div className="text-white text-[15px] xl:text-[17px] font-bold mb-2">Relay Reserve</div>
                  <div className="text-[#888] text-[11px] leading-relaxed mb-4 w-[95%]">
                    Direct rewards for Relay Miners who successfully execute transactions.
                  </div>

                  <div className="inline-block bg-[#cccccc]/10 text-[#cccccc] text-[10px] px-2 py-1 rounded-[4px] uppercase font-bold">
                    MINER REWARD
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section id="reference-run" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">



            <div className="relative z-10 mb-6 pt-3">
              <h2 className="text-4xl md:text-5xl md: font-semibold mb-2 text-metallic-premium drop-shadow-2xl">
                It&apos;s Live.
              </h2>
            </div>

            {/* Top Metrics Row */}
            <div className="relative z-10 flex flex-col md:flex-row gap-4 mb-8 w-full max-w-[950px] mx-auto">
              {/* 8.3s */}
              <div className="flex-1 border-l-[3px] border-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors p-5 shadow-lg">
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-2 drop-shadow-[0_0_15px_rgba(204,204,204,0.2)] mt-1">8.3s</div>
                <div className="text-[#888] text-[10px] uppercase mb-1 font-semibold">FASTEST DELIVERY</div>
                <div className="text-[#555] text-[10px] uppercase leading-relaxed">SOLANA &rarr; ARBITRUM</div>
              </div>

              {/* 8/8 */}
              <div className="flex-1 border-l-[3px] border-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors p-5 shadow-lg">
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-2 drop-shadow-[0_0_15px_rgba(204,204,204,0.2)] mt-1">8/8</div>
                <div className="text-[#888] text-[10px] uppercase mb-1 font-semibold">CONSECUTIVE RUNS</div>
                <div className="text-[#555] text-[10px] uppercase leading-relaxed">100% SUCCESS RATE</div>
              </div>

              {/* 213K */}
              <div className="flex-1 border-l-[3px] border-[#cccccc] bg-black/20 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors p-5 shadow-lg">
                <div className="text-[44px] font-bold text-[#cccccc] leading-none mb-2 drop-shadow-[0_0_15px_rgba(204,204,204,0.2)] mt-1">213K</div>
                <div className="text-[#888] text-[10px] uppercase mb-1 font-semibold">GAS USED</div>
                <div className="text-[#555] text-[10px] uppercase leading-relaxed">REFERENCE DELIVERY</div>
              </div>
            </div>

            {/* Main Reference Run Container */}
            <div className="relative z-10 w-full max-w-[950px] mx-auto border border-white/5 bg-black/20 backdrop-blur-md rounded-[10px] shadow-inner overflow-hidden">

              {/* Header Slice */}
              <div className="bg-white/[0.03] px-5 py-2 flex items-center justify-between border-b border-white/5">
                <div className="text-[11px]">
                  <span className="text-[#666] uppercase">REFERENCE RUN ID:</span>
                  <span className="text-white font-bold ml-2">#TEST-2026-03-17-A</span>
                </div>
                <div className="bg-[#cccccc] text-black font-bold text-[10px] uppercase px-3 py-1.5 rounded-[4px] flex items-center gap-1.5 shadow-[0_0_15px_rgba(204,204,204,0.3)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"></path></svg>
                  VERIFIED
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
                  <div className="text-white text-[17px] font-bold mb-1.5">Sepolia</div>
                  <div className="text-[#666] text-[12px] mb-1.5 whitespace-nowrap">Message Dispatched</div>
                  <div className="bg-[#cccccc]/10 text-[#cccccc] border border-[#cccccc]/20 rounded-[4px] px-2.5 py-1 text-[11px] mb-3 min-w-[130px]">
                    0x4f90576e...
                  </div>
                  <div className="text-[#555] text-[10px] bg-transparent mt-0.5">Block 10464665</div>
                </div>

                {/* Middle Node (ENTANGLE RELAY) - Desktop: absolutely centered on the line */}
                <div className="hidden md:flex absolute left-1/2 top-[calc(3.5rem+36px)] -translate-x-1/2 -translate-y-1/2 z-10 w-[170px] bg-[#0a0a0f]/80 hover:bg-white/5 transition-colors backdrop-blur-md border border-white/5 rounded-[8px] p-4 flex-col items-center text-center">
                  <div className="text-[#777] text-[10px] uppercase mb-1">ENTANGLE RELAY</div>
                  <div className="text-white text-[26px] font-bold mb-0.5">8.3s</div>
                  <div className="flex items-center gap-1 text-[#cccccc] text-[9px] font-bold uppercase mt-0.5">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    OPTIMIZED
                  </div>
                </div>
                {/* Middle Node (ENTANGLE RELAY) - Mobile: inline flow */}
                <div className="md:hidden relative z-10 w-[170px] bg-transparent hover:bg-white/5 transition-colors backdrop-blur-sm border border-white/5 rounded-[8px] p-4 flex flex-col items-center text-center">
                  <div className="text-[#777] text-[10px] uppercase mb-1">ENTANGLE RELAY</div>
                  <div className="text-white text-[26px] font-bold mb-0.5">8.3s</div>
                  <div className="flex items-center gap-1 text-[#cccccc] text-[9px] font-bold uppercase mt-0.5">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    OPTIMIZED
                  </div>
                </div>

                {/* Right Node (Arbitrum) */}
                <div className="relative z-10 flex flex-col items-center text-center w-full md:w-[180px]">
                  <div className="w-[72px] h-[72px] rounded-full border-[2px] border-[#cccccc] bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(204,204,204,0.3)] flex items-center justify-center mb-3 z-10 hover:bg-black/60 transition-colors">
                    <svg className="w-[30px] h-[30px] text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zm0 6l-10 5 10 5 10-5-10-5zm0 6l-10 5 10 5 10-5-10-5z" />
                    </svg>
                  </div>
                  <div className="text-white text-[17px] font-bold mb-1.5 whitespace-nowrap">Arbitrum Sepolia</div>
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




        <section id="actions" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            <div className="absolute top-[90px] left-[-20vw] right-[-20vw] h-[1px] bg-[#1a1a1a] pointer-events-none z-0"></div>

            <div className="relative z-10 mb-8 pt-4">
              <h2 className="text-4xl md:text-5xl md: font-semibold leading-[1.1] pb-1 mb-2 text-metallic-premium drop-shadow-2xl">
                Start Building. Start Earning.
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
                <div className="text-[#888] text-[15px] leading-[1.7] mb-8 flex-grow">
                  Integrate omnichain messaging in minutes. One SDK for EVM, Solana, and Cosmos.
                </div>

                <div className="text-[11px] text-[#777] leading-[1.8] mb-8">
                  <div><span className="text-[#cccccc]">&gt;</span> npm install @entangle/sdk</div>
                  <div><span className="text-[#cccccc]">&gt;</span> import {'{'} Entangle {'}'}</div>
                </div>

                <button className="w-full bg-white hover:bg-gray-200 text-black font-bold text-[11px] uppercase py-4 px-4 rounded-[4px] transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  READ THE DOCS
                </button>

                <div className="text-[#888] text-[11px] uppercase hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                  VIEW GITHUB
                </div>
              </div>

              {/* 2. Operators */}
              <div className="flex-1 bg-transparent border-t-[3px] border-[#cccccc] p-8 lg:p-10 flex flex-col relative z-10 border-b border-white/5 lg:border-b-0 lg:border-r hover:bg-white/5 transition-colors">
                <div className="w-[50px] h-[50px] rounded-full bg-[#cccccc]/10 flex items-center justify-center mb-8">
                  <svg className="w-5 h-5 text-[#cccccc]" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v4H4zm0 8h16v4H4zm2-6h2v2H6zm0 8h2v2H6z" /></svg>
                </div>
                <div className="text-white text-[28px] font-bold mb-4">Operators</div>
                <div className="text-[#888] text-[15px] leading-[1.7] mb-8 flex-grow">
                  Secure the network and earn dual rewards. Run Validators, Scanners, or Relay Miners.
                </div>

                <div className="text-[11px] text-[#777] leading-[1.8] mb-8">
                  <div><span className="text-[#cccccc]">$</span> 70% Relay Rewards</div>
                  <div><span className="text-[#cccccc]">$</span> 30% Scanner Rewards</div>
                </div>

                <button className="w-full bg-white hover:bg-gray-200 text-black font-bold text-[11px] uppercase py-4 px-4 rounded-[4px] transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  RUN A NODE
                </button>

                <div className="text-[#888] text-[11px] uppercase hover:text-white cursor-pointer transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9h4v12H5zm7-5h4v17h-4zm7 8h4v9h-4z" /></svg>
                  SUBNET STATS
                </div>
              </div>

              {/* 3. Community */}
              <div className="flex-1 border-t-[3px] border-[#ffffff] p-8 lg:p-10 flex flex-col relative z-10 border-b lg:border-b-0 border-white/5 hover:bg-white/5 transition-colors">
                <div className="w-[50px] h-[50px] rounded-full bg-[#222] flex items-center justify-center mb-8">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                </div>
                <div className="text-white text-[28px] font-bold mb-4">Community</div>
                <div className="text-[#888] text-[15px] leading-[1.7] mb-8 flex-grow">
                  Join the conversation. Governance proposals, ecosystem updates, and support.
                </div>

                <div className="text-[11px] text-[#777] leading-[1.8] mb-8">
                  <div><span className="text-white">#</span> announcements</div>
                  <div><span className="text-white">#</span> governance</div>
                </div>

                <button className="w-full bg-white hover:bg-gray-200 text-black font-bold text-[11px] uppercase py-4 px-4 rounded-[4px] transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  JOIN DISCORD
                </button>

                <div className="text-[#888] text-[11px] uppercase hover:text-white cursor-pointer transition-colors flex items-center justify-center text-center">
                  FOLLOW US
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="roadmap" className="w-full relative z-10 my-24 md:my-32 px-6">
          <div className="surface-glass-strong p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative max-w-[1100px] mx-auto w-full overflow-hidden">

            <div className="w-full max-w-[1020px] mx-auto mb-4">
              <h2 className="text-4xl md:text-5xl md: font-semibold mb-8 text-metallic-premium drop-shadow-2xl uppercase">
                Roadmap to Scale.
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
                  <div className="text-white text-[22px] font-bold mb-6">{roadmap[0].phase}</div>

                  <div className="inline-flex items-center gap-2 border border-[#cccccc]/30 bg-[#cccccc]/10 rounded-[4px] px-3 py-1.5 mb-8 text-[#cccccc] text-[10px] font-bold">
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
                            <div className="text-[#dedede] text-[14px] font-semibold mb-1">{title}</div>
                            <div className="text-[#666] text-[12px] leading-relaxed">{desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="relative border-t-[1.5px] border-[#cccccc] bg-gradient-to-br from-[#cccccc]/[0.05] to-transparent bg-black/20 backdrop-blur-md shadow-inner border-x border-b border-x-white/5 border-b-white/5 hover:bg-white/[0.02] transition-colors p-6 md:p-8 rounded-b-[8px]">
                  <div className="text-white text-[22px] font-bold mb-6">{roadmap[1].phase}</div>

                  <div className="inline-flex items-center gap-2 border border-[#cccccc]/30 bg-[#cccccc]/10 rounded-[4px] px-3 py-1.5 mb-8 text-[#cccccc] text-[10px] font-bold">
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
                            <div className="text-[#dedede] text-[14px] font-semibold mb-1">{title}</div>
                            <div className="text-[#666] text-[12px] leading-relaxed">{desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Phase 3+ */}
                <div className="relative border-t-[1.5px] border-[#ffffff] bg-gradient-to-br from-[#ffffff]/[0.05] to-transparent bg-black/20 backdrop-blur-md shadow-inner border-x border-b border-x-white/5 border-b-white/5 hover:bg-white/[0.02] transition-colors p-6 md:p-8 rounded-b-[8px]">
                  <div className="text-white text-[22px] font-bold mb-6">{roadmap[2].phase}</div>

                  <div className="inline-flex items-center gap-2 border border-[#ffffff]/30 bg-[#ffffff]/10 rounded-[4px] px-3 py-1.5 mb-8 text-[#ffffff] text-[10px] font-bold">
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
                            <div className="text-[#dedede] text-[14px] font-semibold mb-1">{title}</div>
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

        {/* FOOTER CTA */}
        <section className="pt-24 pb-16 flex flex-col items-center text-center px-4 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-10 bg-black/60 backdrop-blur-md shadow-2xl">
            <div className="w-6 h-6 rounded-full bg-white animate-spin shadow-[0_0_15px_rgba(255,255,255,0.8)]" style={{ animationDuration: '4s' }} />
          </div>
          <h2 className="text-6xl font-semibold mb-8 text-metallic-premium drop-shadow-2xl">JOIN THE NETWORK.</h2>
          <p className="text-xl text-gray-100 font-medium mb-12 max-w-2xl leading-relaxed text-shadow-strong">
            The relay layer of Web3 is being built right now. <br />The question is whether you&apos;re building it.
          </p>
          <div className="flex gap-4 mb-24">
            <button className="px-10 py-4 bg-white text-black font-bold text-base rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 duration-200">Launch App</button>
          </div>

          <div className="flex flex-wrap justify-center gap-10 text-[13px] text-gray-300 font-semibold w-full border-t border-white/20 pt-12 max-w-5xl uppercase drop-shadow-sm">
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
