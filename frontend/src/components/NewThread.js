import React, { useState, useEffect } from "react";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import "../style/NewThread.css";
import ThreadApi from "../api/ThreadApi";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

const NewThread = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const threadInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    // Call the api and the login method here
    const response = await ThreadApi.SaveThread(threadInfo);
    if (response.ok) {
      const data = await response.json();
      navigate("/");
    }

    // Clear input fields from this point on
    e.target.title.value = "";
    e.target.description.value = "";
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Container className="d-flex justify-content-center">
        <EmojiPicker />
      </Container>
      <Container>
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1>Create A New Thread</h1>
          <Form.Group className="my-5">
            <Form.FloatingLabel label="Title">
              <Form.Control
                type="text"
                placeholder="Enter Thread Title"
                name="title"
                required
              />
            </Form.FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup>
              <Form.FloatingLabel label="Description">
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  required
                />
              </Form.FloatingLabel>
            </InputGroup>
          </Form.Group>
          <div className="my-3">
            <Button className="w-50" type="submit">
              Create Thread!
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
};
export default NewThread;
