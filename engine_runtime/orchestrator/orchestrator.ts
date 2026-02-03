import { DeterministicClock } from "./clock"
import { BlockCounter } from "./block_counter"
import { RuntimeTick } from "./types"

type TickHandler = (tick: RuntimeTick) => void

export class EngineRuntimeOrchestrator {
  private clock: DeterministicClock
  private blocks: BlockCounter
  private handlers: TickHandler[] = []

  constructor(
    engineId: string,
    genesisBlock: number,
    startTimestamp: number,
    private readonly blockIntervalMs: number
  ) {
    this.engineId = engineId
    this.clock = new DeterministicClock(startTimestamp)
    this.blocks = new BlockCounter(genesisBlock)
  }

  readonly engineId: string

  onTick(handler: TickHandler) {
    this.handlers.push(handler)
  }

  step() {
    const blockNumber = this.blocks.next()
    const timestamp = this.clock.now()

    const tick: RuntimeTick = {
      engineId: this.engineId,
      blockNumber,
      timestamp
    }

    for (const h of this.handlers) h(tick)

    this.clock.tick(this.blockIntervalMs)
  }
}
