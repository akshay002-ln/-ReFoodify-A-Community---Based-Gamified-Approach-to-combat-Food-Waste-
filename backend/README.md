# Backend starter

Run:

1. cp .env.example .env and edit
2. npm install
3. npm run dev

Test flow:
- Register student
- POST /api/orders/create with Authorization header
- POST /api/payments/webhook { orderId, paymentTransactionId }
- Use returned token to POST /api/qr/scan (Auth header)
- Wait 30 mins or change scannedAt to older date to test feedback
