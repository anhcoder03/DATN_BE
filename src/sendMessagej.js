import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./medipro-70534-firebase-adminsdk-shav1-247315c497.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // other configuration options
});
export async function sendMessagej(token, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// export async function sendNotification(deviceToken, title, body) {
//   console.log(deviceToken);
//   const message = {
//     notification: {
//       title: title,
//       body: body,
//     },
//     token: deviceToken,
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     console.log("Notification sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// }
