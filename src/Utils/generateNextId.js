const generateNextId = (lastId, text) => {
  if (!lastId) return `${text}-001`;
  const lastNumber = parseInt(lastId.split("-")[1]);
  const nextNumber = lastNumber + 1;
  const nextId = `${text}-${nextNumber.toString().padStart(3, "0")}`;
  return nextId;
};

export default generateNextId;
