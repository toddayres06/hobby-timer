import { useState, useEffect, useRef } from 'react'
import './index.css'

function App() {

  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [logs, setLogs] = useState([])
  const [activity, setActivity] = useState('')
  const timerRef = useRef(null) 


  useEffect(() => {
    if(isRunning) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning])

  const handleStartStop = () => {
    if (isRunning) {
      // When stopping, log the current activity and elapsed time
      setLogs([...logs, { activity, elapsed, timestamp: new Date() }])
      setActivity('')
      setElapsed(0)
    }
    setIsRunning(prev => !prev)
  }

  const renderElapsed = () => {
    if(!isRunning) return null
    return <p>Elapsed: {formatTime(elapsed)}</p>
  }

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Hobby Timer</h1>

      <input 
        type="text"
        className="mb-4 px-4 py-2 text-black rounded w-64"
        placeholder="What are you working on?"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleStartStop()
          }
        }}
        disabled={isRunning}
      />

      <button
        onClick={handleStartStop}
        className={`px-6 py-2 rounded text-white font-semibold ${isRunning ? 'bg-red-500 hover:bg-red-600' : 
        'bg-green-500 hover:bg-green-600'}`}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>

      <div className="mt-6 text-xl">
        {renderElapsed()}
      </div>

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-2xl mb-2 border-b pb-1">Activity Log</h2>
        {logs.length === 0 ? (
          <p className="text-gray-400">No activities logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log, ind) => (
              <li key={ind} className="bg-gray-800 p-3 rounded">
                <div className="font-semibold">{log.activity}</div>
                <div className="text-sm text-gray-400">{formatTime(log.elapsed)}</div> {/* Changed log.duration to log.elapsed */}
                <div className="text-xs text-gray-500">{log.timestamp.toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;





















