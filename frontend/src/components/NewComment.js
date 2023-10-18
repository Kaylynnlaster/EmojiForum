import React, { useState, useEffect } from "react";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";

import "../style/NewComment.css";
import CommentApi from "../api/CommentApi";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const NewComment = () => {
  const navigate = useNavigate();
  const [selectedEmoji, setSelectedEmoji] = useState("1f60a");
  const [inputValue, setInputValue] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentInfo = {
      content: e.target.content.value
       };
       const response = CommentApi.postComment(userId, threadId, selectedEmoji);

    try {
      // Call the API and handle the response
      const response = await CommentApi.SaveComment(commentInfo);
      if (response.ok) {
        const data = await response.json();
        navigate("/");
      } else {
        console.error("Error saving comment:", response.status);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }

    // Clear input fields from this point on
    e.target.content.value = "";
  };

  const onClick = (emojiData, event) => {
    setSelectedEmoji(emojiData.emoji); // Set the selected emoji
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Container className="d-flex justify-content-center">
      <EmojiPicker onEmojiClick={onClick} autoFocusSearch={false} emojiStyle={EmojiStyle.NATIVE} />

      </Container>
      <Container>
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1>Create A New Comment</h1>
          <Form.Group className="mb-3">
            <InputGroup>
            <Form.FloatingLabel label={<Emoji unified={selectedEmoji}  />} className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={selectedEmoji} // Set the value of the form control to the selected emoji
                  readOnly // Make the input read-only
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
