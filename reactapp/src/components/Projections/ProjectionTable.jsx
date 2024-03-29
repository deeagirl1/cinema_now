import React, { useState, useEffect } from "react";
import Delete from "@material-ui/icons/Delete";
import { IconButton } from "@mui/material";
import { Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import ProjectionService from "../services/ProjectionService";
import ProjectionForm from "./ProjectionForm";

export default function NewsTable() {
  const [showProjection, setProjection] = useState(false);
  const handleCloseProjectionForm = () => setProjection(false);
  const handleShowProjectionForm = () => setProjection(true);

  const [projections, setProjections] = useState([]);

  useEffect(() => {
    ProjectionService.getProjections().then((response) => {
      setProjections(response.data);
      console.log(response.data);
    });
  }, []);

  // eslint-disable-next-line
  projections.map((projection) => {
    // eslint-disable-next-line
      projection["id"] = projection.id;
  });

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    {
      field: "Actions",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleClick(1, cellValues);
              }}
            >
              <Delete />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    ProjectionService.deleteProjection(id);
  };

  function handleClick(mode, selected) {
    switch (mode) {
      case 0:
        break;
      case 1:
        handleDelete(selected.row.id);

        break;
      default:
        window.history.pushState(selected.row.id);
        break;
    }
  }

  return (
    <>
      <>
        <AddIcon variant="primary" onClick={handleShowProjectionForm}>
          Add projections
        </AddIcon>
        <Modal
          show={showProjection}
          onHide={handleCloseProjectionForm}
          aria-labelledby="example-modal-sizes-title-lg"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Projection information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProjectionForm />
          </Modal.Body>
        </Modal>
      </>
      <div style={{ height: 700, width: "flex" }}>
        <DataGrid
          density="comfortable"
          rows={projections}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnSelector
          disableMultipleSelection={true}
          disableSelectionOnClick={true}
        />
      </div>
    </>
  );
}
