import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Plus, MapPin, User, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Layout({ children, currentPageName }) {
  const showNav = currentPageName !== 'CreateTrip';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001242] via-[#004e92] to-[#00CEFF] text-white">
      <style>{`
        :root {
          --bg-primary: #001242;
          --bg-secondary: #004e92;
          --bg-card: rgba(255, 255, 255, 0.1);
          --accent-cyan: #00CEFF;
          --accent-blue: #0077b6;
          --accent-navy: #001242;
          --text-primary: #FFFFFF;
          --text-secondary: #E0F7FA;
          --border-color: rgba(0, 206, 255, 0.2);
        }
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .gradient-border {
          background: linear-gradient(135deg, #001242, #00CEFF, #0077b6);
          padding: 1px;
        }
        
        .gradient-btn {
          background: linear-gradient(135deg, #001242 0%, #004e92 50%, #00CEFF 100%);
          color: white;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #00CEFF, #E0F7FA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .radial-bg {
          background: radial-gradient(ellipse at center, rgba(0, 206, 255, 0.15) 0%, transparent 70%);
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 206, 255, 0.3);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 206, 255, 0.5);
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between glass-card border-b" style={{ borderColor: 'var(--border-color)' }}>
        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-btn flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold gradient-text">Mysuru Trips</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors">
            <User className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
          </button>
          <button
            onClick={() => base44.auth.logout()}
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24 min-h-screen radial-bg">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-around py-2">
            <Link
              to={createPageUrl('Home')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${currentPageName === 'Home' ? 'text-[#00CEFF]' : 'text-[#E0F7FA]/60 hover:text-[#00CEFF]'}`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Link>

            <Link
              to={createPageUrl('CreateTrip')}
              className="relative -top-4"
            >
              <div className="w-14 h-14 rounded-full gradient-btn flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 12px rgba(0, 206, 255, 0.3)' }}>
                <Plus className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-[#00CEFF] text-center block mt-1 font-medium">New Trip</span>
            </Link>

            <Link
              to={createPageUrl('MyTrips')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${currentPageName === 'MyTrips' ? 'text-[#00CEFF]' : 'text-[#E0F7FA]/60 hover:text-[#00CEFF]'}`}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-xs">My Trips</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
