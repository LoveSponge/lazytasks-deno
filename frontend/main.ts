import {
  Canvas,
  Tui,
  handleKeyboardControls,
  handleKeypresses,
  handleMouseControls
} from 'https://deno.land/x/tui@1.3.4/mod.ts'
import { LeftPane } from './LeftPane.ts'
import { RightPane } from './RightPane.ts'

export const canvas = new Canvas({
  refreshRate: 1000 / 60, // Run in 60FPS
  stdout: Deno.stdout,
})

export const tui = new Tui({
  /* style: crayon.bgBlue, */
  canvas
})

tui.dispatch() // Close Tui on CTRL+C
handleKeypresses(tui)
handleMouseControls(tui)
handleKeyboardControls(tui)

const leftPane = new LeftPane({
  canvas,
  tui
})
const rightPane = new RightPane({
  canvas,
  tui,
  highlightedTodo: leftPane.getHighlightedTodo()
  /* highlightedTodo */
})

tui.run()

tui.on('update', () => {
  const highlightedTodo = leftPane.getHighlightedTodo()
  rightPane.updateDescription(highlightedTodo)
})
