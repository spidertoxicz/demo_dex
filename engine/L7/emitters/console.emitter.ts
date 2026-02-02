import { L7Snapshot } from '../l7.types'

export function emitToConsole(snapshot: L7Snapshot) {
  console.log('[L7 SNAPSHOT]', JSON.stringify(snapshot, null, 2))
}
