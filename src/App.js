import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Hotel from './pages/hotel/Hotel';
import Login from './pages/Login/Login';
import Home from "./pages/Home/Home";
import List from "./pages/list/List"

import './app.scss'
import Bookings from './pages/Bookings/Bookings';

// const baseUrl = '';
const baseUrl= '/https://booking-app-mx29.onrender.com';

function App() {
  return (
    <BrowserRouter basename={baseUrl}>
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