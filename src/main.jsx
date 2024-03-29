import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CardProvider } from './context/card.context.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <CardProvider>
        <App />
      </CardProvider>   
    </BrowserRouter>
  // </React.StrictMode>,
)
