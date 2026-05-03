import React from 'react';

const DonationRecords = () => {
  const partnerRestaurants = [
    { id: 1, name: 'The Burger Joint', mealsDonated: 125 },
    { id: 2, name: 'Salad Place', mealsDonated: 88 },
    { id: 3, name: 'Fry World', mealsDonated: 210 },
  ];

  const totalMealsCollected = partnerRestaurants.reduce((total, restaurant) => total + restaurant.mealsDonated, 0);

  return (
    <div>
      <h1>Donation Records</h1>
      <p>Track the number of meals collected and partner restaurants.</p>

      <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '2rem' }}>
        <h2>Total Meals Collected</h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalMealsCollected}</p>
      </div>

      <h2>Partner Restaurants</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Restaurant</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Meals Donated</th>
          </tr>
        </thead>
        <tbody>
          {partnerRestaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{restaurant.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{restaurant.mealsDonated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationRecords;