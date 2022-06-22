import {createHash} from "crypto"
import {createReadStream} from "fs"
import {resolve} from 'path'
import {finished} from 'stream'
import handleError from "./handleError.js"


const calcHash = async ([pathToFile]) => {
  const {stdout} = process
  try {
    pathToFile = resolve(pathToFile)
    const hash = createHash('sha256')
    const rs = createReadStream(pathToFile)
    rs.pipe(hash).setEncoding('hex').pipe(stdout)
    finished(rs, handleError)
  } catch {
    console.log('Operation failed');
  }
};

export default calcHash;
