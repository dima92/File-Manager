import {createBrotliDecompress} from 'zlib'
import {createReadStream, createWriteStream} from "fs"
import {parse, resolve} from 'path'
import {pipeline} from 'stream/promises'
import getCurrentDirectory from './currentDirectory.js'
import isDirectory from './isDirectory.js'
import isFile from './isFile.js'

const decompress = async ([pathToFile, pathToDestination]) => {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination))
    const isNotFile = !(await isFile(pathToFile))

    if (isNotDirectory) throw new Error("it's not a directory")
    if (isNotFile) throw new Error("it's not a file")

    pathToFile = resolve(pathToFile)
    const {name, ext} = parse(pathToFile)

    if (!ext.includes('.br')) throw new Error('Invalid file extension')

    pathToDestination = resolve(pathToDestination, name)

    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(pathToDestination);
    const brotliDecompress = createBrotliDecompress()
    await pipeline(rs, brotliDecompress, ws)
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed');
  }
};

export default decompress;
