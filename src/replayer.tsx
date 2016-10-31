import * as React from 'react'
import { RecorderSession } from './common'
import { eventFromType } from './util/eventFromType'
import { FakeCursor, Props as FakeCursorProps } from './components/FakeCursor'

interface Props {
  session: RecorderSession
}

interface State {
  cursorClass: string
  x: number
  y: number
}

/**
 * Deplay between replay steps (ms)
 */
const STEP_DELAY = 20

export class Replayer extends React.Component<Props, State> {

  state: State = {
    cursorClass: '',
    x: 0,
    y: 0
  }

  componentDidMount() {
    this.replay(this.props.session)
  }

  async replay(session: RecorderSession) {
    console.info(`Replaying ${session.length} events...`)

    this.setState({ cursorClass: '', x: 0, y: 0 })

    // replay
    return new Promise(resolve => this.step(session, resolve))
  }

  step(session: RecorderSession, resolve: () => void) {

    const s = session[0]

    // update fake cursor position?
    if (s.type === 'mousemove') {
      this.setState({ x: s.x, y: s.y } as State)
    }

    if (s.type === 'click' || s.type === 'mousedown') {
      this.setState({ cursorClass: 'click', x: s.x, y: s.y } as State)
      setTimeout(() => this.setState({ cursorClass: '' } as State), 500)
    }

    const Class = eventFromType(s.type)
    const event = new (Class as any)(s.type, s)
    hydrateTarget(document, s.target).dispatchEvent(event)

    if (session.length === 1) return resolve()

    setTimeout(
      () => this.step(session.slice(1), resolve),
      (session[1].timeStamp - s.timeStamp) + STEP_DELAY
    )
  }

  render() {
    return <FakeCursor className={this.state.cursorClass} x={this.state.x} y={this.state.y} />
  }

}

function hydrateTarget(document: Document, targetDescriptor: string): Element {
  return window
  // return document.querySelector(targetDescriptor)
}
