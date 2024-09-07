import React, { useState, useEffect } from 'react';
import users from '../data/users';

const Settings = () => {
  const [profiles, setProfiles] = useState(users);
  const [newProfile, setNewProfile] = useState({ name: '', picture: '' });

  useEffect(() => {
    // Load profiles from localStorage on component mount
    const savedProfiles = localStorage.getItem('profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  useEffect(() => {
    // Save profiles to localStorage whenever it changes
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleInputChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProfile.name && newProfile.picture) {
      setProfiles([...profiles, newProfile]);
      setNewProfile({ name: '', picture: '' });
    }
  };

  const handleDeleteProfile = (index) => {
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);
  };

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
        <div className="pin p-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Profiles</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              name="name"
              value={newProfile.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="picture"
              value={newProfile.picture}
              onChange={handleInputChange}
              placeholder="Picture URL"
              className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Profile
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {profiles.map((profile, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded dark:border-gray-600">
                <div className="flex items-center">
                  <img src={profile.picture} alt={profile.name} className="w-10 h-10 rounded-full mr-2" />
                  <span className="dark:text-white">{profile.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteProfile(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
