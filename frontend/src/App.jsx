import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/router.jsx';
import "./App.css";

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}