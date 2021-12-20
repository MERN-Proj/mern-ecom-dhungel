// var admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json');

// var admin = require('firebase-admin');
import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
