import {
  Canvas,
  Tui,
} from 'https://deno.land/x/tui@1.3.4/mod.ts'
import {
  FrameComponent,
  LabelComponent
} from 'https://deno.land/x/tui@1.3.4/src/components/mod.ts'

type Todo = {
  title: string,
  description: string
}

interface IRightPane {
  canvas: Canvas
  tui: Tui
  highlightedTodo: Todo
}
export class RightPane {
  private tui: Tui
  private canvas: Canvas
  private highlightedTodo: Todo = { title: '', description: '' }
  private descriptionLabel: LabelComponent
  constructor({
    canvas,
    tui,
    highlightedTodo
  }: IRightPane) {
    this.tui = tui
    this.canvas = canvas
    this.descriptionLabel = this.updateDescription(highlightedTodo)

    new FrameComponent({
      tui,
      rectangle: {
        column: canvas.size.columns / 3,
        row: 0,
        width: canvas.size.columns - ( canvas.size.columns / 3 ),
        height: canvas.size.rows
      }
    })

  }

  updateDescription(highlightedTodo: Todo) {
    this.highlightedTodo = highlightedTodo
    this.descriptionLabel = new LabelComponent({
      tui: this.tui,
      rectangle: {
        column: ( this.canvas.size.columns / 3 ) + 10,
        row: 1,
        width: -1,
        height: 1
      },
      align: { horizontal: 'left', vertical: 'top' },
      value: highlightedTodo.description
    })
    return this.descriptionLabel
  }
}

