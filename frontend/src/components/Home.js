import React, { useState, useEffect } from "react";
import { Emoji } from "emoji-picker-react";
import Container from "react-bootstrap/esm/Container";
import "../style/Thread.css";
import ThreadApi from "../api/ThreadApi";

export const Home = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ThreadApi.getAllThreads();
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the data to check its format
        setRowData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show message, or redirect to an error page
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <Container className="thread-container">
        {rowData.map((thread, index) => (
          <div key={index}>
            <Container className="title-container">
              <div className="title-content">{thread.title}</div>
            </Container>
            <Container className="content-container">
              <div className="content-content">
                {thread.description.split(',').map((code, idx) => (
                  <p key={idx}>
                    <Emoji unified={code.trim()} size="50" />
                  </p>
                ))}
              </div>
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
