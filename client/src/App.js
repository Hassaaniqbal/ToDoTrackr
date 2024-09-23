import {Route, Routes} from 'react-router-dom';
import Signup from './pages/signup.js';
import Login from './pages/Login.js';
import MainPage from './pages/Main.js';

import Test from './pages/test.js';
import Signnup from './pages/signnup.js';

import ResponsiveLayout from './pages/anttest.js';
import HomePage from './pages/anttesttwo.js';

import './app.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/dashboard' element={<MainPage/>}/>





        <Route path='/test' element={<Test/>}/>
        <Route path='/testt' element={<Signnup/>}/>

        <Route path='/testtt' element={<ResponsiveLayout/>}/>
        {/* solid exaple down with paddings */}
        <Route path='/testttt' element={<HomePage/>}/> 
  

      </Routes>
    </div>
  );
}

export default App;
