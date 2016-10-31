import { RecorderSession } from './common'

interface State {
  events: RecorderSession
}

/**
 * TODO: drag events
 * TODO: do we need to dedupe keyup+keypress?
 * @see https://developer.mozilla.org/en-US/docs/Web/Events
 */
const EVENTS = ['keydown', 'keypress', 'keyup', 'mouseenter', 'mouseover', 'mousemove', 'mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu', 'wheel', 'mouseleave', 'mouseout', 'select', 'scroll']

export class Recorder {

  private state: State = {
    events: []
  }

  startRecording(document: Document) {
    EVENTS.forEach(_ => document.body.addEventListener(_, this.logEvent.bind(this)))
  }

  stopRecording(): RecorderSession {
    EVENTS.forEach(_ => document.body.removeEventListener(_, this.logEvent.bind(this)))
    return this.state.events
  }

  private logEvent(e: MouseEvent | WheelEvent) {
    const newEvent = e instanceof WheelEvent
      ? {
        deltaMode: e.deltaMode,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        deltaZ: e.deltaZ
        // detail: e.detail,
        // movementX: e.movementX,
        // movementY: e.movementY,
        // wheelDelta: e.wheelDelta,
        // wheelDeltaX: e.wheelDeltaX,
        // wheelDeltaY: e.wheelDeltaY
      } : {}
    this.state.events = this.state.events.concat(Object.assign(newEvent, {
      clientX: e.clientX,
      clientY: e.clientY,
      layerX: e.layerX,
      layerY: e.layerY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      pageX: e.pageX,
      pageY: e.pageY,
      screenX: e.screenX,
      screenY: e.screenY,
      target: 'body', // TODO: xpath
      timeStamp: e.timeStamp,
      type: e.type,
      which: e.which,
      x: e.x,
      y: e.y
    }))
  }

}
