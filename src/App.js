import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home';
// import Hotel from './Components/Hotel/Hotel';
import List from './Components/list/List';
import {userInputs} from "./Components/FormSource/FormSource"
import Hotel from './Components/Hotel/Hotel';
import UserRegister from './Components/UserRegister/UserRegister';
import Login from './Components/Login/Login';

import './app.scss'
// import './styles/home.scss'
// import './styles/header.scss'
// import './styles/featured.scss'
// import './styles/navbar.scss'
// import './styles/propertylist.scss'
// import './styles/featuredProperties.scss'
// import './styles/maillist.scss'
// import './styles/footer.scss'
// import './styles/list.scss'
// import './styles/hotel.scss'
// import './styles/login.scss'
// import './styles/userRegister.scss'
// import './styles/roomBookLayout.scss'
// import './styles/loader.scss'
// import "./Components/Hotel/hotel.scss"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<List/>}/>
        <Route path='/hotels/:id' element={<Hotel/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<UserRegister inputs={userInputs}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
