import { push, ref, set } from "firebase/database";
import { database } from "../../../../firebaseConfig";

import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();
  const email = data.email.replace(/[^a-z0-9-]/g, "");
  const tokenFound = cookies().get("token")?.value;
  if (tokenFound) {
    try {
      await addRecord(data, email);
      return Response.json(
        { success: "true", msg: "Record Added" },
        {
          status: 200,
        }
      );
    } catch (error) {
      return Response.json(
        { success: "false", msg: "Error occured" },
        {
          status: 500,
        }
      );
    }
  } else {
    return Response.json(
      { success: "false", msg: "Invalid credentials" },
      {
        status: 401,
      }
    );
  }
}

const addRecord = async (data: any, id: string) => {
  try {
    const recordsRef = ref(database, `users/${id}/records`);
    const newRecordRef = push(recordsRef);
    set(newRecordRef, {
      amount:data.amount,
      category:data.category,
      title:data.title,
      type:data.type,
      date:new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
  }
};
