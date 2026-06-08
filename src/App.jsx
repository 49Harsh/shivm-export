import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Hero from './sections/Hero';
import TrustSection from './sections/TrustSection';
import CategoriesSection from './sections/CategoriesSection';
import ProductsSection from './sections/ProductsSection';
import WhyChooseUs from './sections/WhyChooseUs';
import ExportProcess from './sections/ExportProcess';
import GlobalPresence from './sections/GlobalPresence';
import Testimonials from './sections/Testimonials';
import AboutSection from './sections/AboutSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';

function AppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <TrustSection />
            <CategoriesSection />
            <ProductsSection />
            <WhyChooseUs />
            <ExportProcess />
            <GlobalPresence />
            <Testimonials />
            <AboutSection />
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
          <FloatingButtons />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
