import {createReadStream, rename, unlink} from "fs";
import {copyFile} from 'fs/promises'
import {resolve, parse} from "path";
import {finished} from 'stream'
import handleError from './handleError.js'
import isDirectory from './isDirectory.js'
import getCurrentDirectory from './currentDirectory.js'

const {stdout, cwd, chdir} = process

export async function cat([pathToFile]) {
  try {
    pathToFile = resolve(pathToFile)
    const rs = createReadStream(pathToFile, {encoding: 'utf-8'});
    rs.pipe(stdout)
    finished(rs, handleError)
  } catch (e) {
    console.error('Operation failed');
  }
}

export async function add([newFile]) {
  try {
    const pathToFile = resolve(cwd(), newFile)
    const file = await open(pathToFile, 'a')
    await file.close()
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed');
  }
}

export async function rn([pathToFile, newFileName]) {
  try {
    if (/[\/\\]/g.test(newFileName)) throw new Error('invalid new_file_name')

    pathToFile = resolve(pathToFile)
    const {dir} = parse(pathToFile)
    const pathFromFile = resolve(dir, newFileName)
    await rename(pathToFile, pathFromFile)
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed')
  }
}

export async function cp([pathToFile, pathToNewDirectory]) {
  try {
    pathToFile = resolve(pathToFile)
    pathToNewDirectory = resolve(pathToNewDirectory)
    await copyFile(pathToFile, pathToNewDirectory);
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed')
  }
}

export async function remove([pathToFile]) {
  try {
    pathToFile = resolve(pathToFile)
    await unlink(pathToFile)
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed')
  }
}

export async function mv([pathToFile, pathToNewDirectory]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToNewDirectory))

    if (isNotDirectory) throw new Error('invalid path_to_new_directory')

    pathToFile = resolve(pathToFile)
    const {base} = parse(pathToFile)
    pathToNewDirectory = resolve(pathToNewDirectory, base)
    await rename(pathToFile, pathToNewDirectory)
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed')
  }
}

export async function up() {
  try {
    chdir('..')
    getCurrentDirectory()
  } catch (e) {
    console.error('Operation failed')
  }
}
