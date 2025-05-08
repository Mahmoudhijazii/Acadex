// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import supabase from '../supabaseClient';
// import axios from 'axios';

// const ChatPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const [currentUserId, setCurrentUserId] = useState(null);

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!token) {
//       console.log("🔒 No token found. Redirecting to login.");
//       navigate('/login');
//     } else {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         console.log("✅ Token payload:", payload);
//         setCurrentUserId(payload.id);
//       } catch (err) {
//         console.error("❌ Failed to decode token:", err);
//         navigate('/login');
//       }
//     }
//   }, [token, navigate]);

//   // Fetch users after ID is set
//   useEffect(() => {
//     if (currentUserId) {
//       fetchUsers();
//     }
//   }, [currentUserId]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://student-x.onrender.com/api/users/all');
//       const filteredUsers = response.data.filter(user => user.id !== currentUserId);
//       console.log("👥 Fetched Users (excluding current):", filteredUsers);
//       setUsers(filteredUsers);
//     } catch (err) {
//       console.error('❌ Error fetching users:', err);
//     }
//   };

//   const loadConversation = async (user) => {
//     setSelectedUser(user);
//     console.log("💬 Selected User:", user);

//     try {
//       const { data: existingConvos, error } = await supabase
//         .from('conversations')
//         .select('*')
//         .or(`and(user1_id.eq.${currentUserId},user2_id.eq.${user.id}),and(user1_id.eq.${user.id},user2_id.eq.${currentUserId})`);

//       if (error) throw error;

//       console.log("🔎 Existing conversations:", existingConvos);

//       let convoId;

//       if (existingConvos.length > 0) {
//         convoId = existingConvos[0].id;
//       } else {
//         const { data: newConvo, error: createErr } = await supabase
//           .from('conversations')
//           .insert([{ user1_id: currentUserId, user2_id: user.id }])
//           .select()
//           .single();

//         if (createErr) throw createErr;
//         console.log("✅ New conversation created:", newConvo);
//         convoId = newConvo.id;
//       }

//       setConversationId(convoId);
//       fetchMessages(convoId);
//       subscribeToMessages(convoId);

//     } catch (err) {
//       console.error('❌ Error getting/creating conversation:', err);
//     }
//   };

//   const fetchMessages = async (convoId) => {
//     try {
//       const { data, error } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('conversation_id', convoId)
//         .order('created_at', { ascending: true });

//       if (error) throw error;
//       console.log("💬 Messages fetched:", data);
//       setMessages(data);
//     } catch (err) {
//       console.error('❌ Error fetching messages:', err);
//     }
//   };

//   const subscribeToMessages = (convoId) => {
//     console.log("📡 Subscribing to convo:", convoId);
//     supabase
//       .channel('message-room-' + convoId)
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
//         if (payload.new.conversation_id === convoId) {
//           console.log("📥 New message received via realtime:", payload.new);
//           fetchMessages(convoId);
//         }
//       })
//       .subscribe();
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !conversationId) return;
//     try {
//       const { error } = await supabase.from('messages').insert([{
//         conversation_id: conversationId,
//         sender_id: currentUserId,
//         content: newMessage  // Update to 'content' instead of 'messages'
//       }]);

//       if (error) throw error;
//       console.log("📤 Message sent:", newMessage);
//       setNewMessage('');

//       fetchMessages(conversationId);
//     } catch (err) {
//       console.error('❌ Error sending message:', err);
//     }
//   };

//   if (!currentUserId) return null; // Prevent rendering if ID not loaded yet

//   return (
//     <div className="flex h-screen">
//       {/* Users List */}
//       <div className="w-1/4 border-r overflow-y-auto bg-gray-100">
//         <h2 className="text-xl font-bold p-4">Users</h2>
//         <ul>
//           {users.map(user => (
//             <li
//               key={user.id}
//               className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? 'bg-gray-300' : ''}`}
//               onClick={() => loadConversation(user)}
//             >
//               {user.name || user.email}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="w-3/4 flex flex-col">
//         {selectedUser ? (
//           <>
//             <div className="p-4 border-b font-semibold bg-gray-50">Chat with {selectedUser.name || selectedUser.email}</div>
//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {messages.map(msg => (
//                 <div
//                   key={msg.id}
//                   className={`p-2 rounded-md max-w-xs ${
//                     msg.sender_id === currentUserId ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black'
//                   }`}
//                 >
//                   {msg.content} {/* Updated 'messages' to 'content' */}
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 border-t flex">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 border rounded p-2"
//                 placeholder="Type your message..."
//               />
//               <button
//                 onClick={sendMessage}
//                 className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import supabase from '../supabaseClient';
// import axios from 'axios';

// const ChatPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   const queryParams = new URLSearchParams(window.location.search);
//   const tutorId = queryParams.get('tutor');
//   const sellerId = queryParams.get('seller');
//   const targetId = tutorId || sellerId;
//   const isTutor = !!tutorId;

//   // Token check
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     } else {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         setCurrentUserId(payload.id);
//       } catch (err) {
//         // console.error("❌ Invalid token:", err);
//         navigate('/login');
//       }
//     }
//     setIsLoading(false);
//   }, [navigate]);

//   useEffect(() => {
//     if (currentUserId) {
//       fetchUsers();
//     }
//   }, [currentUserId]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://student-x.onrender.com/api/users/all');
//       const filteredUsers = response.data.filter(user => user.id !== currentUserId);
//       setUsers(filteredUsers);
//     } catch (err) {
//       // console.error('❌ Error fetching users:', err);
//     }
//   };

//   useEffect(() => {
//     if (
//       currentUserId &&
//       users.length > 0 &&
//       targetId &&
//       targetId !== 'undefined'
//     ) {
//       const targetUser = users.find(user => String(user.id) === String(targetId));
//       if (targetUser) {
//         loadConversation(targetUser);
//       }
//     }
//   }, [currentUserId, users, targetId, isTutor]);

//   const loadConversation = async (user) => {
//     setSelectedUser(user);
//     try {
//       const { data: existingConvos, error } = await supabase
//         .from('conversations')
//         .select('*')
//         .or(`and(user1_id.eq.${currentUserId},user2_id.eq.${user.id}),and(user1_id.eq.${user.id},user2_id.eq.${currentUserId})`);

//       if (error) throw error;

//       let convoId;
//       if (existingConvos.length > 0) {
//         convoId = existingConvos[0].id;
//       } else {
//         const { data: newConvo, error: createErr } = await supabase
//           .from('conversations')
//           .insert([{ user1_id: currentUserId, user2_id: user.id }])
//           .select()
//           .single();

//         if (createErr) throw createErr;
//         convoId = newConvo.id;
//       }

//       setConversationId(convoId);
//       fetchMessages(convoId);
//       subscribeToMessages(convoId);
//     } catch (err) {
//       // console.error('❌ Error in conversation setup:', err);
//     }
//   };

//   const fetchMessages = async (convoId) => {
//     try {
//       const { data, error } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('conversation_id', convoId)
//         .order('created_at', { ascending: true });

//       if (error) throw error;
//       setMessages(data);
//     } catch (err) {
//       // console.error('❌ Error fetching messages:', err);
//     }
//   };

//   const subscribeToMessages = (convoId) => {
//     supabase
//       .channel('message-room-' + convoId)
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
//         if (payload.new.conversation_id === convoId) {
//           fetchMessages(convoId);
//         }
//       })
//       .subscribe();
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !conversationId) return;
//     try {
//       const { error } = await supabase.from('messages').insert([{
//         conversation_id: conversationId,
//         sender_id: currentUserId,
//         content: newMessage
//       }]);

//       if (error) throw error;
//       setNewMessage('');
//       fetchMessages(conversationId);
//     } catch (err) {
//       // console.error('❌ Error sending message:', err);
//     }
//   };

//   if (isLoading) return null;
//   if (!currentUserId) return null;

//   return (
//     <div className="flex h-screen">
//       {/* Users List */}
//       <div className="w-1/4 border-r overflow-y-auto bg-gray-100">
//         <h2 className="text-xl font-bold p-4">Users</h2>
//         <ul>
//           {users.map(user => (
//             <li
//               key={user.id}
//               className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? 'bg-gray-300' : ''}`}
//               onClick={() => loadConversation(user)}
//             >
//               {user.name || user.email}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="w-3/4 flex flex-col">
//         {selectedUser ? (
//           <>
//             <div className="p-4 border-b font-semibold bg-gray-50">Chat with {selectedUser.name || selectedUser.email}</div>
//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {messages.map(msg => (
//                 <div
//                   key={msg.id}
//                   className={`p-2 rounded-md max-w-xs ${
//                     msg.sender_id === currentUserId ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 border-t flex">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 border rounded p-2"
//                 placeholder="Type your message..."
//               />
//               <button
//                 onClick={sendMessage}
//                 className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import axios from 'axios';

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const tutorId = queryParams.get('tutor');
  const sellerId = queryParams.get('seller');
  const targetId = tutorId || sellerId;
  const isTutor = !!tutorId;

  // Token check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id);
      } catch (err) {
        navigate('/login');
      }
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://student-x.onrender.com/api/users/all');
      const filteredUsers = response.data.filter(user => user.id !== currentUserId);
      setUsers(filteredUsers);
    } catch (err) {
      // Handle error fetching users
    }
  };

  useEffect(() => {
    if (
      currentUserId &&
      users.length > 0 &&
      targetId &&
      targetId !== 'undefined'
    ) {
      const targetUser = users.find(user => String(user.id) === String(targetId));
      if (targetUser) {
        loadConversation(targetUser);
      }
    }
  }, [currentUserId, users, targetId, isTutor]);

  const loadConversation = async (user) => {
    setSelectedUser(user);
    try {
      const { data: existingConvos, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`and(user1_id.eq.${currentUserId},user2_id.eq.${user.id}),and(user1_id.eq.${user.id},user2_id.eq.${currentUserId})`);

      if (error) throw error;

      let convoId;
      if (existingConvos.length > 0) {
        convoId = existingConvos[0].id;
      } else {
        const { data: newConvo, error: createErr } = await supabase
          .from('conversations')
          .insert([{ user1_id: currentUserId, user2_id: user.id }])
          .select()
          .single();

        if (createErr) throw createErr;
        convoId = newConvo.id;
      }

      setConversationId(convoId);
      fetchMessages(convoId);
      subscribeToMessages(convoId);
    } catch (err) {
      // Handle error in conversation setup
    }
  };

  const fetchMessages = async (convoId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convoId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data);
    } catch (err) {
      // Handle error fetching messages
    }
  };

  const subscribeToMessages = (convoId) => {
    supabase
      .channel('message-room-' + convoId)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        if (payload.new.conversation_id === convoId) {
          fetchMessages(convoId);
        }
      })
      .subscribe();
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;
    try {
      const { error } = await supabase.from('messages').insert([{
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: newMessage
      }]);

      if (error) throw error;
      setNewMessage('');
      fetchMessages(conversationId);
    } catch (err) {
      // Handle error sending message
    }
  };

  if (isLoading) return null;
  if (!currentUserId) return null;

  return (
    <div className="flex h-screen">
      {/* Users List */}
      <div className="w-full sm:w-1/4 border-r overflow-y-auto bg-gray-100">
        <h2 className="text-xl font-bold p-4">Users</h2>
        <ul>
          {users.map(user => (
            <li
              key={user.id}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? 'bg-gray-300' : ''}`}
              onClick={() => loadConversation(user)}
            >
              <div className="truncate">{user.name || user.email}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-full sm:w-3/4 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b font-semibold bg-gray-50">Chat with {selectedUser.name || selectedUser.email}</div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-md max-w-xs ${
                    msg.sender_id === currentUserId ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border rounded p-2"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
