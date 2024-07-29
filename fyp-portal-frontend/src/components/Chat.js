import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3001');

const Chat = ({ projectId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${projectId}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.response?.data || error.message);
      }
    };

    fetchMessages();

    socket.on('connect', () => {
      socket.emit('join', projectId);
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [projectId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) return;

    try {
      const response = await axios.post(`http://localhost:3000/api/projects/${projectId}/messages`, {
        content: newMessage,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender.username === user.username ? 'sent' : 'received'}`}>
            <p><strong>{message.sender.profile?.fullName || message.sender.username}:</strong> {message.content}</p>
            <span className="message-time">{new Date(message.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="send-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
