import fetch from "node-fetch"

export class AnkrClient {
  constructor(
    private readonly endpoint: string,
    private readonly apiKey: string
  ) {}

  async getBlockByNumber(blockNumber: number): Promise<any> {
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [`0x${blockNumber.toString(16)}`, true]
      })
    })

    const json = await res.json()
    return json.result
  }
}
