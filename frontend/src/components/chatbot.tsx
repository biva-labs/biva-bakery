
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, MessageCircle, Send } from 'lucide-react';
import { useAi } from '@/hooks/useAi';

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
  
  // Use the AI hook
  const aiMutation = useAi();

  // Quick message options
  const quickMessages = [
    "What are your opening hours?",
    "How can I book a table?", 
    "Tell me about events",
    "What's on the menu?",
    "Hotel booking info",
    "Contact information",
    "Location and directions",
    "Special offers today"
  ];

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

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg max-w-[200px]">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-xs text-gray-500">Bot is typing...</span>
    </div>
  );

  // Component to render formatted message content
  const FormattedMessage = ({ text }: { text: string }) => {
    return (
      <div 
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black 
                     shadow-lg transition-all duration-300 ${
            isOpen ? 'rotate-180' : 'hover:scale-110'
          }`}
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-24 md:right-6 
                        w-80 h-96 
                        md:w-96 md:h-[500px] 
                        lg:w-[450px] lg:h-[600px]
                        bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 
                        animate-in slide-in-from-bottom-2 duration-300">
          {/* Chat Header */}
          <div className="bg-yellow-500 text-black p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Biva Assistant</h3>
                <p className="text-xs opacity-80">Online now</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <Button
              onClick={() => setIsOpen(false)}
              className="md:hidden bg-transparent hover:bg-black/10 text-black p-1 h-auto"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  <FormattedMessage text={message.text} />
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-black/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Messages - Only visible on medium screens and up */}
          <div className="hidden md:block p-3 bg-gray-50 border-t border-b">
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickMessages.slice(0, 4).map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(message)}
                  className="text-xs bg-white hover:bg-yellow-100 border border-gray-200 
                           rounded-full px-3 py-1.5 transition-colors duration-200"
                >
                  {message}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3"
                disabled={!inputMessage.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}