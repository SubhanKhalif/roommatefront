import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatBox = () => {
  const { userId, receiverId } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverInfo, setReceiverInfo] = useState(null);

  // Fetch receiver information
  useEffect(() => {
    const fetchReceiverInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${receiverId}`, config);
        setReceiverInfo(response.data);
      } catch (error) {
        console.error("Error fetching receiver info:", error);
      }
    };

    fetchReceiverInfo();
  }, [receiverId]);

  // WebSocket connection
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
      setMessages([...messages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-2/3 flex flex-col h-screen">
      {/* Chat Header */}
      {receiverInfo && (
        <div className="p-4 border-b flex items-center">
          <img
            src={receiverInfo.profilePicture || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-semibold">{receiverInfo.name}</p>
            <p className="text-sm text-gray-500">@{receiverInfo.username}</p>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.senderId === userId ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-md ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
