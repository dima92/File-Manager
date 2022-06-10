import {stdin as input, stdout as output, argv, chdir, exit} from 'process';
import {homedir} from 'os';
import {createInterface} from "readline";
import EventEmitter from "events";

import getCurrentDirectory from './utils/currentDirectory.js'

import lineHandler from './utils/lineHandler.js'
import {cp, add, cat, rn, mv, up, remove} from './utils/fo.js'
import osUtil from './utils/os.js'
import ls from "./utils/ls.js";
import cd from "./utils/cd.js";
import hash from "./utils/hash.js";
import compress from "./utils/compress.js";
import decompress from "./utils/decompress.js";

chdir(homedir())

const args = Object
  .fromEntries(argv
    .slice(2)
    .map((arg) => {
      const [key, value] = arg.split('=')
      return [key.slice(2), value]
    }))

console.log(`Welcome to the File Manager, ${args.username}!`)
getCurrentDirectory()

const eventEmitter = new EventEmitter()
eventEmitter
  .on('up', up)
  .on('cd', cd)
  .on('ls', ls)
  .on('cat', cat)
  .on('add', add)
  .on('rn', rn)
  .on('cp', cp)
  .on('mv', mv)
  .on('rm', remove)
  .on('hash', hash)
  .on('os', osUtil)
  .on('compress', compress)
  .on('decompress', decompress)

const rl = createInterface({
  input, output
})

rl.on('line', lineHandler.bind(rl, eventEmitter))
  .on('SIGINT', () => rl.close())
  .on('close', () => {
    console.log(`Thank you for using File Manager, ${args.username}!`)
    setTimeout(() => exit(0), 100)
  })
