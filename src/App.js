import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css'
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Header from "./components/header";

import Home from './pages/home';
import About from './pages/about/about';
import Client from './pages/client/client';
import Services from './pages/services/services';
import Vehicles from './pages/vehicles/vehicles';
import Contact from './pages/contact/contact';

import Footer from './components/footer';

import CarDetail from "./pages/car-detail";

function App() {
  return (
      <div>
          <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/client" element={<Client />} />
              <Route path="/services" element={<Services />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/cars/:carBrand/:carModel" element={<CarDetail />} />
            </Routes>
          <Footer/>
          </Router>
      </div>
  );
}

export default App;
