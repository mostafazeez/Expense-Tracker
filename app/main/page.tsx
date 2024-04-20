import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

const features: { title: string; desc: string }[] = [
  {
    title: "Track Expenses",
    desc: "The Track expense feature enables users to effortlessly monitor their spending habits by recording and categorizing expenses,providing valuable insights into their financial patterns.",
  },
  {
    title: "Track Income",
    desc: "The Track income feature empowers users to easily keep tabs on their earnings by documenting sources of income and analyzing trends, facilitating better financial planning and decision-making.",
  },
  {
    title: "Monthly Report",
    desc: "The Monthly Report compiles a comprehensive summary of your financial activities, including income, expenses, and savings, offering valuable insights to help you track your financial progress and make informed decisions.",
  },
];

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col w-100 h-full  gap-8 p-32 justify-items-center items-center bg-gray-900 text-white  ">
        <h1 className="text-3xl">Welecome to Expense Tracker App</h1>
        <p className="text-lg">An easy solution for money saving</p>
        <Button className="font-bold"><Link href="/login">Start Now</Link></Button>
      </div>

      <div className="p-32 bg-white pt-16 flex gap-8 flex-col">
        <span className="text-2xl font-bold">Features</span>
        {features.map((feature, id) => (
          <div
            className="px-8 border-solid border-gray-100 border-b-2 pb-4"
            key={id}
          >
            <h1 className="text-xl font-medium">{feature.title}</h1>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
