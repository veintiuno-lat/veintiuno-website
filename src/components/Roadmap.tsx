import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check, Clock3, Hash, Pickaxe } from "lucide-react";
import { events, type TimelineEvent } from "@/data/events";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const MONTHS_ES: Record<string, string> = {
  January: "Enero",
  February: "Febrero",
  March: "Marzo",
  April: "Abril",
  May: "Mayo",
  June: "Junio",
  July: "Julio",
  August: "Agosto",
  September: "Septiembre",
  October: "Octubre",
  November: "Noviembre",
  December: "Diciembre",
};

type Status = "confirmed" | "mining" | "mempool";

const statusOf = (b: TimelineEvent): Status =>
  b.isChecked ? "confirmed" : b.events.some((e) => e.isChecked) ? "mining" : "mempool";

/** Deterministic "block hash" (leading zeros = proof of work, just for the look). */
function blockHash(seed: string) {
  let h1 = 0x811c9dc5;
  let h2 = 0x1b873593;
  for (const ch of seed) {
    h1 = Math.imul(h1 ^ ch.charCodeAt(0), 16777619);
    h2 = Math.imul(h2 ^ ch.charCodeAt(0), 2246822507);
  }
  const hex = ((h1 >>> 0).toString(16) + (h2 >>> 0).toString(16)).padStart(16, "0");
  return `00000000${hex.slice(0, 4)}…${hex.slice(-6)}`;
}

const totalTx = events.reduce((n, b) => n + b.events.length, 0);
const doneTx = events.reduce((n, b) => n + b.events.filter((e) => e.isChecked).length, 0);
const confirmedBlocks = events.filter((b) => statusOf(b) === "confirmed").length;

function Block({ block, index }: { block: TimelineEvent; index: number }) {
  const reduce = useReducedMotion();
  const status = statusOf(block);
  const left = index % 2 === 0;
  // Confirmations = confirmed blocks mined on top of this one, plus itself.
  const confirmations = status === "confirmed" ? confirmedBlocks - index : 0;
  const done = block.events.filter((e) => e.isChecked).length;
  const prevHash = index > 0 ? blockHash(`${events[index - 1].month}${events[index - 1].year}`) : "0".repeat(8) + "…genesis";

  return (
    <li className='relative grid grid-cols-[2.5rem_1fr] gap-4 lg:grid-cols-[1fr_4rem_1fr] lg:gap-0'>
      {/* Spine node */}
      <div className='relative flex justify-center lg:col-start-2 lg:row-start-1'>
        <motion.div
          initial={reduce ? false : { scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
          transition={{ duration: 0.6, ease }}
          className={cn(
            "relative z-10 mt-7 h-5 w-5 rounded-[4px] border-2",
            status === "confirmed" && "border-bitcoin bg-bitcoin shadow-[0_0_20px_4px_rgba(247,147,26,0.55)]",
            status === "mining" && "border-bitcoin bg-ink-950",
            status === "mempool" && "border-dashed border-white/25 bg-ink-950"
          )}
        >
          {status === "mining" && <span className='absolute inset-0 animate-ping rounded-[3px] bg-bitcoin/60' />}
        </motion.div>
      </div>

      {/* Block card */}
      <motion.article
        initial={reduce ? false : { opacity: 0, x: left ? -40 : 40, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
        className={cn(
          "group relative mb-10 overflow-hidden rounded-3xl border bg-gradient-to-b from-white/[0.06] to-white/[0.015] transition-colors duration-500 lg:mb-16",
          left ? "lg:col-start-1 lg:row-start-1 lg:mr-2" : "lg:col-start-3 lg:row-start-1 lg:ml-2",
          status === "confirmed" && "border-white/[0.08] hover:border-bitcoin/40",
          status === "mining" && "border-bitcoin/50 shadow-glow",
          status === "mempool" && "border-dashed border-white/15"
        )}
      >
        {/* Block header: height, hash */}
        <header className='flex items-center justify-between gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3 font-mono text-[11px] text-gray-500'>
          <span className='flex items-center gap-1.5'>
            <Hash className='h-3.5 w-3.5 text-bitcoin' />
            Bloque <span className='text-gray-300'>{String(index + 1).padStart(3, "0")}</span>
          </span>
          <span className='truncate' title='hash del bloque'>
            {blockHash(`${block.month}${block.year}`)}
          </span>
        </header>

        <div className='p-5 md:p-6'>
          <div className='flex flex-wrap items-end justify-between gap-3'>
            <div>
              <div className='text-xs font-semibold uppercase tracking-[0.2em] text-bitcoin'>
                {block.periodType}
                {block.periodNumber} · {block.year}
              </div>
              <h3 className='display mt-1 text-4xl text-white md:text-5xl'>{MONTHS_ES[block.month] ?? block.month}</h3>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                status === "confirmed" && "bg-bitcoin/15 text-bitcoin",
                status === "mining" && "bg-bitcoin text-ink-950",
                status === "mempool" && "bg-white/5 text-gray-400"
              )}
            >
              {status === "confirmed" && (
                <>
                  <Check className='h-3.5 w-3.5' /> {confirmations} {confirmations === 1 ? "confirmación" : "confirmaciones"}
                </>
              )}
              {status === "mining" && (
                <>
                  <Pickaxe className='h-3.5 w-3.5' /> Minando
                </>
              )}
              {status === "mempool" && (
                <>
                  <Clock3 className='h-3.5 w-3.5' /> En mempool
                </>
              )}
            </span>
          </div>

          {/* Milestones as transactions */}
          <ul className='mt-5 space-y-2'>
            {block.events.map((e, i) => (
              <motion.li
                key={e.title}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm",
                  e.isChecked ? "border-white/[0.06] bg-white/[0.03] text-gray-200" : "border-dashed border-white/10 text-gray-500"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    e.isChecked ? "bg-bitcoin text-ink-950" : "border border-dashed border-white/25"
                  )}
                >
                  {e.isChecked && <Check className='h-3 w-3' strokeWidth={3} />}
                </span>
                <span className='flex-1'>{e.title}</span>
                <span className='hidden font-mono text-[10px] text-gray-600 sm:inline'>tx {i + 1}</span>
              </motion.li>
            ))}
          </ul>

          <footer className='mt-5 flex items-center justify-between gap-3 font-mono text-[10px] text-gray-600'>
            <span className='truncate'>prev: {prevHash}</span>
            <span className='shrink-0'>
              {done}/{block.events.length} tx
            </span>
          </footer>
        </div>
      </motion.article>
    </li>
  );
}

/**
 * Roadmap as a blockchain: each month is a block, each milestone a transaction.
 * The chain (spine) draws itself as you scroll; finished blocks are "confirmed".
 */
export default function Roadmap() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]), { stiffness: 120, damping: 30 });
  const pct = Math.round((doneTx / totalTx) * 100);

  return (
    <div className='mx-auto max-w-6xl px-5 md:px-8'>
      {/* Chain summary */}
      <div className='mx-auto mb-16 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10'>
        {[
          { v: events.length, l: "Bloques" },
          { v: `${doneTx}/${totalTx}`, l: "Hitos" },
          { v: `${pct}%`, l: "Confirmado" },
        ].map((s) => (
          <div key={s.l} className='bg-ink-900 px-4 py-4 text-center'>
            <div className='font-display text-3xl text-white md:text-4xl'>{s.v}</div>
            <div className='mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-500 md:text-[11px]'>{s.l}</div>
          </div>
        ))}
        <div className='col-span-3 h-1 bg-ink-900'>
          <motion.div
            className='h-full origin-left bg-gradient-to-r from-bitcoin via-glow to-gold-500'
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: doneTx / totalTx }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
          />
        </div>
      </div>

      <ol ref={ref} className='relative'>
        {/* Spine: faint track + scroll-drawn orange chain */}
        <div aria-hidden='true' className='absolute bottom-10 left-5 top-0 w-px -translate-x-1/2 bg-white/10 lg:left-1/2' />
        <motion.div
          aria-hidden='true'
          style={{ scaleY: fill }}
          className='absolute bottom-10 left-5 top-0 w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-bitcoin via-glow to-bitcoin shadow-[0_0_12px_rgba(247,147,26,0.7)] lg:left-1/2'
        />
        {events.map((block, i) => (
          <Block key={`${block.month}-${block.year}`} block={block} index={i} />
        ))}
        {/* Chain tip */}
        <li className='relative grid grid-cols-[2.5rem_1fr] gap-4 lg:grid-cols-[1fr_4rem_1fr] lg:gap-0'>
          <div className='flex justify-center lg:col-start-2'>
            <span className='relative flex h-4 w-4'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-bitcoin/60' />
              <span className='relative inline-flex h-4 w-4 rounded-full border-2 border-bitcoin bg-ink-950' />
            </span>
          </div>
          <p className='pb-2 text-sm text-gray-400 lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:mt-4 lg:text-center'>
            Próximo bloque en construcción — la cruzada sigue.
          </p>
        </li>
      </ol>
    </div>
  );
}
