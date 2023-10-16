import { Route, Routes } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { CustomNavbar } from './components/CustomNavbar';
import { Thread } from './components/Thread';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (


    <div className="App">

      <CustomNavbar/>
      <Routes>
        <Route path="/" exact element={<Thread/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* Add additional routes here */}
      </Routes>

    </div>
  );
}

export default App;
