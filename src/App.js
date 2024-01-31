import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import './App.css';
import PricingscreenPage from './Pages/PricingscreenPage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payments" element={<PricingscreenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
