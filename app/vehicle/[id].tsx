import { useRouter } from 'expo-router';
import React from 'react';

export default function VehicleDetails() {
  const router = useRouter();
  // Mock data
  const vehicle = {
    year: 2021,
    make: 'GMC',
    model: 'Yukon Hybrid RWD Touring',
    image: '/assets/images/icon.png',
    offers: [18200],
    comments: 'Single owner, no accidents, clean title.'
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
      <img src={vehicle.image} alt="Vehicle" style={{ width: '100%', maxWidth: 300, borderRadius: 8 }} />
      <button style={{ marginTop: 16 }}>Edit Listing</button>
      <div style={{ marginTop: 24 }}>
        <h3>Offers</h3>
        <div>Open Offers: ${vehicle.offers[0]}</div>
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>Seller Comments</h3>
        <div>{vehicle.comments}</div>
      </div>
      <button style={{ marginTop: 24 }} onClick={() => router.push('/offers')}>Respond To Offers</button>
    </div>
  );
}
