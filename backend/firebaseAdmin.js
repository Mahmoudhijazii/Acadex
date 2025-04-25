// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./student-x-d1a7a-a0770d1f5847.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
