import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { HelmetProvider } from 'react-helmet-async';

import HomePage from './pages/HomePage';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import { mdxComponents } from './components/mdx/MDXComponents';

function App() {
  return (
    <HelmetProvider>
      <MDXProvider components={mdxComponents}>
        <Router>
          <ScrollToTop />
          <div className='min-h-screen bg-white'>
            <Header />
            <main>
              <Routes>
                <Route path='/' element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MDXProvider>
    </HelmetProvider>
  );
}

export default App;
