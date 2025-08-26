import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chip } from "primereact/chip";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

import { fetchOrders, deleteOrder, updateOrder } from "../lib/HttpService"; 
import "./OrdersTable.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

import EditOrderDialog from "./EditOrderDialog";

const OrdersTable = () => {
  // Use 'const' for state variables, as the reference to 'orders' won't change
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState();
  const [selectedOrder, setselectedOrder] = useState(null);

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
      setOrders(orders.filter((order) => order.Id !== orderId));
    } catch (error_) {
      setError("There was an error fetching the orders.");
      console.error("Error fetching data: " + error_);
    } finally {
      setLoading(false);
    }
  };

  const onOrderUpdate = async (updatedOrder) => {

    // Update current orders
    console.log(orders)

    // Make http Request to update order
    try {
      await updateOrder(updatedOrder);
      console.log("updatedOrder: ", updatedOrder)
      console.log("orders: ", orders)
      console.log("updated orders: ", orders.map((order) => order.Id == updatedOrder.Id ? updatedOrder : order))

      setOrders(orders.map((order) => order.Id == updatedOrder.Id ? updatedOrder : order));
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
    return <Button label="Delete" severity="danger" onClick={() => onClickDeleteOrder(rowData.Id)} />;
  };

  const verifiedRowFilterTemplate = (options) => {
    return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
  };

  const approvedBodyTemplate = (rowData) => {
    return <Chip label={rowData.Approved ? "Yes" : "No"} style={{ backgroundColor: rowData.Approved ? "var(--blue-200)" : "var(--red-200)" }} />;
  };

  const orderSelected = (order) => {
    setselectedOrder(order);
    setEditing(true);
  };

  return (
    <div className="card m-4">
      <h1 className="text-3xl font-bold text-center mb-4">Customer Orders</h1>
      {orders && orders.length > 0 ? (
        <DataTable
          value={orders}
          stripedRows
          className="orders-datatable"
          filters={filters}
          filterDisplay="row"
          selectionMode="single"
          selection={selectedOrder}
          onRowSelect={(e) => orderSelected(e.data)}>
          <Column header="Order ID" field="Id" filter sortable />
          <Column header="First Name" field="CustomerFirstName" filter sortable />
          <Column header="Last Name" field="CustomerLastName" filter sortable />
          <Column header="Approved" field="Approved" filter sortable filterElement={verifiedRowFilterTemplate} body={approvedBodyTemplate} dataType="boolean" />
          <Column header="Delete" body={deleteButton} />
        </DataTable>
      ) : (
        <div className="text-center">No orders found.</div>
      )}
      {/* 
      Calling the setEditing hook directly will keep the order in selectedOrder. 
      This shouldn't be a problem, but if it becomes one, put a function in between that also clears the selected order.
      */}
      {editing ? <EditOrderDialog visible={editing} turnOffVisibility={() => setEditing(false)} order={selectedOrder} onOrderUpdate={onOrderUpdate} /> : <></>}
    </div>
  );
};

export default OrdersTable;
