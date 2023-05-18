import React from 'react'
import {Moment} from './Moment'

export interface MomentContext {
  hoveredTimestamp: Moment | null
  clickedTimestamp: Moment | null

  hover(timestamp: Moment | null): void
  click(timestamp: Moment | null): void
}

export const momentContext = React.createContext<MomentContext | null>(null)
