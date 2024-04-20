"use client";
import { Form, Select, Input, InputNumber, Button, FormInstance } from "antd";
import { useRef, useState } from "react";
import { categories } from "../../constants";


const AddExpenses = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoriesOptions, setCategoriesOptions] = useState<any>([]);
  const formRef = useRef<FormInstance>();

  const handleOnFormSubmit = async (values: {
    type: string;
    category: string;
    title: string;
    amount: string;
  }) => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      let response = await fetch(`/dashboard/add-expenses/api`, {
        method: "POST",
        body: JSON.stringify({ ...values, email: userData.email }),
      });
      response = await response.json();

      alert(response.msg);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleOnRecordTypeChange = (value: string) => {
    setCategoriesOptions(categories[value]);
    formRef.current?.setFieldValue("category", null);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-8 items-center justify-center w-full justify-items-center  pb-0 p-4 overflow-visible">
      <div className="flex flex-col gap-0 items-center ">
        <h1 className="text-2xl font-bold ">Money Talks</h1>
        <p className="text-md  text-gray-500">
          Add what has been out or in your wallet
        </p>
      </div>

      <Form
        layout="vertical"
        className=" w-3/4 xl:w-1/2"
        onFinish={handleOnFormSubmit}
        requiredMark={false}
        ref={formRef}
      >
        <Form.Item
          label="Record Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Record Type is required",
            },
          ]}
        >
          <Select
            placeholder="Select record type"
            onChange={handleOnRecordTypeChange}
          >
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Record Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Record Category is required",
            },
          ]}
        >
          <Select placeholder="Select record category">
            {categoriesOptions.map(
              (category: { value: string; label: string }, id: number) => (
                <Select.Option key={id} value={category.value}>
                  {category.label}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Record Title is required",
            },
          ]}
        >
          <Input placeholder="Type your record title" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Record Amount is required",
            },
          ]}
        >
          <InputNumber
            placeholder="Type your record amount"
            className="w-full"
            min={1}
          />
        </Form.Item>
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
    </div>
  );
};

export default AddExpenses;
