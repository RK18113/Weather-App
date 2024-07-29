import { React, useState } from 'react';
import WeatherBoard from './components/WeatherBoard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherBoard></WeatherBoard>
    </>
  )
}

export default App
