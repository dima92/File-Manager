export default function getCurrentDirectory() {
  const {cwd} = process
  console.info(`You are currently in ${cwd()}`)
}
