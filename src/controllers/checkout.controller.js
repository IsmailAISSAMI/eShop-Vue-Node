// secret key
const stripe = require('stripe')('sk_test_51IYAy4EMn5LU6PTLwpnqc9bJdhlcRl00wA5zVAMDLC2hF2LXbI9gisvB2vcF7d2e4CtZEzbBhfZZRJGb7LnZyaJY00mbH6ynB0')

exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:8080/success',
    cancel_url: 'http://localhost:8080/fail',
  });

  res.json({ id: session.id });
}