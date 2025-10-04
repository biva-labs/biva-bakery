import ChatBotFormatMessages from "./chatbot-format-message"

type ChatBotMessageTypes = {
    message: {
        id: string
        sender: "user" | "bot"
        text: string
        timestamp: Date | string
    }
}

export default function ChatBotMessage({ message }: ChatBotMessageTypes) {
    return (
        <div
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[85%] md:max-w-[80%] p-3 rounded-lg ${message.sender === "user"
                        ? "bg-yellow-500 text-black"
                        : "bg-white text-gray-800 border"
                    }`}
            >
                <ChatBotFormatMessages text={message.text} />
                <p
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-black/70" : "text-gray-500"
                        }`}
                >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </div>
    )
}
