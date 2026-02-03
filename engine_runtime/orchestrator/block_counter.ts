export class BlockCounter {
  private block: number

  constructor(genesisBlock: number) {
    this.block = genesisBlock
  }

  next(): number {
    this.block += 1
    return this.block
  }

  current(): number {
    return this.block
  }
}
