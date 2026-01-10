import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const MaintenanceGuard = () => {
    const isMaintenanceMode = localStorage.getItem('maintenanceMode') === 'true';
    const userRole = localStorage.getItem('role');

    // If maintenance is ON and user is NOT an admin, redirect to maintenance page
    if (isMaintenanceMode && userRole !== 'admin') {
        return <Navigate to="/maintenance" replace />;
    }

    return <Outlet />;
};

export default MaintenanceGuard;
