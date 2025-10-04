

export default function ChatBotFormatMessages({ text }: { text: string }) {
    return (
        <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    )
}