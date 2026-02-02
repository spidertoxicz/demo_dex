export type RawBlockFrame = {
  blockNumber: number
  blockHash: string
  parentHash: string
  timestamp: number
  logs: any[]
  receipts?: any[]
  poolStateSnapshots: any[]
  valid: boolean
}

export type ReorgEvent = {
  depth: number
  affectedBlocks: number[]
}
