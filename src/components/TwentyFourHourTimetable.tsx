import {useMemo} from 'react'
import {Moment} from '../Moment'
import {MomentComponent} from '../MomentComponent'

interface Props {
  firstPossibleDeparture?: string
  departure1: string | Moment
  departure2: string | Moment
}

export const TwentyFourHourTimetable: React.FC<Props> = ({departure1, departure2, firstPossibleDeparture}) => {
  const departures = useMemo(() => {
    const firstPossibleMoment = new Moment(firstPossibleDeparture ?? '040000')
    const moment1 = new Moment(departure1)
    const moment2 = new Moment(departure2)
    const duration = moment1.timeUntil(moment2)

    if (duration <= 0) return []

    return [
      ...Array.from(moment1.rangeFrom(firstPossibleMoment, duration)).reverse(),
      ...moment2.rangeUntil(firstPossibleMoment.nextDay(), duration),
    ]
  }, [departure1, departure2, firstPossibleDeparture])

  return (
    <ol>
      {departures.map((departure, i) => (
        <li key={departure.toString()}>
          <MomentComponent previous={departures[i - 1]} next={departures[i + 1]}>
            {departure}
          </MomentComponent>
        </li>
      ))}
    </ol>
  )
}
