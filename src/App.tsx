import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ShowForm from './components/ShowForm';
import ShowData from './components/ShowData';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/add' element={< ShowForm onClose={() => { }} onTrue={() => { }} />}></Route>
          <Route path='/home' element={<ShowData />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


// onClose={()=>{}} onTrue={()=>{}}