import { crayon } from 'https://deno.land/x/crayon@3.3.2/mod.ts'
import {
  Canvas,
  Tui,
} from 'https://deno.land/x/tui@1.3.4/mod.ts'
import {
  FrameComponent,
  LabelComponent,
  ScrollableViewComponent
} from 'https://deno.land/x/tui@1.3.4/src/components/mod.ts'

import todos from './todos.json' assert { type: 'json' }

export class LeftPane {
  private scrollableView: ScrollableViewComponent
  private todoLabels: Array<LabelComponent>
  private highlightedTodoIndex = 0

  constructor({ canvas, tui }: { canvas: Canvas, tui: Tui }) {
    this.highlightedTodoIndex = 0

    this.scrollableView = new ScrollableViewComponent({
      tui,
      rectangle: {
        column: 0,
        row: 0,
        width: canvas.size.columns / 3,
        height: 20
      }
    })

    new FrameComponent({
      tui,
      rectangle: {
        column: 0,
        row: 0,
        width: canvas.size.columns / 3,
        height: canvas.size.rows
      },
    })

    this.todoLabels = todos.map(({ title }, i) => {
      const label = new LabelComponent({
        tui,
        rectangle: {
          column: 1,
          row: i + 1,
          width: -1,
          height: 10
        },
        theme: {
          base: crayon.white,
          focused: crayon.lightWhite
        },
        align: { horizontal: 'left', vertical: 'top' },
        value: title,
        view: this.scrollableView,
      })
      if(i == this.highlightedTodoIndex) label.state = 'focused'
      else label.state = 'base'

      return label
    })

    tui.on('keyPress', (x) => {
      // TODO: focus next todo in scrollable pane
      switch(x.key) {
        case 'j':
          this.highlightNextTodo();
          break
        case 'k':
          this.highlightPrevTodo();
          break
      }
    })
  }

  private highlightNextTodo() {
    if(this.highlightedTodoIndex == todos.length - 1)
    return

    this.todoLabels[this.highlightedTodoIndex].state = 'base'
    this.todoLabels[this.highlightedTodoIndex + 1].state = 'focused'
    this.highlightedTodoIndex++
  }
  private highlightPrevTodo() {
    if(this.highlightedTodoIndex == 0)
    return

    this.todoLabels[this.highlightedTodoIndex].state = 'base'
    this.todoLabels[this.highlightedTodoIndex - 1].state = 'focused'
    this.highlightedTodoIndex--
  }

  getHighlightedTodo() {
    return todos[this.highlightedTodoIndex]
  }
}
