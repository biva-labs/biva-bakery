
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { X, MessageCircle, Send } from 'lucide-react';
import { useAi } from '@/hooks/useAi';
import { AI_QUICK_MESSAGES } from "../../../data/chatbot-quick-messages"
import ChatBotButton from './chatbot-button';
import ChatBotWindow from './chatbot-window';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Biva Bakery. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiMutation = useAi();


  //   "What are your opening hours?",
  //   "How can I book a table?", 
  //   "Tell me about events",
  //   "What's on the menu?",
  //   "Hotel booking info",
  //   "Contact information",
  //   "Location and directions",
  //   "Special offers today"
  // ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = async (userMessage: string) => {
    setIsTyping(true);

    try {
      // Use the AI mutation to get response from backend
      const response = await aiMutation.mutateAsync(userMessage);

      const newMessage: Message = {
        id: Date.now().toString(),
        text: response.content,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      // Fallback response if AI fails
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I\'m having trouble responding right now. Please try again or contact our support team.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await simulateBotResponse(inputMessage);
    setInputMessage('');
  };

  const handleQuickMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await simulateBotResponse(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };




  return (
    <>

      <ChatBotButton setIsOpen={setIsOpen} isOpen={isOpen} />


      {isOpen && (
        <ChatBotWindow
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          messages={messages}
          isTyping={isTyping}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          handleQuickMessage={handleQuickMessage}
          handleKeyPress={handleKeyPress}
          messagesEndRef={messagesEndRef}
        />
      )}



    </>
  );
}