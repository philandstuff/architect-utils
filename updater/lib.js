let restore = require('restore-cursor')
let out = process.stdout
let printer = {
  // Clears the line so we can overwrite it
  clear: () => out.clearLine(),
  // Resets cursor position
  reset: x => out.cursorTo(x ? x : 0),
  // Write to console, add single extra line to buffer while running
  restoreCursor: () => restore(),
  write: t => out.write(t + '\n' + '\033[1A')
}
printer.hideCursor = () => printer.write('\u001B[?25l')

let isWin = process.platform.startsWith('win')
let windows = '| / – \\ | / – \\'.split(' ')
let unix = '⊙ ⦾ ⦿ ⦿ ⦿ ⦾ ⊙ ⊙ ⊙ ⊙'.split(' ')
let frames = isWin
  ? windows
  : unix
let timing = isWin
  ? 125
  : 100
let spinner = {frames, timing}

module.exports = {
  printer,
  spinner
}
