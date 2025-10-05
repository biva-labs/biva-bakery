import { Button } from "../ui/button"
import { MessageCircle, X } from "lucide-react"

type ChatBotButtonTypes = {
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
};

export default function ChatBotButton({ setIsOpen, isOpen }: ChatBotButtonTypes) {
    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            <Button
                aria-label="Chatbot Button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black 
                     shadow-lg transition-all duration-300 ${isOpen ? 'rotate-180' : 'hover:scale-110'
                    }`}
            >
                {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
            </Button>
        </div>
    )
}