import { Route, Routes } from 'react-router-dom';
import Signup from './pages/signup.js';
import Login from './pages/Login.js';
import MainPage from './pages/Main.js';
import './app.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/dashboard' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
