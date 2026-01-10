import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import UserDashboard from './pages/dashboards/UserDashboard';
import PartnerDashboard from './pages/dashboards/PartnerDashboard';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';
import Explore from './pages/Explore';
import TripPlanning from './pages/TripPlanning';
import PlacesList from './pages/PlacesList';
import MapView from './pages/MapView';
import Maintenance from './pages/Maintenance';
import ArtisanProfile from './pages/ArtisanProfile';
import MaintenanceGuard from './components/MaintenanceGuard';
import Settings from './pages/Settings';

import Layout from './components/Layout';
import { LanguageProvider } from './context/LanguageContext';

const App = () => {
    console.log('Rendering full App structure...');
    return (
        <LanguageProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/maintenance" element={<Maintenance />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/owner-dashboard" element={<OwnerDashboard />} />

                        <Route element={<MaintenanceGuard />}>
                            <Route path="/" element={<UserDashboard />} />
                            <Route path="/landing" element={<Home />} />
                            <Route path="/user-dashboard" element={<UserDashboard />} /> {/* Keep for backward compat if needed */}
                            <Route path="/partner-dashboard" element={<PartnerDashboard />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/trip-planning" element={<TripPlanning />} />
                            <Route path="/explore/:type" element={<PlacesList />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/map" element={<MapView />} />
                            <Route path="/artisan/:id" element={<ArtisanProfile />} />
                        </Route>
                    </Routes>
                </Layout>
            </Router>
        </LanguageProvider>
    );
};

export default App;
