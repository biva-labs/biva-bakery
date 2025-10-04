import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import ChatBotTypingIndicator from "./chatbot-typing-indicator"
import ChatBotFormatMessages from "./chatbot-format-message"
import { AI_QUICK_MESSAGES } from "../../../data/chatbot-quick-messages"
import ChatBotQuickMessages from "./chatbot-quick-messages"
import ChatBotMessage from "./chatbot-message"

interface Message {
    id: string
    text: string
    sender: "user" | "bot"
    timestamp: Date
}

type ChatBotWindowTypes = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    messages: Message[]
    isTyping: boolean
    inputMessage: string
    setInputMessage: (value: string) => void
    handleSendMessage: () => void
    handleQuickMessage: (msg: string) => void
    handleKeyPress: (e: React.KeyboardEvent) => void
    messagesEndRef: React.RefObject<HTMLDivElement> | null;
}

export default function ChatBotWindow({
    setIsOpen,
    messages,
    isTyping,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    handleQuickMessage,
    handleKeyPress,
    messagesEndRef,
}: ChatBotWindowTypes) {
    return (
        <div className="fixed bottom-4 right-4 md:bottom-24 md:right-6 
                    w-80 h-96 md:w-96 md:h-[500px] lg:w-[450px] lg:h-[600px]
                    bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 
                    animate-in slide-in-from-bottom-2 duration-300">

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
                <Button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden bg-transparent hover:bg-black/10 text-black p-1 h-auto"
                >
                    <X size={20} />
                </Button>
            </div>


            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((message) => (
                    <ChatBotMessage message={message} />
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <ChatBotTypingIndicator />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>


            <div className="hidden md:block p-3 bg-gray-50 border-t border-b">
                <ChatBotQuickMessages handleQuickMessage={handleQuickMessage} />
            </div>



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
    )
}
