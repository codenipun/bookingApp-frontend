import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Hotel from './pages/hotel/Hotel';
import Login from './pages/Login/Login';
import Home from "./pages/Home/Home";
import List from "./pages/list/List"

import './app.scss'
import Bookings from './pages/Bookings/Bookings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<List/>}/>
        <Route path='/hotels/:id' element={<Hotel/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/register' element={<UserRegister inputs={userInputs}/>}/> */}
        <Route path='/bookings' element={<Bookings/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;