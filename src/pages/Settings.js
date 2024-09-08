import React, { useState, useEffect } from 'react';
import { addPerson, getAllPersons, updatePerson, deletePerson, compressImage } from '../utils/db';
import ImageCropper from '../components/ImageCropper';

const Settings = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: '', picture: null });
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const loadedProfiles = await getAllPersons();
    setProfiles(loadedProfiles);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'picture') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCropImage(reader.result);
          setShowCropper(true);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
    }
  };

  const handleCropComplete = (croppedImage) => {
    setNewProfile({ ...newProfile, picture: croppedImage });
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProfile.name && newProfile.picture) {
      const compressedPicture = await compressImage(newProfile.picture);
      await addPerson({ name: newProfile.name, picture: compressedPicture });
      setNewProfile({ name: '', picture: null });
      await loadProfiles();
    }
  };

  const handleDeleteProfile = async (id) => {
    await deletePerson(id);
    await loadProfiles();
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Profiles</h2>
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
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Profile
          </button>
        </form>
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between p-2 border rounded dark:border-gray-600">
              <div className="flex items-center">
                <img src={profile.picture} alt={profile.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
                <span className="dark:text-white">{profile.name}</span>
              </div>
              <button
                onClick={() => handleDeleteProfile(profile.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {showCropper && (
        <ImageCropper
          image={cropImage}
          onCropFinish={handleCropComplete}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  );
};

export default Settings;
