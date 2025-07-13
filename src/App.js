import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedResult, setConvertedResult] = useState('');

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    if (fromCurrency === toCurrency) {
      alert('Please select two different currencies');
      return;
    }

    fetch(`https://currency-converter-backend-ua98.onrender.com/api/convert?from=${fromCurrency}&to=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.rate) {
          const result = amount * data.rate;
          setConvertedResult(`${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`);
        } else {
          alert('Conversion rate not available');
        }
      })
      .catch((err) => {
        alert('Network Error: ' + err.message);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        style={{ padding: '8px', fontSize: '16px' }}
      />

      <br /><br />

      <div>
        <label>From: </label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <span style={{ margin: '0 10px' }}>➡️</span>

        <label>To: </label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <br />

      <button
        onClick={handleConvert}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        Convert
      </button>

      {convertedResult && (
        <div style={{ marginTop: '20px' }}>
          <h3>{convertedResult}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
