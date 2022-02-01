import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

import { ExchangeProvider } from './context/ExchangeContext'

ReactDOM.render(
  <ExchangeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ExchangeProvider>,
  document.getElementById('root')
)
