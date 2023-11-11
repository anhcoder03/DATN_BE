const handleTotalOrderOrder = (medicines) => {
  const total = medicines.reduce((accumulator, medicine) => {
    return accumulator + medicine.totalPrice;
  }, 0);
  return total;
};

export default handleTotalOrderOrder;
