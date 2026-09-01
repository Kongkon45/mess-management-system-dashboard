import React from 'react';
import SettingsContainer from './_components/settings-container';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your application settings</p>
      </div>
      
      <SettingsContainer />
    </div>
  );
};

export default SettingsPage;
