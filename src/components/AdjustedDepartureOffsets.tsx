import {useMemo} from 'react'
import {Moment} from '../Moment'

interface Props {
  departure1: string | Moment
  departure2: string | Moment
  numberOfAdditionalTrains: number
  additionalInitialDeparture: string | null
  additionalExampleDeparture: string
}

export const AdjustedDepartureOffsets: React.FC<Props> = ({
  departure1,
  departure2,
  numberOfAdditionalTrains,
  additionalInitialDeparture,
  additionalExampleDeparture,
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
          const newExampleDeparture = moment1.offset(offset)

          const referenceDeparture = new Moment(additionalExampleDeparture)
          const referenceInitialDeparture = new Moment(additionalInitialDeparture ?? additionalExampleDeparture)

          // First, let's adjust referenceDeparture that it's as closely after newExampleDeparture as possible, noting that
          // it can only be adjusted in multiple of duration
          const fullDurationsBetween = Math.ceil(newExampleDeparture.timeUntil(referenceDeparture) / duration)

          const nearestReferenceDeparture = referenceDeparture.offset(-fullDurationsBetween * duration)

          const fixedOffset = nearestReferenceDeparture.timeUntil(newExampleDeparture)
          console.log({
            newExampleDeparture: newExampleDeparture.toString(),
            referenceDeparture: referenceDeparture.toString(),
            nearestReferenceDeparture: nearestReferenceDeparture.toString(),
            fixedOffset: new Moment(fixedOffset).toString(),
            fullDurationsBetween,
          })
          return {
            number: index + 1,
            offset: new Moment(fixedOffset),
            newDeparturePrior: new Moment(referenceInitialDeparture).offset(fixedOffset - duration),
            newDepartureAfter: new Moment(referenceInitialDeparture).offset(fixedOffset),
            negativeOffset: new Moment(duration - fixedOffset),
          }
        }),
    [additionalExampleDeparture, additionalInitialDeparture, departure1, departure2, numberOfAdditionalTrains]
  )
  return (
    <div>
      {data.map((entry) => (
        <div key={entry.number} className="mb-2">
          <div className="my-4 border-b border-slate-300" />
          <h3>As train {entry.number}</h3>
          <div className="mt-2">Positive offset: {entry.offset.toString()}</div>
          <div>Initial departure at {entry.newDepartureAfter.toString()}</div>

          <p className="mt-2">Negative offset: -{entry.negativeOffset.toString()}</p>
          <div>Initial departure at {entry.newDeparturePrior.toString()}</div>
        </div>
      ))}
    </div>
  )
}
