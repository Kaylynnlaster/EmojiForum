import { Route, Routes } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (


    <div className="App">

      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>

    </div>
  );
}

export default App;
