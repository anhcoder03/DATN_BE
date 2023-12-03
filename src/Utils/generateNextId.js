const generateNextId = (lastId, text) => {
  if (!lastId) return `${text}-00000001`;
  const lastNumber = parseInt(lastId.split("-")[1]);
  const nextNumber = lastNumber + 1;
  const nextId = `${text}-${nextNumber.toString().padStart(8, "0")}`;
  return nextId;
};

export default generateNextId;

export const generateNextNumber = (lastNumber) => {
  if (!lastNumber) return 1;
  const nextNumber = lastNumber + 1;
  return nextNumber;
};
