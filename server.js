
const express = require('express');
const axios = require('axios');
const moment = require('moment');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allow requests from frontend

// M-PESA credentials
const shortcode = '174379';
const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
const consumerKey = 'GZNWtz50s5qLtOOqX82Uu4fiecBS7hPvNAdQZLXiypFNHuaP';
const consumerSecret = 'rRabi6GC0NgaO2cFIkiERfA79qG2Zf26bgxwZJPorJ4Lyw6PuGfHyt9EUpKouDQY';
// Ngrok Callback URL
const callbackURL = 'https://4efa-154-159-252-58.ngrok-free.app/api/callback';

// Generate access token
async function getAccessToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${auth}` }
  });
  return res.data.access_token;
}

// STK Push endpoint
app.post('/api/stkpush', async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const token = await getAccessToken();
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone.replace(/^0/, '254'),
      PartyB: shortcode,
      PhoneNumber: phone.replace(/^0/, '254'),
      CallBackURL: callbackURL,
      AccountReference: 'RoomBooking',
      TransactionDesc: 'Room Booking Payment'
    };

    const stkRes = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.json({ message: 'STK push initiated', data: stkRes.data });
  } catch (err) {
    console.error("🔥 M-Pesa STK Push Error:", err.response?.data || err.message);
    res.status(500).json({
      message: 'M-Pesa request failed',
      error: err.response?.data || err.message
    });
  }
});

// Callback Handler
app.post('/api/callback', (req, res) => {
  console.log('✅ Callback received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = 5500;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
