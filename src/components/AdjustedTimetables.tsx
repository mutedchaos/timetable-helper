import {useMemo} from 'react'
import {TwentyFourHourTimetable} from './TwentyFourHourTimetable'
import {Moment} from '../Moment'

interface Props {
  firstPossibleDeparture?: string
  departure1: string | Moment
  departure2: string | Moment
  numberOfAdditionalTrains: number
}

export const AdjustedTimetables: React.FC<Props> = ({
  departure1,
  departure2,
  numberOfAdditionalTrains,
  firstPossibleDeparture,
}) => {
  const data = useMemo(
    () =>
      Array(numberOfAdditionalTrains)
        .fill(null)
        .map((_, index) => {
          const moment1 = new Moment(departure1)
          const moment2 = new Moment(departure2)
          const duration = moment1.timeUntil(moment2)
          const offset = Math.round((duration / (numberOfAdditionalTrains + 1)) * (index + 1))
          return {
            number: index + 1,
            departure1: moment1.offset(offset),
            departure2: moment2.offset(offset),
            offset: new Moment(offset),
            negativeOffset: new Moment(duration - offset),
          }
        }),
    [departure1, departure2, numberOfAdditionalTrains]
  )
  return (
    <div className="flex">
      {data.map((entry) => (
        <div key={entry.number} className="mx-2">
          <h3>Train {entry.number}</h3>
          <p>Offset: {entry.offset.toString()}</p>
          <p className="text-sm">or -{entry.negativeOffset.toString()}</p>
          <hr />
          <TwentyFourHourTimetable
            departure1={entry.departure1}
            departure2={entry.departure2}
            firstPossibleDeparture={firstPossibleDeparture}
          />
        </div>
      ))}
    </div>
  )
}
