// frontend/pages/settings.tsx

import React from 'react';
import Settings from '~/components/settings';
import Navbar from "~/components/navbar";
import useUser from "~/hooks/use_user";

const settings: React.FC = () => {
  const [user, loading] = useUser()
  const handleNewSetting = (newSetting: string) => {
    // Handle saving the new setting (replace with your API call)
    console.log('Saving new setting:', newSetting);
    // Replace the console.log with your API request
  };

  return (
    <div>
        <Navbar userName={user?.email} />

      <h1>Settings</h1>
      <Settings onSaveSetting={handleNewSetting} />
    </div>
  );
};

export default settings;
