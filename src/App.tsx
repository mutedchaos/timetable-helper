import {useState} from 'react'
import './App.css'
import {TimeInput} from './components/TimeInput'
import {TwentyFourHourTimetable} from './components/TwentyFourHourTimetable'
import {AdjustedTimetables} from './components/AdjustedTimetables'
import {MomentContextProvider} from './MomentContextProvider'
import {AdjustedDepartureOffsets} from './components/AdjustedDepartureOffsets'

const panelStyles = 'm-2'

function App() {
  const [departure1, setDeparture1] = useState<string | null>('080000')
  const [departure2, setDeparture2] = useState<string | null>('081500')
  const [additionalInitialDeparture, setAdditionalInitialDeparture] = useState<string | null>(null)
  const [additionalExampleDeparture, setAdditionalExampleDeparture] = useState<string | null>('050500')
  const [numberOfAdditionalTrains, setNumberOfAdditionalTrains] = useState<number>(1)

  return (
    <>
      <h1>Timetable helper</h1>
      <div className="flex p-2 bg-slate-200 border border-slate-400">
        <div className={panelStyles}>
          <h2>Dominant schedule</h2>
          <p>Departure 1</p>
          <TimeInput onChange={setDeparture1} value={departure1} />
          <p>Departure 2</p>
          <TimeInput onChange={setDeparture2} value={departure2} />
        </div>
        <div className={panelStyles}>
          <h2>Trains between</h2>
          <p>Number of trains</p>
          <input
            type="number"
            value={numberOfAdditionalTrains}
            onChange={(e) => setNumberOfAdditionalTrains(parseInt(e.target.value))}
          />
        </div>
        <div className={panelStyles}>
          <h2>Additional train adjuster</h2>
          <p>Example departure for full run</p>
          <TimeInput onChange={setAdditionalExampleDeparture} value={additionalExampleDeparture} />
          <p>Initial departure, if not the same</p>
          <TimeInput onChange={setAdditionalInitialDeparture} value={additionalInitialDeparture} allowEmpty />
        </div>
      </div>
      <MomentContextProvider>
        <div>
          <h2>Results</h2>
          <div className="flex">
            <div className={panelStyles}>
              <h2>Timetable over 24h</h2>
              {departure1 && departure2 ? (
                <div className="pt-[60px]">
                  <TwentyFourHourTimetable departure1={departure1} departure2={departure2} />
                </div>
              ) : (
                <p>Not enough data to work with</p>
              )}
            </div>

            <div className={panelStyles}>
              <h2>Adjusted timetables</h2>
              {departure1 && departure2 ? (
                <AdjustedTimetables
                  numberOfAdditionalTrains={numberOfAdditionalTrains}
                  departure1={departure1}
                  departure2={departure2}
                />
              ) : (
                <p>Not enough data to work with</p>
              )}
            </div>

            <div className={panelStyles}>
              <h2>Adjusted initial departure offset</h2>
              {departure1 && departure2 && additionalExampleDeparture ? (
                <AdjustedDepartureOffsets
                  departure1={departure1}
                  departure2={departure2}
                  numberOfAdditionalTrains={numberOfAdditionalTrains}
                  additionalInitialDeparture={additionalInitialDeparture}
                  additionalExampleDeparture={additionalExampleDeparture}
                />
              ) : (
                <p>Not enough data to work with</p>
              )}
            </div>
          </div>
        </div>
      </MomentContextProvider>
    </>
  )
}

export default App
