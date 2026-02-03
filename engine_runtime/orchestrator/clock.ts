export class DeterministicClock {
  private current: number

  constructor(startTimestamp: number) {
    this.current = startTimestamp
  }

  now(): number {
    return this.current
  }

  tick(deltaMs: number) {
    this.current += deltaMs
  }
}
