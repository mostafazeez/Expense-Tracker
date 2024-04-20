
import { Metadata } from "next";

import AlreadyComp from "../components/AlreadyAuth";
import FormComp from "../components/FormAuth";



export const metadata: Metadata = {
    title: "Register",
    description: "Register to expense tracker page",
  };

  
export default  function Register() {




  return (
    <div className="flex flex-col  gap-16 justify-center items-center  h-full align-middle px-16">
      <div className="flex flex-col gap-8px justify-center items-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <span className="text-sm text-gray-500">
          Enter your email below to create your account
        </span>
      </div>
<FormComp />
          <AlreadyComp />
     
    </div>
  );
}
