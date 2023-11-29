import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./medipro-datn-firebase-adminsdk-xn8kk-9eb76bc6f2.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function sendMessageToDevices(tokens, title, body) {
  const message = {
    tokens: tokens,
    data: {
      link: "http://localhost:5173/reception?tab=booking&page=1&limit=25",
      title: title,
      body: body,
    },
  };

  try {
    const response = await getMessaging().sendMulticast(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log("Error sending message:", error);
  }
}
