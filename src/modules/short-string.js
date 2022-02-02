import hashJs from 'hash.js'

export function shortString (string) {
  if (string.length <= 18) return string
  const symbolsLeft = 6
  const substr = string.substr(symbolsLeft, (string.length - symbolsLeft*2))
  return string.replace(substr, ' *** *** ')
}


export function getAccountFromKey (string) {
  const pkBuf = Buffer.from(string, 'hex')
  const hash = hashJs.sha256().update(pkBuf).digest('hex')
  return hash.slice(0, 40)
}