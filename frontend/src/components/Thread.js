import { Emoji, EmojiStyle } from "emoji-picker-react";
import Container from "react-bootstrap/esm/Container";
import "../style/Thread.css";

export const Thread = () => {
  return (
    <div>
      <Container className="thread-container">
        <Container className="title-container">
          <div className="title-content">Jessica ate my lunch</div>
        </Container>
        <Container className="content-container">
          <div className="content-content">
            <p>
              <Emoji unified="1f469-200d-1f9b1" size="50" />
            </p>
            <p>
              <Emoji unified="27a1-fe0f" size="50" />
            </p>
            <p>
              <Emoji unified="1f444" size="50" />
            </p>
            <p>
              <Emoji unified="1f37d-fe0f" size="50" />
            </p>
            <p>
              <Emoji unified="1f372" size="50" />
            </p>
            <p>
              <Emoji unified="27a1-fe0f" size="50" />
            </p>
            <p>
              <Emoji unified="1f468" size="50" />
            </p>
            <p>
              <Emoji unified="27a1-fe0f" size="50" />
            </p>
            <p>
              <Emoji unified="1f620" size="50" />
            </p>
          </div>
        </Container>
        <Container className="title-container">
          <div className="title-content">Comments</div>
        </Container>        
        <Container className="comments-container">
          <div className="content-content">
            <p>User</p>
            <p>
              <Emoji unified="1f926-200d-2642-fe0f" size="25" />
            </p>

        </div>
        </Container>

      </Container>
    </div>
  );
};
