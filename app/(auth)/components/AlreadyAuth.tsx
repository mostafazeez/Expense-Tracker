"use client";
import { useRouter } from "next/navigation";

export default function AlreadyComp({isLogin=false}){
    const router = useRouter();

    return (
        <span
        className="text-sm text-gray-400 underline cursor-pointer"
        onClick={() => router.push(isLogin?'/register':"/login")}
      >
       {isLogin?"Don't have an account? Sign Up":' Already registerd? Login'}
      </span>
    )
}