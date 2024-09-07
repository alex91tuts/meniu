import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Settings</h1>
      <div className="masonry">
        <div className="pin p-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">App Settings</h2>
          <p className="dark:text-gray-300">Customize your app experience here.</p>
        </div>
        <div className="pin p-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Profile</h2>
          <p className="dark:text-gray-300">Manage your profile information.</p>
        </div>
        <div className="pin p-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Notifications</h2>
          <p className="dark:text-gray-300">Configure your notification preferences.</p>
        </div>
        <div className="pin p-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Privacy</h2>
          <p className="dark:text-gray-300">Adjust your privacy settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
