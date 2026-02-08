type CanonicalEvent =
  | CanonicalSwap
  | CanonicalLiquidity

type Base = {
  blockNumber: number
  txIndex: number
  logIndex: number
}

export type CanonicalSwap = Base & {
  type: 'SWAP'
  amount0: bigint
  amount1: bigint
  sqrtPriceX96: bigint
  tick: bigint
}

export type CanonicalLiquidity = Base & {
  type: 'LIQUIDITY'
  liquidityDelta: bigint
}

export function canonicalizeBlock(rawEvents: any[]): CanonicalEvent[] {

  // assume validator already ran
  // DO NOT re-check duplicates here

  const ordered = [...rawEvents].sort((a, b) =>
    a.blockNumber - b.blockNumber ||
    a.txIndex - b.txIndex ||
    a.logIndex - b.logIndex
  )

  // monotonic invariant (future-proofing)
  for (let i = 1; i < ordered.length; i++) {
    const p = ordered[i - 1]
    const c = ordered[i]

    if (
      p.blockNumber > c.blockNumber ||
      (p.blockNumber === c.blockNumber && p.txIndex > c.txIndex) ||
      (p.txIndex === c.txIndex && p.logIndex > c.logIndex)
    ) {
      throw new Error('NON_MONOTONIC_EVENT_ORDER')
    }
  }

  const out: CanonicalEvent[] = []

  for (const ev of ordered) {

    const base: Base = {
      blockNumber: ev.blockNumber,
      txIndex: ev.txIndex,
      logIndex: ev.logIndex
    }

    switch (ev.type) {

      case 'SWAP': {

        // CONSTRUCT — never spread
        const swap: CanonicalSwap = {
          ...base,
          type: 'SWAP',
          amount0: BigInt(ev.amount0),
          amount1: BigInt(ev.amount1),
          sqrtPriceX96: BigInt(ev.sqrtPriceX96),
          tick: BigInt(ev.tick)
        }

        out.push(swap)
        break
      }

      case 'LIQUIDITY': {

        const delta =
          ev.action === 'ADD'
            ? BigInt(ev.liquidity)
            : -BigInt(ev.liquidity)

        const liq: CanonicalLiquidity = {
          ...base,
          type: 'LIQUIDITY',
          liquidityDelta: delta
        }

        out.push(liq)
        break
      }

      default:
        // should be unreachable if validator works
        throw new Error('UNREACHABLE_EVENT_TYPE')
    }
  }

  return out
}
