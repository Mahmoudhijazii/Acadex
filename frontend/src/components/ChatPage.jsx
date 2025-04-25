// frontend/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ChatPage = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) navigate('/login');
    });
    return () => unsubscribe();
  }, [navigate, token]);

  // Fetch users
  useEffect(() => {
    if (!token) return;
    axios
      .get('https://student-x.onrender.com/api/users/all', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      });
  }, [token]);

  // Listen for messages
  useEffect(() => {
    if (!selectedUser || !auth.currentUser) return;

    const currentUid = auth.currentUser.uid;
    const chatId = [currentUid, selectedUser.id].sort().join('-');

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(
      q,
      snapshot => setMessages(snapshot.docs.map(doc => doc.data())),
      err => {
        console.error('Snapshot listener error:', err);
        setError('Could not load messages.');
      }
    );

    return () => unsubscribe();
  }, [selectedUser]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !auth.currentUser || !selectedUser) return;

    const currentUid = auth.currentUser.uid;
    const chatId = [currentUid, selectedUser.id].sort().join('-');

    try {
      await addDoc(
        collection(db, 'chats', chatId, 'messages'),
        {
          senderId: currentUid,
          receiverId: selectedUser.id,
          message: newMessage.trim(),
          timestamp: serverTimestamp()
        }
      );
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {error && (
        <p className="w-full text-red-600 bg-red-100 p-4 text-center">{error}</p>
      )}
      <div className="flex flex-1">
        {/* User List */}
        <div className="w-full md:w-1/4 bg-gray-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <ul>
            {users.map(user => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer p-3 mb-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="w-full md:w-3/4 p-4 flex flex-col">
          {selectedUser ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Chat with {selectedUser.name}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg border shadow-md">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 p-2 rounded-lg ${
                      msg.senderId === auth.currentUser.uid
                        ? 'bg-blue-100 self-end'
                        : 'bg-gray-100 self-start'
                    }`}
                  >
                    <p>{msg.message}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-600">Select a user to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

