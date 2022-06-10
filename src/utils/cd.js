import getCurrentDirectory from './currentDirectory.js'

export default async ([pathToDirectory]) => {
  const {chdir} = process
  try {
    chdir(pathToDirectory)
    getCurrentDirectory()
  } catch
    (err) {
    console.error('Operation failed');
  }
}
