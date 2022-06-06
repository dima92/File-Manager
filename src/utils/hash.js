import {createHash} from 'crypto'
import {createReadStream} from 'fs'
import {access} from 'fs/promises'

async function calcHash(pathToFile) {
  try {
    await access(pathToFile)
    const fd = createReadStream(pathToFile)
    const hash = createHash('sha256')
    fd.on('readable', () => {
      const data = fd.read()
      if (data) {
        hash.update(data)
      } else {
        console.log(hash.digest('hex'))
      }
    })
  } catch {
    console.log('Operation failed')
  }
}

export default calcHash()
