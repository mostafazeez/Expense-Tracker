import AlreadyComp from "../components/AlreadyAuth";
import FormComp from "../components/FormAuth";

export default function Login() {

  return (
    <div className="p-16 min-h-full h-screen ">
      
      <div className="flex flex-col  gap-16 justify-center items-center  h-full align-middle px-16">
        <div className="flex flex-col gap-8px justify-center items-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <span className="text-sm text-gray-500">
            Enter your email and password to sign in to your account
          </span>
        </div>

       <FormComp isLogin/>

       <AlreadyComp isLogin/>
      </div>
    </div>
  );
}
