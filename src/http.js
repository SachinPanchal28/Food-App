export const getAvailableMeals = async () => {
  const response = await fetch("http://localhost:3000/meals");
  const meals = await response.json();

  if (!response.ok) throw new Error("failed to fetch meals");
  return meals;
};

export const submitOrder = async (order) => {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: { "Content-Type": "application/json" },
  });
  const orderResponse = await response.json();
  if (!response.ok) throw new Error("failed to submit order.");
  return orderResponse.message;
};
