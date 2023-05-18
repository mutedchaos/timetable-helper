import {useContext, useMemo} from 'react'
import {Moment} from './Moment'
import {momentContext} from './momentContext'

interface Props {
  children: Moment
  previous?: Moment
  next?: Moment
}

export const MomentComponent: React.FC<Props> = ({children, previous, next}) => {
  const mc = useContext(momentContext)
  if (!mc) throw new Error('No moment context')
  const {hover, click, hoveredTimestamp, clickedTimestamp} = mc
  const referenceTimestamp = clickedTimestamp ?? hoveredTimestamp
  const veryRelevant = useMemo(() => {
    if (!referenceTimestamp) return false
    if (previous && previous.isBefore(referenceTimestamp) && children.isAfter(referenceTimestamp)) return 'a'
    if (next && next.isAfter(referenceTimestamp) && children.isBefore(referenceTimestamp)) return 'b'

    return false
  }, [children, next, previous, referenceTimestamp])
  return (
    <span
      className={[
        clickedTimestamp && children.equals(clickedTimestamp) ? 'font-bold' : '',
        ...(veryRelevant
          ? [veryRelevant === 'a' ? 'text-blue-600' : 'text-green-600']
          : [
              referenceTimestamp && children.isBefore(referenceTimestamp) ? 'text-gray-400' : '',
              referenceTimestamp && referenceTimestamp.isBefore(children) ? 'text-gray-300' : '',
            ]),
      ].join(' ')}
      onClick={() => (clickedTimestamp && children.equals(clickedTimestamp) ? click(null) : click(children))}
      onMouseEnter={() => hover(children)}
      onMouseLeave={() => hover(null)}
    >
      {children.toString()}
    </span>
  )
}
