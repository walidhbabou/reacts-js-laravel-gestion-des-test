import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './services/axios'  // Import de la configuration Axios

createRoot(document.getElementById("root")!).render(<App />);
