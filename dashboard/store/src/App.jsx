import './App.css'
import Home from './component/Home';
import NavBare from './component/NavBare';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css'
function App() {
  return (
    <>
      <NavBare/>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
