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
import "../style/NewThread.css";
import ThreadApi from "../api/ThreadApi";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/AuthContextProvider";


const NewThread = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [unifiedValue, setUnifiedValue] = useState("");
  const [selectedEmojiData, setSelectedEmojiData] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // Reset state values when the component mounts
    setInputValue("");
    setUnifiedValue("");
    setSelectedEmoji("");
    setSelectedEmojiData("");
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const threadInfo = {
        title: e.target.title.value,
        description: unifiedValue,
      };
  
      // Call the API and the login method here
      const response = await ThreadApi.saveThread(user.data[0]._id, threadInfo);
      if (response.ok) {
        const data = await response.json();
        navigate("/home");
        
  
        // Clear input fields and reset state values
        e.target.title.value = "";
        setInputValue("");
        setUnifiedValue("");
        setSelectedEmoji("");
        setSelectedEmojiData("");
        return data;
      } else {
        console.error("Error saving comment:", response.status);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };
 
  const onClick = (emojiData, event) => {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
    setUnifiedValue(
      (unifiedValue) =>
        unifiedValue + (emojiData.unified) + ","
    );
    setSelectedEmoji(emojiData.unified);
    setSelectedEmojiData(emojiData);
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
            <Form.Control
              className="text-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Select Emojis..."
            />
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
