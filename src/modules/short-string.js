import { cryptography } from '@liskhq/lisk-client';


export function shortString (string) {
  if (string.length <= 18) return string
  const symbolsLeft = 6
  const substr = string.substr(symbolsLeft, (string.length - symbolsLeft*2))
  return string.replace(substr, ' *** *** ')
}


export function getAccountFromKey (key) {
  const keyToBuffer = cryptography.hexToBuffer(key)
  const addressFromPublicKey = cryptography.getAddressFromPublicKey(keyToBuffer)
  const hexAddress = cryptography.bufferToHex(addressFromPublicKey)
  return hexAddress
}