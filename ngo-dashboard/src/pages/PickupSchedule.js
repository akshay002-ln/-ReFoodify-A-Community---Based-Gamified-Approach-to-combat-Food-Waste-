import React from 'react';

const PickupSchedule = () => {
  const schedule = [
    { id: 1, restaurant: 'The Burger Joint', time: 'Today, 4:30 PM', status: 'Scheduled' },
    { id: 2, restaurant: 'Salad Place', time: 'Tomorrow, 12:00 PM', status: 'Scheduled' },
    { id: 3, restaurant: 'Fry World', time: 'Yesterday, 5:00 PM', status: 'Picked Up' },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Pickup Schedule</h1>
      <p className="page-description">Manage and schedule pickups for available meals.</p>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((pickup) => (
              <tr key={pickup.id}>
                <td>{pickup.restaurant}</td>
                <td>{pickup.time}</td>
                <td>{pickup.status}</td>
                <td>
                  {pickup.status === 'Scheduled' && <button className="button primary small">Mark as Picked Up</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PickupSchedule;