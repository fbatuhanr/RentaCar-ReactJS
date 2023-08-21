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

import Footer from './components/footer';

function App() {
  return (
      <div>
          <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          <Footer/>
          </Router>
      </div>
  );
}

export default App;
