import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, useCallback, useState, lazy } from 'react';
import Header from './components/layout/header/Header';
import SidePanel from './components/base/side-panel/SidePanel';
import MobileNavigation from './components/navigation/mobile/MobileNavigation';
import Footer from './components/layout/footer/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const ReservePage = lazy(() => import('./pages/ReservePage'));
const NotFoundPage = lazy(() => import('./pages/404Page'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
    const [isPanelOpen, setPanelOpen] = useState(false);

    const handlePanelClose = useCallback(() => {
        setPanelOpen(false);
    }, []);

    return (
        <HelmetProvider>
            <Router>
                <Header isMobileMenuOpen={isPanelOpen} setMobileMenuOpen={setPanelOpen} />
                <main>
                    <div className="container">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/reserve" element={<ReservePage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </div>
                </main>

                <Footer />

                <SidePanel isOpen={isPanelOpen} onClose={handlePanelClose}>
                    <MobileNavigation />
                </SidePanel>
            </Router>
        </HelmetProvider>
    );
}

export default App;
