import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Onboarding } from './screens/Onboarding';
import { Auth } from './screens/Auth';
import { Shell } from './components/Shell';
import { Dashboard } from './screens/Dashboard';
import { CodeCreation } from './screens/CodeCreation';
import { IpoManagement } from './screens/IpoManagement';
import { TasksView, PurchaseView, ImsView } from './screens/PlaceholderViews';

const AppContent = () => {
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('onboarded') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('session_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('onboarded', isOnboarded);
  }, [isOnboarded]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('session_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out of BINDER-OS?')) {
      setUser(null);
      localStorage.removeItem('session_user');
    }
  };

  // 1. Onboarding Screen
  if (!isOnboarded) {
    return <Onboarding onComplete={() => setIsOnboarded(true)} />;
  }

  // 2. Auth Screen
  if (!user) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  // 3. ERP Main Shell & Routing
  return (
    <Shell 
      currentView={currentView} 
      setView={setCurrentView} 
      user={user} 
      onLogout={handleLogout}
    >
      {currentView === 'dashboard' && (
        <Dashboard user={user} setView={setCurrentView} />
      )}
      {currentView === 'tasks' && <TasksView />}
      {currentView === 'code-creation' && <CodeCreation user={user} />}
      {currentView === 'ipo-management' && <IpoManagement />}
      {currentView === 'purchase' && <PurchaseView />}
      {currentView === 'ims' && <ImsView />}
    </Shell>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
