import { Route, Routes } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { CustomNavbar } from './components/CustomNavbar';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (


    <div className="App">

      <CustomNavbar/>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </div>
  );
}

export default App;
