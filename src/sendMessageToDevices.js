import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./medipro-fpoly-firebase-adminsdk-o628s-5858c0ae87.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function sendMessageToDevices(tokens, title, body, link) {
  const message = {
    tokens: tokens,
    data: {
      link: link,
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
