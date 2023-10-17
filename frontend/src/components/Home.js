import React, { useState, useEffect } from "react";
import { Emoji } from "emoji-picker-react";
import Container from "react-bootstrap/esm/Container";
import "../style/Thread.css";
import ThreadApi from "../api/ThreadApi";
import { useAuth } from "../service/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
    const fetchData = async () => {
      try {
        const response = await ThreadApi.getAllThreads();
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login page if not logged in
            navigate("/login");
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setRowData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Container className="thread-container">
        {rowData.map((thread, index) => (
          <div key={index}>
            <Container className="title-container">
              <div className="title-content">{thread.title}</div>
            </Container>
            <Container className="content-container">
              {thread.description.map((desc, descIndex) => (
                <div key={descIndex}>
                  {desc.split(",").map((code, idx) => (
                    <p key={idx}>
                      <Emoji unified={code.trim()} size="50" />
                    </p>
                  ))}
                </div>
              ))}
            </Container>
            <Container className="comments-title">
              <div className="title-content">Comments</div>
            </Container>
            <Container className="comments-container">
              <div className="comment-content">
                <p>User</p>
                <p>
                  <Emoji unified="1f926-200d-2642-fe0f" size="25" />
                </p>
              </div>
            </Container>
          </div>
        ))}
      </Container>
    </div>
  );
};
