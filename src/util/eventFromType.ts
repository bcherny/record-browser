type SupportedEvent = typeof KeyboardEvent | typeof MouseEvent | typeof WheelEvent

const typeToConstructor: { [eventType: string]: SupportedEvent } = {
  keydown: KeyboardEvent,
  keypress: KeyboardEvent,
  keyup: KeyboardEvent,
  mouseenter: MouseEvent,
  mouseover: MouseEvent,
  mousemove: MouseEvent,
  mousedown: MouseEvent,
  mouseup: MouseEvent,
  click: MouseEvent,
  dblclick: MouseEvent,
  contextmenu: MouseEvent,
  wheel: WheelEvent,
  mouseleave: MouseEvent,
  mouseout: MouseEvent,
  select: MouseEvent
}

export function eventFromType(eventType: string): SupportedEvent {
  const c = typeToConstructor[eventType]
  if (c) return c
  throw new Error(`unsupported event type: "${eventType}"`)
}
