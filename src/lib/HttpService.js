import axios from 'axios';

// Using a relative URL for the API endpoint is a good practice.
// It assumes your development server is configured to proxy API requests
// to the backend server, avoiding CORS issues.
const backendUrl = "http://localhost:8080/orders"

/**
 * Fetches the list of orders from the backend API.
 *
 * @returns {Promise<Array>} A promise that resolves with an array of order objects.
 * @throws {Error} An error is thrown if the API call fails.
 */
export const fetchOrders = async () => {
  const response = await axios.get(backendUrl);
  // `axios` automatically parses the JSON and places the result in the `data` property.
  return response.data;
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