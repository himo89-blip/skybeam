const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('PayMongo Webhook Server is running!');
});

app.post('/webhook', (req, res) => {
  const event = req.body.data;
  const eventType = event ? event.attributes.type : null;

  console.log('Natanggap na Event:', eventType);

  if (eventType === 'payment.paid') {
    const payment = event.attributes.data;
    console.log('Tagumpay ang Bayad!');
    console.log('Payment ID:', payment.id);
    console.log('Halaga:', payment.attributes.amount);
    console.log('Status:', payment.attributes.status);
  }

  res.status(200).json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);});
