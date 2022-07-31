// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

const callAll =
  (...fns) =>
  (...args) => {
    fns.forEach(fn => fn?.(...args))
  }

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  // return {on, toggle, togglerProps: {'aria-pressed': on, onClick: toggle}}
  return {
    on,
    toggle,
    getTogglerProps: ({onClick, ...props} = {}) => ({
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }),
  }
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...getTogglerProps()} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: e => console.info(e.target.id),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
