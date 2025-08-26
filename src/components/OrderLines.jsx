import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

const OrderLines = ({ items = [], onItemUpdate, onItemDelete }) => {
  const onRowEditComplete = (event_) => {
    const { newData, index } = event_;
    onItemUpdate?.(newData, index);
  };

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(event_) => options.editorCallback(event_.target.value)} />;
  };

  const numberEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(event_) => options.editorCallback(event_.value)} mode="decimal" min={0} size={5} />;
  };

  const deleteButton = (rowData) => {
    return <Button label="Delete" severity="danger" onClick={() => onItemDelete(rowData.Id)} />;
  };

  return (
    <div className="card">
      {items && items.length > 0 ? (
        <DataTable value={items} filterDisplay="row" editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} >
          <Column filter header="Item ID" field="Id" editor={(options) => textEditor(options)} sortable />
          <Column filter header="Amount" field="Amount" editor={(options) => numberEditor(options)} sortable />
          <Column header="Actions" body={deleteButton} headerStyle={{ width: "10%" }} />
          <Column rowEditor headerStyle={{ width: "10%" }} bodyStyle={{ textAlign: "center" }} />
        </DataTable>
      ) : (
        <div className="text-center p-3">No items in this order</div>
      )}
    </div>
  );
};

export default OrderLines;
