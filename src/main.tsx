import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/global-styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // Turned down strict mode, while working with axios request
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
