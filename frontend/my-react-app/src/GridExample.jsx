import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

// Create new GridExample component
const GridExample = ({ onEdit, refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      // Notice the relative path due to the proxy setup
      const response = await axios.get("/api/items");
      setItems(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      fetchItems();
    }
  }, [refreshTrigger]);

  // Column Definitions: Defines & controls grid columns for API data
  const colDefs = [
    { field: "name", headerName: "Name" },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
    { field: "description", headerName: "Description" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <button
            onClick={() => onEdit && onEdit(params.data)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#646cff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Edit
          </button>
            <button
            onClick={() => onDelete && onDelete(params.data)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#646cff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "5px"
            }}
          >
            Delete
          </button>
        </div>
      ),
      width: 100,
      sortable: false,
      filter: false
    }
  ];

  const defaultColDef = {
    flex: 1,
  };

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error: {error}</p>;

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      style={{ width: "100%", height: "500px" }}
      className="ag-theme-alpine"
    >
      <AgGridReact
        rowData={items}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default GridExample;
