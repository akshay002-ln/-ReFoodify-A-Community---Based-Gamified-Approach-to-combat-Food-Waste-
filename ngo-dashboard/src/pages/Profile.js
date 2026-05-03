import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Community Food Bank',
    serviceArea: 'Downtown',
    contact: 'contact@communityfoodbank.org',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>View and edit NGO details, service area, and contact information.</p>

      <div style={{ border: '1px solid #ddd', padding: '1rem' }}>
        {isEditing ? (
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>NGO Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Service Area</label>
              <input
                type="text"
                name="serviceArea"
                value={profile.serviceArea}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contact</label>
              <input
                type="email"
                name="contact"
                value={profile.contact}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
            <button type="button" onClick={handleEditToggle} style={{ padding: '0.5rem 1rem' }}>
              Save
            </button>
          </form>
        ) : (
          <div>
            <p><strong>NGO Name:</strong> {profile.name}</p>
            <p><strong>Service Area:</strong> {profile.serviceArea}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <button onClick={handleEditToggle} style={{ padding: '0.5rem 1rem' }}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;