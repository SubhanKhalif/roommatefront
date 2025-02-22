import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { userId } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket(`ws://${process.env.REACT_APP_API_URL.split('//')[1]}`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = { senderId: "currentUserId", receiverId: userId, text: newMessage };
      socket.send(JSON.stringify(messageData));
      setMessages([...messages, messageData]); // Update local messages
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-gray-800 text-white text-lg font-bold">
        Chat with {userId}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className={`p-2 rounded-lg w-fit max-w-xs mb-2 ${msg.senderId === "currentUserId" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"}`}>
            {msg.text}
          </p>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-gray-100 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
