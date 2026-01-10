export const createPageUrl = (pageName) => {
    const routes = {
        'Home': '/',
        'CreateTrip': '/trip-planning',
        'MyTrips': '/user-dashboard',
        'Explore': '/explore',
        'Map': '/map',
        'Login': '/login',
        'Signup': '/signup'
    };
    return routes[pageName] || '/';
};
