import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function MovieSummary({ moviesTitle }) {
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMobNo, setUserMobNo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [row, setRow] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [noOfTickets, setNoOfTickets] = useState("");

  // console.log(moviesTitle);

  useEffect(() => {
    setSummary(localStorage.getItem("summary"));
    setImage(localStorage.getItem("image"));
    setName(localStorage.getItem("name"));
  }, []);

  const handleClose = () => {
    setUserMobNo("");
    setUserName("");
    setDate("");
    setTime("");
    setRow("");
    setSeatNo("");
    setNoOfTickets("");
    setShow(false);
  };

  const handleBook = (
    name,
    userName,
    userMobNo,
    date,
    time,
    row,
    seatNo,
    noOfTickets
  ) => {
    // storing user data in local storage

    localStorage.setItem("name", name);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userMobNo", userMobNo);
    localStorage.setItem("date", date);
    localStorage.setItem("time", time);
    localStorage.setItem("row", row);
    localStorage.setItem("seatNo", seatNo);
    localStorage.setItem("noOfTickets", noOfTickets);

    // setting input feild back to initial state
    setUserMobNo("");
    setUserName("");
    setDate("");
    setTime("");
    setRow("");
    setSeatNo("");
    setNoOfTickets("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="container-sm mt-4 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <img src={image} alt="" className=" img-thumbnail" />
      <h5 className="my-2">{name}</h5>
      <p className="mt-4 text-center fs-5 text fw-semibold lh-Base ">
        {summary}
      </p>

      <Button variant="primary" onClick={handleShow}>
        Book Tickets
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book movie tickets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Book tickets for</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Movie name"
                autoFocus
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                maxLength="10"
                minLength="10"
                pattern="[0=9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => setUserMobNo(e.target.value)}
                value={userMobNo}
                required
                type="tel"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
                type="date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Show Time</Form.Label>
              <Form.Control
                onChange={(e) => setTime(e.target.value)}
                value={time}
                required
                type="time"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Row</Form.Label>
              <Form.Control
                onChange={(e) => setRow(e.target.value)}
                value={row}
                required
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Seat No.</Form.Label>
              <Form.Control
                onChange={(e) => setSeatNo(e.target.value)}
                value={seatNo}
                required
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>No. of tickets</Form.Label>
              <Form.Control
                onChange={(e) => setNoOfTickets(e.target.value)}
                value={noOfTickets}
                required
                type="number"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleBook(
                name,
                userName,
                userMobNo,
                show,
                date,
                time,
                row,
                seatNo,
                noOfTickets
              );
            }}
          >
            Book now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MovieSummary;
