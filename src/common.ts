export interface RecorderEvent {
  pageX: number
  pageY: number
  target: string
  timeStamp: number
  type: string
  x: number
  y: number
}

export type RecorderSession = RecorderEvent[]
