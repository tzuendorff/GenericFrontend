import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chip } from "primereact/chip";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

import { fetchOrders, deleteOrder } from "../lib/HttpService"; // Import the fetchOrders function
import "./OrdersTable.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

const OrdersTable = () => {
  // Use 'const' for state variables, as the reference to 'orders' won't change
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [filters] = useState({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
    id: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
    customerFirstName: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
    customerLastName: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
    approved: { value: undefined, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error_) {
        setError("There was an error fetching the orders.");
        console.error("Error fetching data: " + error_);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const onClickDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      console.log(orderId);

      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error_) {
      setError("There was an error fetching the orders.");
      console.error("Error fetching data: " + error_);
    } finally {
      setLoading(false);
    }
  };

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

  const deleteButton = (rowData) => {
    return <Button label="Delete" severity="danger" onClick={() => onClickDeleteOrder(rowData.id)} />;
  };

  const verifiedRowFilterTemplate = (options) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
  };

  const approvedBodyTemplate = (rowData) => {
    return <Chip label={rowData.approved ? "Yes" : "No"} style={{ backgroundColor: rowData.approved ? "var(--blue-200)" : "var(--red-200)" }} />;
  };
  return (
    <div className="card m-4">
      <h1 className="text-3xl font-bold text-center mb-4">Customer Orders</h1>
      {orders && orders.length > 0 ? (
        <DataTable value={orders} stripedRows className="orders-datatable" filters={filters} filterDisplay="row">
          <Column header="Order ID"   field="id"                filter sortable />
          <Column header="First Name" field="customerFirstName" filter sortable />
          <Column header="Last Name"  field="customerLastName"  filter sortable />
          <Column header="Approved"   field="approved"          filter sortable filterElement={verifiedRowFilterTemplate}  body={approvedBodyTemplate} dataType="boolean" />
          <Column header="Delete" body={deleteButton} />
        </DataTable>
      ) : (
        <div className="text-center">No orders found.</div>
      )}
    </div>
  );
};

export default OrdersTable;
