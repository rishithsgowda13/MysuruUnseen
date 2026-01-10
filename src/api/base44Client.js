export const base44 = {
    auth: {
        logout: () => {
            console.log('Logging out...');
            localStorage.clear();
            window.location.href = '/login';
        }
    }
};
