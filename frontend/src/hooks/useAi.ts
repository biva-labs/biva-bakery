import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface AiQueryResponse {
    content: string;
}

// Function to format AI response content
const formatAiContent = (content: string): string => {
    // Replace \n with actual line breaks for display
    let formatted = content.replace(/\\n/g, '\n');
    
    // Handle numbered lists (convert "1. " to actual line breaks)
    formatted = formatted.replace(/(\d+\.\s)/g, '\n$1');
    
    // Handle bullet points
    formatted = formatted.replace(/(\*\s|-\s)/g, '\n• ');
    
    // Handle headings (# ## ###)
    formatted = formatted.replace(/^(#{1,3})\s(.+)$/gm, (_, hashes, text) => {
        const level = hashes.length;
        if (level === 1) return `<h3 class="text-lg font-bold mt-2 mb-1">${text}</h3>`;
        if (level === 2) return `<h4 class="text-base font-bold mt-2 mb-1">${text}</h4>`;
        return `<h5 class="text-sm font-bold mt-2 mb-1">${text}</h5>`;
    });
    
    // Handle bold text (**text** or __text__)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Handle italic text (*text* or _text_)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Handle links - make URLs clickable
    formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>');
    
    // Clean up multiple consecutive line breaks
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // Convert line breaks to HTML breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Trim leading/trailing whitespace
    formatted = formatted.trim();
    
    return formatted;
};

export function useAi() {
    return useMutation<AiQueryResponse, Error, string>({
        mutationFn: async (query: string) => {
            try {
                const response = await instance.post<AiQueryResponse>("/biva-ai", {
                    query
                });
                
                // Format the content before returning
                const formattedContent = formatAiContent(response.data.content);
                
                return {
                    content: formattedContent
                };
            } catch (error: any) {
                // Handle different error types
                if (error.response?.data?.error) {
                    throw new Error(error.response.data.error);
                }
                throw new Error("Failed to get AI response");
            }
        },
        onError: (error) => {
            console.error("AI Query Error:", error.message);
        }
    });
}