import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './Pages/Home/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard'
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
