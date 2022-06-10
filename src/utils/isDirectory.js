import {resolve} from 'path'
import {stat} from 'fs/promises'

export default async function isDirectory(path) {
  try {
    path = resolve(path)
    const stats = await stat(path)
    return stats.isDirectory
  } catch (e) {
    return false
  }
}
