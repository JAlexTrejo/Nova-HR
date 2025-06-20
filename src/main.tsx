import { createRoot } from "react-dom/client";
import App from "./App";

// ✅ Tailwind CSS y estilos personalizados
import "./index.css";

// ⚠️ Ya no se necesita Bootstrap ni light-bootstrap-dashboard

createRoot(document.getElementById("root")!).render(<App />);
