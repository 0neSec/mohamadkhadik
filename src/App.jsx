import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./page/Index";
import FuzzyText from "./components/404/FuzzyText";
import TargetCursor from "./components/TargetCursor/TargetCursor";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {/* TargetCursor akan muncul di semua halaman */}
        <TargetCursor 
          targetSelector="a, button, [data-cursor-target]" // Anda bisa menyesuaikan selector
          spinDuration={2}
          hideDefaultCursor={true}
          hoverDuration={0.2}
          parallaxOn={true}
        />
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={
            // Grid container untuk penempatan sempurna di tengah
            <div className="min-h-screen grid place-items-center bg-black p-4">
              <div className="text-center">
                {/* Container utama dengan spacing yang konsisten */}
                <div className="space-y-8">
                  {/* 404 - benar-benar di tengah */}
                  <div className="h-48 flex items-center justify-center">
                    <FuzzyText 
                      fontSize="clamp(4rem, 20vw, 12rem)"
                      fontWeight={900}
                      color="#fff"
                      baseIntensity={0.5}
                      hoverIntensity={1.8}
                      fuzzRange={40}
                      enableHover={true}
                      glitchMode={true}
                      glitchInterval={3000}
                      glitchDuration={300}
                      direction="both"
                    >
                      404
                    </FuzzyText>
                  </div>
                  
                  {/* Page Not Found */}
                  <div>
                    <FuzzyText 
                      fontSize="clamp(1.5rem, 5vw, 3rem)"
                      fontWeight={600}
                      color="#ccc"
                      baseIntensity={0.2}
                      hoverIntensity={0.6}
                      fuzzRange={20}
                      enableHover={true}
                      direction="horizontal"
                    >
                      Page Not Found
                    </FuzzyText>
                  </div>
                  
                  {/* Deskripsi */}
                  <div className="max-w-md mx-auto space-y-4">
                    <p className="text-gray-400">
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-gray-400">
                      Let's get you back on track.
                    </p>
                  </div>
                  
                  {/* Tombol - tambahkan data-cursor-target agar TargetCursor bereaksi */}
                  <div>
                    <a 
                      href="/" 
                      className="inline-block bg-white text-black font-bold py-3 px-8 rounded-lg 
                               hover:bg-gray-200 transition-all duration-300 
                               hover:scale-105 active:scale-95"
                      data-cursor-target // Atribut khusus untuk TargetCursor
                    >
                      Go Back Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;