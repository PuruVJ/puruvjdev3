import admin from "firebase-admin";

const { FB_ADMIN_KEY } = process.env;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(FB_ADMIN_KEY)),
  databaseURL: "https://puruvjdev.firebaseio.com",
});

export { admin };
