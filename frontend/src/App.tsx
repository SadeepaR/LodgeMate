import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><>Hello Home Page</></Layout>} />
        <Route path="/search" element={<Layout><>Hello Search Page</></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect all undefined routes to home page */} 

      </Routes>
    </Router>
  );
}

export default App;
