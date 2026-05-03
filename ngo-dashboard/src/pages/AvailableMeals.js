import React from 'react';

const AvailableMeals = () => {
  const availableMeals = [
    { id: 1, restaurant: 'The Burger Joint', meal: 'Cheeseburger', quantity: 5, pickupDeadline: '5:00 PM' },
    { id: 2, restaurant: 'Salad Place', meal: 'Caesar Salad', quantity: 3, pickupDeadline: '6:00 PM' },
    { id: 3, restaurant: 'Fry World', meal: 'Fries', quantity: 10, pickupDeadline: '5:30 PM' },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Available Meals</h1>
      <p className="page-description">View a real-time list of surplus meals from restaurants.</p>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Meal</th>
              <th>Quantity</th>
              <th>Pickup Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {availableMeals.map((meal) => (
              <tr key={meal.id}>
                <td>{meal.restaurant}</td>
                <td>{meal.meal}</td>
                <td>{meal.quantity}</td>
                <td>{meal.pickupDeadline}</td>
                <td>
                  <button className="button primary small">Accept</button>
                  <button className="button danger small">Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableMeals;