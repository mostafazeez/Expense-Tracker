import { push, ref, set, get, child } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { hashPass } from "@/app/utils";

export async function POST(req: Request, context: any) {
  const data = await req.json();
  const email = data.email.replace(/[^a-z0-9-]/g, "");
  const usersData = await getDatabaseUsers();
  if (usersData && Object.keys(usersData).includes(email)) {
    return Response.json(
      { success: "false", msg: "user is already registerd" },
      {
        status: 409,
      }
    );
  } else {
    const usersRef = ref(database, `users/${email}`);
    const newDataRef = push(usersRef);
    const hashedPassword = await hashPass(data.password);

    set(newDataRef, {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    cookies().set("token", randomUUID(), {
      secure: true,
      maxAge: 3600,
      httpOnly: true,
      sameSite: true,
    });

    return Response.json(
      { success: "true", data: { name: data.name, email: data.email,id:email } },
      {
        status: 200,
      }
    );
  }
}

const getDatabaseUsers = async () => {
  try {
    const usersRef = ref(database);

    const result = await get(child(usersRef, "users"));

    return result.val();
  } catch (error) {
    console.error(error);
  }
};
