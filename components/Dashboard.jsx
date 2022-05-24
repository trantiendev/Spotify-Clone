import React, { useState, useEffect } from 'react';
import { Body, Right, Sidebar, Player, ErrorBoundary } from '.';

const Dashboard = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body />
      <Right />
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
