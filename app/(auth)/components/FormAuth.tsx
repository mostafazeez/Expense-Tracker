"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormComp({ isLogin = false }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (values: {
    name: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    try {
      let response = await fetch(`/${isLogin ? "login" : "register"}/api`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      response = await response.json();

      if (response.success === "false") {
        alert(response.msg);
      } else {
        localStorage.setItem("userData", JSON.stringify(response.data));
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Form
      layout="vertical"
      className="w-[32rem] max-w-full border-solid border-2 border-gray-100 p-4 rounded-2xl shadow-2xl flex flex-col items-center"
      onFinish={handleRegister}
      requiredMark={false}
    >
      {!isLogin && (
        <Form.Item
          label="Full Name"
          name={"name"}
          className="text-bold w-full"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input placeholder="Enter your full name..." />
        </Form.Item>
      )}
      <Form.Item
        label="Email"
        name={"email"}
        className="text-bold w-full"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "The input is not valid email!",
          },
        ]}
      >
        <Input placeholder="Enter your email..." />
      </Form.Item>
      <Form.Item
        label="Password"
        name={"password"}
        className="w-full"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Enter your password..." />
      </Form.Item>

      {!isLogin && (
        <Form.Item
          label="Confirm Password"
          name={"confirmPassword"}
          className="w-full"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter your password..." />
        </Form.Item>
      )}
      <Form.Item className="w-full">
        <Button
          type="primary"
          className="w-full"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
