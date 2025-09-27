import { AI_QUICK_MESSAGES } from "../../../data/chatbot-quick-messages"

type ChatBotQuickMessagesTypes = {
    handleQuickMessage: (message: string) => void
}

export default function ChatBotQuickMessages({ handleQuickMessage }: ChatBotQuickMessagesTypes) {
    return (
        <>
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
                {AI_QUICK_MESSAGES.map((message, index) => (
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
        </>
    )
}