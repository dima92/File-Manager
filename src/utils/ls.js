import {readdir} from 'fs/promises'
import * as path from 'path'

async function ls(dir) {
  const ls = await readdir(path.join(dir))
  console.log(ls)
}

export default ls
