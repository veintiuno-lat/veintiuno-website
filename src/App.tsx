import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MDXProvider } from "@mdx-js/react";
import { UnheadProvider, createHead } from "@unhead/react/client";

const head = createHead();

// Eager-load HomePage (most-requested initial route) to avoid suspense flicker on first paint.
import HomePage from "./pages/HomePage";

// Lazy-load secondary routes — each becomes its own chunk.
const CardsPage = lazy(() => import("./pages/CardsPage"));
const CardPage = lazy(() => import("./pages/CardPage"));
const ArtistsPage = lazy(() => import("./pages/ArtistsPage"));
const ArtistPage = lazy(() => import("./pages/ArtistPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const CommunitiesPage = lazy(() => import("./pages/CommunitiesPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const ArmyPage = lazy(() => import("./pages/ArmyPage"));
const MeetupsPage = lazy(() => import("./pages/MeetupsPage"));
const MeetupPage = lazy(() => import("./pages/MeetupPage"));
const SquadPage = lazy(() => import("./pages/SquadPage"));
const SoldierPage = lazy(() => import("./pages/SoldierPage"));
const NodesPage = lazy(() => import("./pages/NodesPage"));
const MerchantsPage = lazy(() => import("./pages/MerchantsPage"));
const SelfCustodyPage = lazy(() => import("./pages/SelfCustodyPage"));
const StackPage = lazy(() => import("./pages/StackPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { mdxComponents } from "./components/mdx/MDXComponents";
import { AnalyticsProvider } from "./components/analytics/analytics-provider";
import { PageTransition } from "./components/motion";

const RouteFallback = () => (
  <div className='min-h-[60vh] flex items-center justify-center'>
    <div className='flex flex-col items-center gap-4'>
      <div className='w-10 h-10 rounded-full border-2 border-bitcoin/30 border-t-bitcoin animate-spin' />
      <span className='text-sm text-gray-500 uppercase tracking-widest'>
        Cargando
      </span>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait' initial={false}>
      <PageTransition key={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path='/' element={<HomePage />} />
            <Route path='/cards' element={<CardsPage />} />
            <Route path='/card/:cardId' element={<CardPage />} />
            <Route path='/artists' element={<ArtistsPage />} />
            <Route path='/artist/:artistId' element={<ArtistPage />} />
            <Route path='/communities' element={<CommunitiesPage />} />
            <Route path='/community/:communityId' element={<CommunityPage />} />
            <Route path='/contact' element={<ContactUsPage />} />
            <Route path='/army' element={<ArmyPage />} />
            <Route path='/mission/nodes' element={<NodesPage />} />
            <Route path='/mission/merchants' element={<MerchantsPage />} />
            <Route path='/mission/self-custody' element={<SelfCustodyPage />} />
            <Route path='/mission/stack' element={<StackPage />} />
            <Route path='/squad/:squadId' element={<SquadPage />} />
            <Route path='/soldier/:soldierId' element={<SoldierPage />} />
            <Route path='/meetups' element={<MeetupsPage />} />
            <Route path='/meetup/:meetupId' element={<MeetupPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <UnheadProvider head={head}>
      <MDXProvider components={mdxComponents}>
        <Router>
          <AnalyticsProvider>
            <ScrollToTop />
            <AppContent />
          </AnalyticsProvider>
        </Router>
      </MDXProvider>
    </UnheadProvider>
  );
}

export default App;
