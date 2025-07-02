import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [convertedUSD, setConvertedUSD] = useState('');
  const [convertedEUR, setConvertedEUR] = useState('');

  const handleConvert = () => {
  if (!amount || isNaN(amount)) {
    alert('Please enter a valid amount in INR');
    return;
  }

  fetch('https://currency-converter-backend-ua98.onrender.com/api/convert')// ✅ UPDATED HERE
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const usd = amount * data.rates.USD;
        const eur = amount * data.rates.EUR;
        setConvertedUSD(usd.toFixed(2));
        setConvertedEUR(eur.toFixed(2));
      } else {
        alert('API Error: Invalid response');
      }
    })
    .catch((err) => {
      alert('Network Error: ' + err.message);
    });
};

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>INR to USD & EUR Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter INR amount"
        style={{ padding: '8px', fontSize: '16px' }}
      />

      <br /><br />

      <button
        onClick={handleConvert}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        Convert
      </button>

      {convertedUSD && (
        <div style={{ marginTop: '20px' }}>
          <h3>Converted USD: ${convertedUSD}</h3>
          <h3>Converted EUR: €{convertedEUR}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
