import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { HelmetProvider } from "react-helmet-async";

import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";
import CardPage from "./pages/CardPage";
import ArtistsPage from "./pages/ArtistsPage";
import ArtistPage from "./pages/ArtistPage";
import ContactUsPage from "./pages/ContactUsPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CommunityPage from "./pages/CommunityPage";
import ArmyPage from "./pages/ArmyPage";
import MeetupsPage from "./pages/MeetupsPage";
import MeetupPage from "./pages/MeetupPage";
import SquadPage from "./pages/SquadPage";
import SoldierPage from "./pages/SoldierPage";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { mdxComponents } from "./components/mdx/MDXComponents";
import { AnalyticsProvider } from "./components/analytics/analytics-provider";
import NodesPage from "./pages/NodesPage";
import MerchantsPage from "./pages/MerchantsPage";
import SelfCustodyPage from "./pages/SelfCustodyPage";

function AppContent() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <Routes>
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
          <Route path='/squad/:squadId' element={<SquadPage />} />
          <Route path='/soldier/:soldierId' element={<SoldierPage />} />
          <Route path='/meetups' element={<MeetupsPage />} />
          <Route path='/meetup/:meetupId' element={<MeetupPage />} />
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
