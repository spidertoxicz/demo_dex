import { AnkrClient } from "./ankr_client"

export class AnkrPoller {
  constructor(private readonly client: AnkrClient) {}

  async pollBlock(blockNumber: number) {
    return this.client.getBlockByNumber(blockNumber)
  }
}
