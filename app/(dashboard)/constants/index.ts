export const categories: { [key: string]: { value: string; label: string; color:string }[] } = {
    income: [
      { value: "salary", label: "Salary",color:'#519DE9' },
      { value: "carRent", label: "Car Rent",color:'#7CC674' },
      { value: "houseRent", label: "House Rent",color:'#73C5C5' },
      { value: "bankLoan", label: "Bank Loan",color:'#8481DD' },
      { value: "familyLoan", label: "Family Loan",color:'#F6D173' },
      { value: "others", label: "Others",color:'#EF9234' },
    ],
    expense: [
      { value: "entertainment", label: "Entertainment",color:'#002F5D' },
      { value: "life", label: "Life expenses (Rent , schools, etc..)",color:'#23511E' },
      { value: "holiday", label: "Holidays",color:'#003737' },
      { value: "food", label: "Food",color:'#2A265F' },
      { value: "fuel", label: "Fuel",color:'#C58C00' },
      { value: "clothes", label: "Clothes",color:'#8F4700' },
      { value: "others", label: "Others",color:'#2C0000' },
    ],
  };