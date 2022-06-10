import {createBrotliCompress} from 'zlib'
import {createReadStream, createWriteStream} from "fs"
import {parse, resolve} from 'path'
import {pipeline} from 'stream/promises'
import getCurrentDirectory from './currentDirectory.js'
import isDirectory from './isDirectory.js'
import isFile from './isFile.js'

const compress = async ([pathToFile, pathToDestination]) => {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination))
    const isNotFile = !(await isFile(pathToFile))

    if (isNotDirectory) throw new Error("it's not a directory")
    if (isNotFile) throw new Error("it's not a file")

    pathToFile = resolve(pathToFile)
    const {base} = parse(pathToFile)
    const filename = `${base}.br`
    pathToDestination = resolve(pathToDestination, filename)

    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(pathToDestination);
    const brotliCompress = createBrotliCompress()
    await pipeline(rs, brotliCompress, ws)
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed');
  }
};

export default compress;
