import React, { useState } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'MAI Real Estate Support',
      content: 'Welcome to MAI Real Estate! How can we help you today?',
      timestamp: new Date(),
      read: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: `${Date.now()}`,
        sender: 'You',
        content: newMessage,
        timestamp: new Date(),
        read: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <MessageCircle className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <h1 className="text-3xl font-light text-gray-900 dark:text-white">Messages</h1>
        </div>

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
      </div>
    </div>
  );
}

export default Messages;
