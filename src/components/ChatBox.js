import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Messenger = () => {
  const { userId, receiverId } = useParams(); // Get sender and receiver IDs
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");
    setSocket(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = { senderId: userId, receiverId, text: newMessage };
      socket.send(JSON.stringify(messageData));
      setMessages([...messages, messageData]); // Update local state
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with {receiverId}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={msg.senderId === userId ? "sent" : "received"}>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Messenger;
