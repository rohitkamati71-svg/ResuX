import { create } from 'zustand';

// Types for AI
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PuterChatOptions {
  model?: string;
  temperature?: number;
}

interface AIResponse {
  message: {
    content: string | { text: string }[];
  };
}

interface PuterStore {
  auth: any;
  isLoading: boolean;
  fs: any;
  kv: any;
  ai: {
    chat: (
      prompt: string | ChatMessage[],
      options?: PuterChatOptions
    ) => Promise<AIResponse | undefined>;
    feedback: (path: string, message: string) => Promise<AIResponse | undefined>;
    img2txt: (image: string | File | Blob, testMode?: boolean) => Promise<any>;
  };
}

// Utility to get puter instance
const getPuter = () => {
  if (typeof window !== 'undefined' && (window as any).puter) {
    return (window as any).puter;
  }
  return null;
};

export const usePuterStore = create<PuterStore>((set, get) => {
  const chat = async (
    prompt: string | ChatMessage[],
    options?: PuterChatOptions
  ) => {
    const puter = getPuter();
    if (!puter) {
      console.error('Puter.js not available');
      return;
    }
    try {
      return (await puter.ai.chat(
        prompt,
        undefined, // imageURL
        undefined, // testMode
        { model: 'gpt-5', ...(options || {}) } // ensure GPT-5
      )) as AIResponse;
    } catch (err) {
      console.error('AI chat error:', err);
      return;
    }
  };

  const feedback = async (path: string, message: string) => {
    const puter = getPuter();
    if (!puter) {
      console.error('Puter.js not available');
      return;
    }
    try {
      return (await puter.ai.feedback(
        path,
        message,
        { model: 'gpt-5' } // force GPT-5 here too
      )) as AIResponse;
    } catch (err) {
      console.error('AI feedback error:', err);
      return;
    }
  };

  const img2txt = async (image: string | File | Blob, testMode?: boolean) => {
    const puter = getPuter();
    if (!puter) {
      console.error('Puter.js not available');
      return;
    }
    try {
      return await puter.ai.img2txt(image, testMode);
    } catch (err) {
      console.error('img2txt error:', err);
      return;
    }
  };

  return {
    auth: null,
    isLoading: false,
    fs: null,
    kv: null,
    ai: {
      chat,
      feedback,
      img2txt,
    },
  };
});
