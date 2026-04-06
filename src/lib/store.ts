import { create } from "zustand";

// Chat Store
export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
  userIdent: string | null;
  addMessage: (message: ChatMessage) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  setSessionId: (id: string) => void;
  setUserIdent: (ident: string) => void;
}

const createWelcomeMessage = (): ChatMessage => ({
  id: "welcome",
  type: "bot",
  content:
    "Hello. I can help with services, pricing, timelines, and the right SMA page to visit next.",
  timestamp: new Date(),
});

const getOrCreateSessionId = (): string => {
  if (typeof window === "undefined") return "";
  const stored = sessionStorage.getItem("chat_session_id");
  if (stored) return stored;
  const newId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  sessionStorage.setItem("chat_session_id", newId);
  return newId;
};

const getOrCreateUserIdent = (): string => {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem("chat_user_ident");
  if (stored) return stored;
  const newIdent = `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  localStorage.setItem("chat_user_ident", newIdent);
  return newIdent;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [createWelcomeMessage()],
  isLoading: false,
  error: null,
  sessionId: null,
  userIdent: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearMessages: () =>
    set({
      messages: [createWelcomeMessage()],
      isLoading: false,
      error: null,
    }),
  setSessionId: (id: string) => set({ sessionId: id }),
  setUserIdent: (ident: string) => set({ userIdent: ident }),
}));

// Form Store
export interface FormState {
  contact: {
    name: string;
    email: string;
    company: string;
    phone: string;
    subject: string;
    message: string;
    serviceType: string;
    isLoading: boolean;
    error: string | null;
    success: boolean;
  };
  newsletter: {
    email: string;
    isLoading: boolean;
    error: string | null;
    success: boolean;
  };
  quote: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    message: string;
    isLoading: boolean;
    error: string | null;
    success: boolean;
  };
}

interface FormActions {
  updateContactField: (field: keyof FormState["contact"], value: string | boolean) => void;
  setContactLoading: (loading: boolean) => void;
  setContactError: (error: string | null) => void;
  setContactSuccess: (success: boolean) => void;
  resetContact: () => void;
  updateNewsletterField: (field: keyof FormState["newsletter"], value: string | boolean) => void;
  setNewsletterLoading: (loading: boolean) => void;
  setNewsletterError: (error: string | null) => void;
  setNewsletterSuccess: (success: boolean) => void;
  resetNewsletter: () => void;
  updateQuoteField: (field: keyof FormState["quote"], value: string | boolean) => void;
  setQuoteLoading: (loading: boolean) => void;
  setQuoteError: (error: string | null) => void;
  setQuoteSuccess: (success: boolean) => void;
  resetQuote: () => void;
}

const initialFormState: FormState = {
  contact: {
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
    isLoading: false,
    error: null,
    success: false,
  },
  newsletter: {
    email: "",
    isLoading: false,
    error: null,
    success: false,
  },
  quote: {
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    isLoading: false,
    error: null,
    success: false,
  },
};

export const useFormStore = create<FormState & FormActions>((set) => ({
  ...initialFormState,

  updateContactField: (field, value) =>
    set((state) => ({
      contact: { ...state.contact, [field]: value },
    })),
  setContactLoading: (loading) =>
    set((state) => ({
      contact: { ...state.contact, isLoading: loading },
    })),
  setContactError: (error) =>
    set((state) => ({
      contact: { ...state.contact, error },
    })),
  setContactSuccess: (success) =>
    set((state) => ({
      contact: { ...state.contact, success },
    })),
  resetContact: () =>
    set({
      contact: initialFormState.contact,
    }),

  updateNewsletterField: (field, value) =>
    set((state) => ({
      newsletter: { ...state.newsletter, [field]: value },
    })),
  setNewsletterLoading: (loading) =>
    set((state) => ({
      newsletter: { ...state.newsletter, isLoading: loading },
    })),
  setNewsletterError: (error) =>
    set((state) => ({
      newsletter: { ...state.newsletter, error },
    })),
  setNewsletterSuccess: (success) =>
    set((state) => ({
      newsletter: { ...state.newsletter, success },
    })),
  resetNewsletter: () =>
    set({
      newsletter: initialFormState.newsletter,
    }),

  updateQuoteField: (field, value) =>
    set((state) => ({
      quote: { ...state.quote, [field]: value },
    })),
  setQuoteLoading: (loading) =>
    set((state) => ({
      quote: { ...state.quote, isLoading: loading },
    })),
  setQuoteError: (error) =>
    set((state) => ({
      quote: { ...state.quote, error },
    })),
  setQuoteSuccess: (success) =>
    set((state) => ({
      quote: { ...state.quote, success },
    })),
  resetQuote: () =>
    set({
      quote: initialFormState.quote,
    }),
}));
