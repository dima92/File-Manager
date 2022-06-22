import {readdir} from 'fs/promises';
import {resolve} from "path";
import getCurrentDirectory from './currentDirectory.js'

const ls = async () => {
  const {cwd} = process
  try {
    const curDirectory = resolve(cwd())
    const files = await readdir(curDirectory)
    console.table(files)
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed')
  }
};

export default ls;
