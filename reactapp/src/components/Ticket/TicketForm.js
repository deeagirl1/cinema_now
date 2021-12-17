import { React, useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import TicketService from "../services/TicketService";
import MoviesService from "../services/MoviesService";
import UserService from "../services/UserService";
import { useLocation, useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import AuthService from "../services/AuthService";

const CreateTicket = () => {
  const notificationSuccessful = {
    title: "Successful",
    message: "Complaint sent successfully!",
    type: "success",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 2500,
    },
  };
  const notificationUnSuccessful = {
    title: "Something went wrong!",
    message: "Please try again!",
    type: "danger",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 1000,
    },
  };

  const location = useLocation();
  const id = location.state.data.movieId;
  const projection = location.state.data.projectiondId;
  const history = useHistory();

  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [, setTicket] = useState("");
  const [movie, setMovie] = useState("");
  const [holder, setHolder] = useState("");

  const user = AuthService.getCurrentUser().user;

  const ticketAmountOfPeople = useRef();

  useEffect(() => {
    MoviesService.getMoviesById(id).then((response) => {
      setMovie(response.data);
      getUserByUsername(user);
      getTypes();
    });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function getTypes() {
    TicketService.getTicketTypes().then((response) => {
      setTicketTypes(response.data);
    });
  }

  function getUserByUsername(user) {
    UserService.getUserByUsername(user).then((response) => {
      setHolder(response.data.id);
    });
  }
  const handleTicketType = (e) => {
    let obj = e.target.value;
    console.log(obj);
    setSelectedType(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketAmountOfPeopleRef = ticketAmountOfPeople.current.value;

    const ticket = {
      holderId: holder,
      movieId: id,
      type: selectedType,
      roomName: movie.roomId,
      projectionId: projection,
      amountOfPeople: ticketAmountOfPeopleRef,
    };
    TicketService.createTicket(ticket)
      .then((response) => {
        if (response.data !== null) {
          store.addNotification({
            ...notificationSuccessful,
            container: "top-center",
          });
        }
      })
      .catch(() => {
        store.addNotification({
          ...notificationUnSuccessful,
          container: "top-center",
        });
      });
    setTicket(ticket);
    history.push("/confirmTicket", ticket);
  };

  if (!holder) return null;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Ticket details </Form.Label>
          <br />
          <Form.Label>Movie:{movie.name} </Form.Label>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Ticket type: </Form.Label>
          <br />
          <Form.Control as="select" onChange={handleTicketType}  id="ticketType" required>
            <option value=""> -- Select a ticket type -- </option>
            {ticketTypes.map((option, index) => (
              <option key={index} value={JSON.stringify(index)}>
                {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Amount of people: </Form.Label>
          <Form.Control
            type="number"
            placeholder="Write the amount of people..."
            min="0"
            id="amountOfPeople"
            ref={ticketAmountOfPeople}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit"  id="submit">
          Next{" "}
        </Button>
      </Form>
    </div>
  );
};

export default CreateTicket;