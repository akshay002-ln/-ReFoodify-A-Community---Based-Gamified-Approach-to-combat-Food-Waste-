import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'The Burger Joint has 5 surplus Cheeseburgers available.', time: '2 minutes ago' },
    { id: 2, message: 'Your pickup from Salad Place is scheduled for tomorrow at 12:00 PM.', time: '1 hour ago' },
    { id: 3, message: 'You have successfully picked up 10 meals from Fry World.', time: 'Yesterday' },
  ];

  return (
    <div>
      <h1>Notifications</h1>
      <p>Receive instant alerts when restaurants list food and manage pickup requests.</p>

      <div>
        {notifications.map((notification) => (
          <div key={notification.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <p>{notification.message}</p>
            <small><em>{notification.time}</em></small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;