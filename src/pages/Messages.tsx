import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserStore } from '../stores/userStore';
import { toast } from 'sonner';

export function Messages() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { messages, sendMessage, markMessageAsRead } = useUserStore();
  const [newMessage, setNewMessage] = useState('');
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.error('Please login to view your messages');
    }
  }, [isAuthenticated, navigate]);
  
  // Mark all messages as read when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      messages.forEach(msg => {
        if (!msg.read) {
          markMessageAsRead(msg.id);
        }
      });
    }
  }, [isAuthenticated, messages, markMessageAsRead]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, true);
      setNewMessage('');
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <MessageCircle className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-light text-gray-900 dark:text-white">Messages</h1>
          </div>
          
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Please login to view your messages
            </p>
            <Link 
              to="/" 
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="h-[500px] overflow-y-auto p-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start gap-4 mb-6 ${
                  msg.sender === 'You' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className={`max-w-[70%] ${
                  msg.sender === 'You' 
                    ? 'bg-blue-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tr-xl rounded-bl-xl rounded-br-xl'
                } p-4`}>
                  <p>{msg.content}</p>
                  <span className="text-xs mt-2 opacity-60">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            </div>
            
            <div className="border-t dark:border-gray-700 p-4 flex items-center gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
