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
import { useAuth } from "../service/AuthContextProvider";
import { useLocation } from "react-router-dom";

const NewComment = () => {
  const navigate = useNavigate();
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [selectedEmojiData, setSelectedEmojiData] = useState("");

  const [inputValue, setInputValue] = useState("");
  const { user } = useAuth();
  const location = useLocation();
  const threadId = location.state.selectedThreadId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentInfo = {
        content: selectedEmojiData.unified,
      };
      const response = await CommentApi.postComment(
        user.data[0]._id,
        threadId,
        selectedEmojiData.unified
      );
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        navigate("/home");
        return data;
      } else {
        console.error("Error saving comment:", response.status);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const onClick = (emojiData, event) => {
    setSelectedEmojiData(emojiData);
    setSelectedEmoji(emojiData.emoji); // Set the selected emoji
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Container className="d-flex justify-content-center">
        <EmojiPicker
          onEmojiClick={onClick}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.NATIVE}
        />
      </Container>
      <Container>
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1>Create A New Comment</h1>
          <Form.Group className="mb-3">
            <InputGroup>
              <Form.FloatingLabel
                label={<Emoji unified={selectedEmoji} />}
                className="mb-3"
              >
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
