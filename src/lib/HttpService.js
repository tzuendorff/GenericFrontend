import axios from "axios";

const backendUrl = `${globalThis.ENV.BACKEND_BASE_URL}/${globalThis.ENV.BACKEND_URL_PATH}`;

export const createOrder = async (order) => {
  return axios
    .post(backendUrl, {
      order,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to create orders:", error);
      throw new Error("Failed to create orders. Please try again later.");
    });
};

export const fetchOrders = async () => {
  return axios
    .get(backendUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to fetch orders:", error);
      throw new Error("Failed to fetch orders. Please try again later.");
    });
};

export const updateOrder = async (order) => {
  return axios
    .put(backendUrl, {
      order,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to update orders:", error);
      throw new Error("Failed to update orders. Please try again later.");
    });
};

export const deleteOrder = async (orderId) => {
  return axios
    .delete(backendUrl, {
      params: {
        orderId: orderId,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to update orders:", error);
      throw new Error("Failed to update orders. Please try again later.");
    });
};
// Mocks the fetchOrders function for testing purposes
// export const fetchOrders = async () => {
//   const mockOrders = [
//     { orderId: "ORD-001", firstName: "John", lastName: "Doe", approved: true },
//     { orderId: "ORD-002", firstName: "Jane", lastName: "Smith", approved: false },
//     { orderId: "ORD-003", firstName: "Peter", lastName: "Jones", approved: true },
//     { orderId: "ORD-004", firstName: "Mary", lastName: "Johnson", approved: true },
//     { orderId: "ORD-005", firstName: "David", lastName: "Williams", approved: false },
//   ];

//   // Wrap the setTimeout logic in a Promise
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockOrders);
//     }, 2000);
//   });
// };
