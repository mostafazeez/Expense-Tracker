import { push, ref, set, get, child } from "firebase/database";
import { database } from "../../../../firebaseConfig";

import { cookies } from "next/headers";

export async function GET(req: Request,) {
  let email = req.nextUrl.searchParams.get('email')
   email = email?.replace(/[^a-z0-9-]/g, "");
  const tokenFound = cookies().get("token")?.value;
  if (tokenFound) {
    try {
     const result= await getUserRecords(email);
      return Response.json(
        { success: "true", msg: "Record Added",data:result },
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


const getUserRecords = async (email:string) => {
    try {
      const usersRef = ref(database);
  
      const result = await get(child(usersRef, `users/${email}/records`));
      return result.val();
    } catch (error) {
      console.error(error);
    }
  };
  