import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { RecorderSession } from './common'
import { Recorder } from './recorder'
import { Replayer } from './replayer'

function renderContainer(container: Element) {
  const div = document.createElement('div')
  div.style.position = 'fixed'
  div.style.left = '0'
  div.style.right = '0'
  div.style.top = '0'
  div.style.bottom = '0'
  div.style.pointerEvents = 'none'
  container.appendChild(div)
  return div
}

interface State {
  recorder: Recorder
}

const state: State = {
  recorder: new Recorder
};

(window as any).recordBrowser = {
  startRecording: () => state.recorder.startRecording(document),
  stopRecording: () => state.recorder.stopRecording(),
  replay: (session: RecorderSession) => {
    const container = renderContainer(document.body)
    render(<Replayer session={session} />, container)
    // unmountComponentAtNode(container)
    // document.body.removeChild(container)
  }
}
