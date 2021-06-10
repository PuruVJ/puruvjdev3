import type { NowRequest, NowResponse } from "@vercel/node";
import { admin } from "./_firebase";

const { firestore } = admin;

export default async function (req: NowRequest, res: NowResponse) {
  let { blogID, likes } = req.body;

  try {
    const doc = firestore().doc(`data/${blogID}`);

    await doc.set(
      {
        likes,
      },
      { merge: true }
    );

    res.send("success");
    return;
  } catch (e) {
    console.log(e);
    res.send("fail");
  }
}
