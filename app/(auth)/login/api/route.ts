import { randomUUID } from "crypto";
import { push, ref, set, get, child } from "firebase/database";
import { database } from "../../../firebaseConfig";

import { cookies } from "next/headers";
import { isSamePass } from "@/app/utils";

export async function POST(req: Request) {
  const data = await req.json();
  const email = data.email.replace(/[^a-z0-9-]/g, "");
  const userData = await getDatabaseUsers(email);
  if (userData) {
    //3600 - 1hr
    const key = Object.keys(userData)[0];
    const isSamePassword= await isSamePass(data.password,userData[key].password)
    if(isSamePassword){
      cookies().set("token", randomUUID(), {
        secure: true,
        maxAge: 3600,
        httpOnly: true,
        sameSite: true,
      });
  
      const key = Object.keys(userData)[0];
      return Response.json(
        {
          success: "true",
          data: { name: userData[key].name, email: userData[key].email,id:email },
        },
        {
          status: 200,
        }
      );
    }else{
      return Response.json(
        { success: "false", msg: "Wrong Password" },
        {
          status: 401,
        }
      );
    }

  
  } else {
    return Response.json(
      { success: "false", msg: "No user found with this email" },
      {
        status: 401,
      }
    );
  }
}

const getDatabaseUsers = async (email:string) => {
  try {
    const usersRef = ref(database);

    const result = await get(child(usersRef, `users/${email}`));

    return result.val();
  } catch (error) {
    console.error(error);
  }
};
