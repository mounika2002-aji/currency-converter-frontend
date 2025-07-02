import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [convertedUSD, setConvertedUSD] = useState('');
  const [convertedEUR, setConvertedEUR] = useState('');

  const handleConvert = () => {
    const url = `http://localhost:5000/api/convert`; // change to live API later

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const usdResult = amount * data.rates.USD;
          const eurResult = amount * data.rates.EUR;

          setConvertedUSD(usdResult.toFixed(2));
          setConvertedEUR(eurResult.toFixed(2));
        } else {
          alert('API Error');
        }
      })
      .catch((error) => {
        alert('Network Error: ' + error.message);
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
