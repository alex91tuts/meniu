import React, { useState, useEffect } from 'react';
import { getAllPersons } from '../utils/db';

const ProfileSelectionPopup = ({ isOpen, onClose, onConfirm }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const loadedProfiles = await getAllPersons();
    setProfiles(loadedProfiles);
  };

  const handleProfileToggle = (profileId) => {
    setSelectedProfiles(prevSelected =>
      prevSelected.includes(profileId)
        ? prevSelected.filter(id => id !== profileId)
        : [...prevSelected, profileId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Who will eat this meal?</h2>
        <div className="space-y-2 mb-4">
          {profiles.map(profile => (
            <div key={profile.id} className="flex items-center">
              <input
                type="checkbox"
                id={`profile-${profile.id}`}
                checked={selectedProfiles.includes(profile.id)}
                onChange={() => handleProfileToggle(profile.id)}
                className="mr-2"
              />
              <label htmlFor={`profile-${profile.id}`} className="flex items-center dark:text-white">
                <img src={profile.picture} alt={profile.name} className="w-8 h-8 rounded-full mr-2 object-cover" />
                {profile.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onConfirm(selectedProfiles)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectionPopup;
