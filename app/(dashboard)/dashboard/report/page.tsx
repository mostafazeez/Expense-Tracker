"use client";
import { useEffect, useState } from "react";
import Chart from "chart.js";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

import LoadingWrapper from "@/app/components/LoadingWrapper/LoadingWrapper";
import { categories } from "../../constants";
import { Table } from "antd";

const ExpensesReport = () => {
  const [expenseData, setExpenseData] = useState<any>({
    expense: [],
    income: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const expenseTotalAmount = (() => {
    return expenseData.expense.reduce((total, curr) => total + curr.amount, 0);
  })();

  const incomeTotalAmount = (() => {
    return expenseData.income.reduce((total, curr) => total + curr.amount, 0);
  })();

  const tableData=(()=>{

    return [...expenseData.expense,...expenseData.income].reverse().sort((a,b)=>new Date(b.date || null).getTime() - new Date(a.date || null ).getTime()).map((item)=>({
        title:item.title,
        amount:item.amount,
        category:item.category,
        type:item.type,
        date:new Date(item.date || null).toDateString()
    }))
  })()

  const netAmount = incomeTotalAmount - expenseTotalAmount;
  useEffect(() => {
    getExpensesData();
  }, []);

  const getExpensesData = async () => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      let response = await fetch(
        `/dashboard/report/api?email=${encodeURIComponent(userData.email)}`,
        {
          method: "GET",
        }
      );
      const { data } = await response.json();
      console.log(data);
      formatExpenseData(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const formatExpenseData = (data) => {
    const dataArray = Object.values(data);
    const expensesObject: { [key: string]: any } = {
      expense: [],
      income: [],
    };
    dataArray.forEach((item: any) => expensesObject[item.type].push(item));
    renderGraphs(expensesObject);
    setExpenseData(expensesObject);
  };

  const renderGraphs = (data: any) => {
    const categoriesAmount = {
      expense: {},
      income: {},
    };
    categories.expense
      .map((item) => item.value)
      .forEach((cat) => {
        categoriesAmount.expense[cat] = data.expense.reduce((total, curr) => {
          if (curr.category === cat) {
            return total + curr.amount;
          }
          return total;
        }, 0);
      });

    categories.income
      .map((item) => item.value)
      .forEach((cat) => {
        categoriesAmount.income[cat] = data.income.reduce((total, curr) => {
          if (curr.category === cat) {
            return total + curr.amount;
          }
          return total;
        }, 0);
      });
    const expenseConfig = {
      type: "doughnut",
      data: {
        labels: [...categories.expense.map((item) => item.label)],
        datasets: [
          {
            label: "Expense",
            data: [...Object.values(categoriesAmount.expense)],
            backgroundColor: [...categories.expense.map((item) => item.color)],
            hoverOffset: 4,
          },
        ],
      },
      options:{
        legend: {
            display:false
          }
        }
    };

    const incomeConfig = {
      type: "doughnut",
      data: {
        labels: [...categories.income.map((item) => item.label)],
        datasets: [
          {
            label: "Income",
            data: [...Object.values(categoriesAmount.income)],
            backgroundColor: [...categories.income.map((item) => item.color)],
            hoverOffset: 4,
          },
        ],
      },
      options:{
        legend: {
            display:false
          }
      }
    };
    const ctx = document.getElementById("expense-chart").getContext("2d");
    const ctx2 = document.getElementById("income-chart").getContext("2d");
    window.myLine = new Chart(ctx, expenseConfig);
    window.myLine = new Chart(ctx2, incomeConfig);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
      },
    
  ];



  return (
    <LoadingWrapper isLoading={isLoading}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center justify-center w-full p-2 md:p-16 gap-8 ">
          <div className="p-2 shadow-gray-600 border-gray-200 shadow-md  flex flex-col gap-4 items-center rounded-2xl w-[300px]">
            <div className="flex flex-row gap-2 items-center justify-items-center">
              <span className="text-2xl font-bold">Net</span>
            </div>
            <span
              className={`text-3xl font-black text-${
                netAmount >= 0 ? "green" : "red"
              }-600`}
            >
              {netAmount} EGP
            </span>
          </div>
          <div className="flex flex-col lg:flex-row h-full gap-4 w-full md:items-center md:justify-center">
            <div className="p-2 shadow-gray-600 border-gray-200 shadow-md  flex flex-col gap-4 items-center rounded-2xl w-full lg:w-1/2 ">
              <div>
                <div className="flex flex-row gap-2 items-center justify-items-center">
                  <MinusCircleOutlined className="text-2xl text-red-500" />
                  <span className="text-2xl font-bold">Total Expenses</span>
                </div>
                <span className="text-3xl font-black text-red-600">
                  {expenseTotalAmount} EGP
                </span>
              </div>
              <div className="p-4 flex-auto w-full">
                <div className="relative h-full">
                  <canvas id="expense-chart" height={200}></canvas>
                </div>
              </div>
            </div>
            <div className="p-2 shadow-gray-600 border-gray-200 shadow-md  flex flex-col gap-4 items-center rounded-2xl w-full lg:w-1/2 ">
              <div>
                <div className="flex flex-row gap-2 items-center justify-items-center">
                  <PlusCircleOutlined className="text-2xl text-green-500" />
                  <span className="text-2xl font-bold">Total Income</span>
                </div>
                <span className="text-3xl font-black text-green-600">
                  {incomeTotalAmount} EGP
                </span>
              </div>

              <div className="p-4 flex-auto w-full">
                <div className="relative h-full">
                  <canvas id="income-chart" height={200}></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table dataSource={tableData} columns={columns} className="w-full p-8" pagination={false} />;

        {/* //table */}
      </div>
    </LoadingWrapper>
  );
};

export default ExpensesReport;
