const orderHeader = (order) => {
  order = order.order;

  return (
    <>
      <div class="orderDetails grid gap-7 ">
        <div class="col">
          <br />
          <br />
          <div class="metaData grid ">
            <b class="col-5">Order Number:</b>
            <div class="col-5">{order.Id}</div>
          </div>
          <div class="metaData grid justify-content-start	">
            <b class="col-5">Approved:</b>
            <div class="col-5">{order.Approved ? "Yes" : "No"}</div>
          </div>
        </div>
        <div class="col">
          <b>Customer:</b>
          <br />
          <br />
          <div class="customerData grid">
            <b class="col-5">First Name: </b>
            <div class="col-5">{order.CustomerFirstName}</div>
          </div>
          <div class="customerData grid">
            <b class="col-5">Last Name: </b>
            <div class="col-5">{order.CustomerLastName}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default orderHeader;
