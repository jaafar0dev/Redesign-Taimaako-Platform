import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ClientFlowWithAuth } from './components/ClientFlowWithAuth';
import { WorkerFlow } from './components/WorkerFlow';
import { AdminDashboard } from './components/admin/AdminDashboard';

export type UserType = 'client' | 'worker' | 'admin' | null;

function App() {
  const [userType, setUserType] = useState<UserType>(null);

  const handleReset = () => {
    setUserType(null);
  };

  if (userType === 'client') {
    return <ClientFlowWithAuth onBack={handleReset} />;
  }

  if (userType === 'worker') {
    return <WorkerFlow onBack={handleReset} />;
  }

  if (userType === 'admin') {
    return <AdminDashboard onLogout={handleReset} />;
  }

  return <LandingPage onSelectUserType={setUserType} />;
}

export default App;