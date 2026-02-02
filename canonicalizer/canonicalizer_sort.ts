export interface RawLogRef {
  blockNumber: bigint
  txIndex: number
  logIndex: number
}

export function canonicalSort<T extends RawLogRef>(events: T[]): T[] {
  return [...events].sort((a, b) => {
    if (a.blockNumber !== b.blockNumber)
      return a.blockNumber < b.blockNumber ? -1 : 1

    if (a.txIndex !== b.txIndex)
      return a.txIndex - b.txIndex

    return a.logIndex - b.logIndex
  })
}
