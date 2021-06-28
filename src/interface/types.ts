export interface Message {
    userName: string;
    content: string;
}

export interface ChatProps {
    msgHistory: Message[];
    message: string;
    setMessage: Function;
    // useFinalInputMsg: () => void; 
}