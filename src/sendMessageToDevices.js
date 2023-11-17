import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./medipro-70534-firebase-adminsdk-shav1-247315c497.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function sendMessageToDevices(tokens, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
      // icon: "https://res.cloudinary.com/mediapro-cloud/image/upload/v1700236522/mediaPro-DATN/logo3_j43xpj.png",
    },
    tokens: tokens,
  };

  try {
    const response = await getMessaging().sendMulticast(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log("Error sending message:", error);
  }
}
