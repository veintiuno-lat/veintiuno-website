import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { HelmetProvider } from "react-helmet-async";

import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";
import ArtistsPage from "./pages/ArtistsPage";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { mdxComponents } from "./components/mdx/MDXComponents";
import { AnalyticsProvider } from "./components/analytics/analytics-provider";

function AppContent() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cards' element={<CardsPage />} />
          <Route path='/artists' element={<ArtistsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <MDXProvider components={mdxComponents}>
        <Router>
          <AnalyticsProvider>
            <ScrollToTop />
            <AppContent />
          </AnalyticsProvider>
        </Router>
      </MDXProvider>
    </HelmetProvider>
  );
}

export default App;
