// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TitulacionProvider } from "./context/TitulacionContext";
import { MatematicasPage } from "./pages/MatematicasPage";
import { InfomatesPage } from "./pages/InfomatesPage";
import { FisimatesPage } from "./pages/FisimatesPage";
import { InformaticaPage } from "./pages/InformaticaPage";
import { MatesFisPage } from "./pages/MatesFisPage";

function App() {
  return (
    <TitulacionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/mates" element={<MatematicasPage />} />
          <Route path="/infomates" element={<InfomatesPage />} />
          <Route path="/fisimates" element={<FisimatesPage />} />
          <Route path="/inform" element={<InformaticaPage />} />
          <Route path="/matesfis" element={<MatesFisPage />} />
          <Route path="/" element={<Navigate to="/infomates" replace />} />
        </Routes>
      </BrowserRouter>
    </TitulacionProvider>
  );
}

export default App;
