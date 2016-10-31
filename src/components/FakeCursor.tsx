import * as React from 'react'

export interface Props {
  className?: string
  x: number
  y: number
}

export const FakeCursor: React.StatelessComponent<Props> = ({className, x, y}) =>
  <div className={`FakeCursor effect-radomir ${className}`} style={{ left: x, top: y }} />
