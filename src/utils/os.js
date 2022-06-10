import {cpus, EOL, userInfo} from 'os';
import getCurrentDirectory from './currentDirectory.js'

const osUtil = async ([param]) => {
  const {arch} = process
  try {
    if (!param) {
      throw new Error(`parameter is not specified`)
    }

    const {username, homedir} = userInfo()
    const cpusInfo = cpus().map(({model, speed}) => ({model, speed}))

    const osInfo = {
      '--EOL': JSON.stringify(EOL),
      '--cpus': cpusInfo,
      '--homedir': homedir,
      '--username': username,
      '--architecture': arch
    }

    if (!osInfo[param]) {
      throw new Error(`parameter is not specified`)
    }

    console.table(osInfo[param])
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed')
  }
};

export default osUtil;
