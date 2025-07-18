import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chip } from "primereact/chip";
import { ProgressSpinner } from "primereact/progressspinner";

import { fetchOrders } from "../lib/HttpService"; // Import the fetchOrders function
import "./OrdersTable.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

const OrdersTable = () => {
  // Use 'const' for state variables, as the reference to 'orders' won't change
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError("There was an error fetching the orders.");
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-column justify-content-center align-items-center min-h-screen">
        <ProgressSpinner className="loading-spinner" />
        <div className="mt-2">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4 text-xl">{error}</div>;
  }

  const approvedBodyTemplate = (rowData) => {
    return <Chip label={rowData.approved ? "Yes" : "No"} style={{backgroundColor: rowData.approved ? "var(--blue-200)" : "var(--red-200)"}} />;
  }
  return (
    <div className="card m-4">
      <h1 className="text-3xl font-bold text-center mb-4">Customer Orders</h1>
      {orders && orders.length > 0 ? (
        <DataTable value={orders} stripedRows className="orders-datatable">
          <Column field="id" header="Order ID" />
          <Column field="customerFirstName" header="First Name" />
          <Column field="customerLastName" header="Last Name" />
          <Column field="approved" header="Approved" body={approvedBodyTemplate} />
        </DataTable>
      ) : (
        <div className="text-center">No orders found.</div>
      )}
    </div>
  );
};

export default OrdersTable;