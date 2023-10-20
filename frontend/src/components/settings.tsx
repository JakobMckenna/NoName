// frontend/components/settings.tsx

import React, { useState, ChangeEvent } from 'react';

interface SettingsProps {
  onSaveSetting: (setting: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onSaveSetting }) => {
  const [newSetting, setNewSetting] = useState<string>('');

  const handleSettingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSetting(e.target.value);
  };

  const saveSetting = () => {
    onSaveSetting(newSetting);
    setNewSetting('');
  };

  return (
    <div>
      <h1>Settings</h1>
      <div className="mb-4">
        <label htmlFor="newSetting" className="block text-xl mb-2">
          Setting Name
        </label>
        <input
          type="text"
          id="newSetting"
          name="newSetting"
          value={newSetting}
          onChange={handleSettingChange}
          className="w-96 p-2 border rounded"
        />
      </div>
      <button onClick={saveSetting} className="btn btn-primary">
        Save Setting
      </button>
    </div>
  );
};

export default Settings;
