import React, {useMemo} from 'react'
import {MomentContext, momentContext} from './momentContext'
import {Moment} from './Moment'

export const MomentContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [hoveredTimestamp, setHoveredTimestamp] = React.useState<Moment | null>(null)
  const [clickedTimestamp, setClickedTimestamp] = React.useState<Moment | null>(null)

  const hover = React.useCallback<MomentContext['hover']>((timestamp) => {
    setHoveredTimestamp(timestamp)
  }, [])

  const click = React.useCallback<MomentContext['click']>((timestamp) => {
    setClickedTimestamp(timestamp)
  }, [])

  const value = useMemo<MomentContext>(
    () => ({
      hoveredTimestamp,
      clickedTimestamp,
      hover,
      click,
    }),
    [click, clickedTimestamp, hover, hoveredTimestamp]
  )

  return <momentContext.Provider value={value}>{children}</momentContext.Provider>
}
