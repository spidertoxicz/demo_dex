import { AnkrPoller } from "../ankr/ankr_poller"
import { buildRawBlockFrame } from "./raw_block_frame"
import { validateRawBlock } from "./raw_validator"
import { detectReorg } from "../reorg/reorg_detector"
import { RawBlockFrame } from "../types/raw_types"

export class RawCapture {
  private lastBlock: RawBlockFrame | null = null

  constructor(private readonly poller: AnkrPoller) {}

  async capture(blockNumber: number): Promise<RawBlockFrame | null> {
    const raw = await this.poller.pollBlock(blockNumber)
    if (!raw) return null

    let frame = buildRawBlockFrame(raw)
    frame = validateRawBlock(frame)

    if (!frame.valid) return frame

    const reorg = detectReorg(this.lastBlock, frame)
    if (reorg) {
      throw {
        type: "REORG_EVENT",
        payload: reorg
      }
    }

    this.lastBlock = frame
    return frame
  }
}
