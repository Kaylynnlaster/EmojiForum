import React, { useState, useEffect } from "react";
import { Emoji } from "emoji-picker-react";
import { Container, Button, Collapse } from "react-bootstrap";
import "../style/Thread.css";
import ThreadApi from "../api/ThreadApi";
import CommentApi from "../api/CommentApi";
import { useAuth } from "../service/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [openThreads, setOpenThreads] = useState({});
  const [rowData, setRowData] = useState([]);

  const fetchData = async () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    try {
      const response = await ThreadApi.getAllThreads();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const threads = await response.json();

      // Fetch comments count for each thread
      const threadsWithCommentsCount = await Promise.all(
        threads.map(async (thread) => {
          const commentsResponse = await CommentApi.getAllComments(
            thread.user._id,
            thread._id
          );
          if (commentsResponse.ok) {
            const comments = await commentsResponse.json();
            return { ...thread, commentsCount: comments.length };
          } else {
            console.error(
              `Error fetching comments for thread ${thread._id}: ${commentsResponse.status}`
            );
            return { ...thread, commentsCount: 0 };
          }
        })
      );

      setRowData(threadsWithCommentsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  const toggleThread = (threadId) => {
    setOpenThreads((prevOpenThreads) => ({
      ...prevOpenThreads,
      [threadId]: !prevOpenThreads[threadId],
    }));
  };

  return (
    <div>
      <Container className="thread-container">
        <Container className="new-thread">
          <Button onClick={() => navigate("/newthread")}>New Thread</Button>
        </Container>
        <div className="scroll">
          {[...rowData].reverse().map((thread, index) => (
            <div key={index}>
              <Container className="title-container">
                <div className="title-user">
                  User:<p className="title-content">{thread.user.username}</p>
                </div>
                <div className="title-header">{thread.title}</div>
                <div className="title-date">
                  Posted On:<p className="title-content">{thread.createdAt}</p>
                </div>
                <div className="title-replies">
                  # of Comments:
                  <p className="title-content">{thread.commentsCount}</p>
                </div>
              </Container>
              <Container className="content-container">
                {thread.description.map((desc, descIndex) => (
                  <div className="content-content" key={descIndex}>
                    {desc.split(",").map((code, idx) => (
                      <p key={idx}>
                        <Emoji unified={code.trim()} size="50" />
                      </p>
                    ))}
                  </div>
                ))}
              </Container>
              <Container className="comments-container">
                <div className="title-content">Comments</div>

                {thread.commentsCount === 0 ? (
                  <Button
                    onClick={() =>
                      navigate("/newcomment", {
                        state: { selectedThreadId: thread._id },
                      })
                    }
                    className="btn-link no-hover nowrap-button"
                  >
                    New Comment
                  </Button>
                ) : (
                  // If there are replies, show "View" button
                  <Button
                    onClick={() => toggleThread(thread._id)}
                    aria-controls={`collapse${thread._id}`}
                    aria-expanded={openThreads[thread._id]}
                    className="btn-link no-hover nowrap-button"
                  >
                    {openThreads[thread._id] ? "Hide" : "View"}
                  </Button>
                )}
              </Container>
              <Collapse in={openThreads[thread._id]}>
                <div id={`collapse${thread._id}`}>
                  <Container className="comments-container">
                    <AsyncComments
                      userId={thread.user._id}
                      threadId={thread._id}
                    />
                  </Container>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

const AsyncComments = ({ userId, threadId }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommentApi.getAllComments(userId, threadId);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    fetchComments();
  }, [userId, threadId]);

  return (
    <div className="comment-container">
      {" "}
      <div className="comment-link">
        {" "}
        <Button
          onClick={() =>
            navigate("/newcomment", {
              state: { selectedThreadId: threadId },
            })
          }
          className="btn-link no-hover nowrap-button"
        >
          New Comment
        </Button>
      </div>
      <div className="commentScroll">
        {comments.map((comment, commentIndex) => (
          <div className="comment-item" key={commentIndex}>
            <div className="comment-content">
              <Emoji unified={comment.content[0]} size="50" />
            </div>
            <div className="comment-username">
              User:<p className="title-content">{comment.user.username}</p>
            </div>
            <div className="comment-date">
              Posted On:<p className="title-content">{comment.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
