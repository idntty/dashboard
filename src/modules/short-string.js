export function shortString (string) {
  const symbolsLeft = 6
  const substr = string.substr(symbolsLeft, (string.length - symbolsLeft*2))
  return string.replace(substr, ' *** *** ')
}
