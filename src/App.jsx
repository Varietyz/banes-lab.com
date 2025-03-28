// 📂 src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Graphics from './pages/Graphics';
import Development from './pages/Development';
import About from './pages/About';
import Contact from './pages/Contact';
import Roadmap from './pages/Roadmap';
import 'github-markdown-css/github-markdown-dark.css'; // or github-markdown-light.css

export default function App() {
  return (
    <Router>
      {/* 🌌 Global Background Layer */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-dark bg-[url('/assets/images/Background.png')] bg-cover bg-center scale-110 pointer-events-none -z-10" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/graphics" element={<Graphics />} />
              <Route path="/development" element={<Development />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
