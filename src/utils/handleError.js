import getCurrentDirectory from "./currentDirectory.js";

export default function handleError(err) {
  const {stdout} = process
  if (err) {
    console.error('Operation failed')
  } else {
    stdout.write('\n')
    getCurrentDirectory()
  }
}
