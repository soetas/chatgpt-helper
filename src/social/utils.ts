import { createHash } from 'node:crypto'

export function sort() {}

export function encrypt(source:string, algorithm:'sha1'='sha1') {
  return createHash(algorithm).update(source).digest('hex')
}
