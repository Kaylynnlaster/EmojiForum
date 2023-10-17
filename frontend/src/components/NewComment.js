import React, { useState, useEffect } from "react";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import "../style/NewComment.css";
import CommentApi from "../api/CommentApi";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

const NewComment = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e.target.content.value,
    };

    // Call the api and the login method here
    const response = await CommentApi.SaveComment(commentInfo);
    if (response.ok) {
      const data = await response.json();
      navigate("/");
    }

    // Clear input fields from this point on
    e.target.content.value = "";
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Container className="d-flex justify-content-center">
        <EmojiPicker />
      </Container>
      <Container>
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1>Create A New Comment</h1>
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
              Create Comment!
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
};

export default NewComment;
