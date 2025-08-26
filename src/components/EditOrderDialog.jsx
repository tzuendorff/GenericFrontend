import { Dialog } from "primereact/dialog";
import OrderLines from "./OrderLines.jsx";
import OrderHeader from "./OrderHeader.jsx";


const EditOrderDialog = ({ visible, turnOffVisibility, order, onOrderUpdate }) => {
  const handleItemUpdate = (updatedItem, index) => {
    const updatedItems = [...order.Items];
    updatedItems[index] = updatedItem;
    onOrderUpdate?.({ ...order, Items: updatedItems });
  };

  const handleItemDelete = (itemId) => {
    const updatedItems = order.Items.filter((item) => item.Id !== itemId);
    onOrderUpdate?.({ ...order, Items: updatedItems });
  };

  return (
    <>
      <Dialog
        visible={visible}
        style={{ width: "80vw" }}
        onHide={() => {
          if (!visible) return;
          turnOffVisibility();
        }}>
        <h2>Order Details</h2>
        <OrderHeader order={order} />
        <h2>Order Items</h2>
        <OrderLines items={order.Items} onItemUpdate={handleItemUpdate} onItemDelete={handleItemDelete} />
      </Dialog>
    </>
  );
};

export default EditOrderDialog;
