import { RawBlockFrame } from "../types/raw_types"

const REQUIRED_EVENTS = [
  "Swap",
  "Mint",
  "Burn",
  "Collect",
  "TickCross",
  "Sync",
  "Slot0",
  "Liquidity"
]

export function validateRawBlock(frame: RawBlockFrame): RawBlockFrame {
  const eventTypes = frame.logs.map(l => l.event)

  for (const evt of REQUIRED_EVENTS) {
    if (!eventTypes.includes(evt)) {
      return { ...frame, valid: false }
    }
  }

  return frame
}
