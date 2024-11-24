import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WebLayout from './layout/WebLayout'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Analytics from './pages/Analytics'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<WebLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
