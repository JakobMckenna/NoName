// frontend/pages/settings.tsx

import React from 'react';
import Settings from '~/components/settings';

const settings: React.FC = () => {
  const handleNewSetting = (newSetting: string) => {
    // Handle saving the new setting (replace with your API call)
    console.log('Saving new setting:', newSetting);
    // Replace the console.log with your API request
  };

  return (
    <div>
      <h1>Settings</h1>
      <Settings onSaveSetting={handleNewSetting} />
    </div>
  );
};

export default settings;
