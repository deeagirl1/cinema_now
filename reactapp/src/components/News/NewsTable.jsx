import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Delete from "@material-ui/icons/Delete";
import NewsService from "../services/NewsService";
import { Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import NewsForm from "./NewsForm";

export default function NewsTable() {
  const [showPost, setShowPost] = useState(false);
  const handleClosePost = () => setShowPost(false);
  const handleShowPostForm = () => setShowPost(true);

  const [news, setNews] = useState([]);

  useEffect(() => {
    NewsService.getNews().then((response) => {
      setNews(response.data);
      console.log(response.data);
    });
  }, []);

  // eslint-disable-next-line
  news.map((post) => {
    // eslint-disable-next-line
     post["id"] = post.id;
  });

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "postedAt", headerName: "Posted At", flex: 1 },

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
    NewsService.deletePost(id)
      .then((response) => {
        if (response.data !== null) {
          alert("Post deleted succesfully.");
          window.location.reload();
        }
      })
      .catch(() => {
        <div className="alert alert-danger" role="alert">
          Houston, we have a problem! Please try again.
        </div>;
      });
  };

  function handleClick(mode, selected) {
    switch (mode) {
      case 0:
        // window.history.pushState(selected.row.id);

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
    <div style={{ height: 700, width: "flex" }}>
      <>
        <AddIcon variant="primary" onClick={handleShowPostForm}></AddIcon>
        <Modal
          show={showPost}
          onHide={handleClosePost}
          aria-labelledby="example-modal-sizes-title-lg"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Movie information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewsForm />
          </Modal.Body>
        </Modal>
      </>
      <br />
      <br />
      <DataGrid
        density="comfortable"
        rows={news}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnSelector
        disableMultipleSelection={true}
        disableSelectionOnClick={true}
      />
    </div>
  );
}
