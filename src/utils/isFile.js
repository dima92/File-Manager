import {resolve} from 'path'
import {stat} from 'fs/promises'

export default async function isFile(path) {
  try {
    path = resolve(path)
    const stats = await stat(path)
    return stats.isFile()
  } catch (e) {
    return false
  }
}
