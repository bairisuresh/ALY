import React, { useState } from 'react';

export default function RespondToOffers() {
  const [offer, setOffer] = useState(18200);
  const [counter, setCounter] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <h2>2 Offers</h2>
      <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div>Offer amount: ${offer}</div>
        <button style={{ margin: '8px 8px 8px 0' }}>Decline</button>
        <button style={{ margin: '8px 8px 8px 0' }}>Counter</button>
        <button style={{ margin: '8px 8px 8px 0' }}>Accept Offer</button>
      </div>
      <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
        <div>Offer amount: ${offer}</div>
        <input
          placeholder="Counter amount"
          value={counter}
          onChange={e => setCounter(e.target.value)}
          style={{ marginTop: 8, width: '100%' }}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
          This would be your best offer given the proposals. If not ideal, you can counter.
        </div>
        <button style={{ margin: '8px 8px 8px 0' }}>Decline</button>
        <button style={{ margin: '8px 8px 8px 0' }}>Counter</button>
        <button style={{ margin: '8px 8px 8px 0' }}>Accept Offer</button>
      </div>
      {message && <div style={{ color: 'green', marginTop: 16 }}>{message}</div>}
    </div>
  );
}
