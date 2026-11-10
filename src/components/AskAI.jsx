import { useEffect, useRef, useState } from 'react';
import { Bot, RotateCcw, Send, X } from 'lucide-react';
import { ChatApiError, sendChat } from '../services/chatApi';

const suggestions = [
  'What does Didula do?',
  'Tell me about NUMBERBOUND',
  'What projects has Didula built?',
  'How can I get in touch?'
];
const maxMessageLength = 2000;

function Sources({ sources }) {
  if (!sources?.length) return null;
  return <details className="ask-ai-sources">
    <summary>{sources.length === 1 ? '1 source' : `${sources.length} sources`}</summary>
    <ul>{sources.map((source, index) => <li key={`${source.document}-${index}`}>{source.category.replace(/[_-]+/g, ' ')}</li>)}</ul>
  </details>;
}

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const sessionRef = useRef(null);
  const controllerRef = useRef(null);
  const sendingRef = useRef(false);
  const generationRef = useRef(0);

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); triggerRef.current?.focus(); };
  }, [open]);

  const ask = async (value, retryId = null) => {
    const trimmed = value.trim();
    if (!trimmed || sendingRef.current) return;
    const id = retryId || crypto.randomUUID();
    if (trimmed.length > maxMessageLength) {
      setMessages(current => [...current, { id, question: trimmed, answer: { text: `Please keep questions under ${maxMessageLength} characters.`, failed: false } }]);
      return;
    }

    if (retryId) setMessages(current => current.map(message => message.id === id ? { ...message, answer: null } : message));
    else setMessages(current => [...current, { id, question: trimmed, answer: null }]);
    setQuestion('');
    setSending(true);
    sendingRef.current = true;
    const generation = generationRef.current;
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const result = await sendChat(trimmed, sessionRef.current, { signal: controller.signal });
      if (generation !== generationRef.current) return;
      sessionRef.current = result.sessionId;
      setMessages(current => current.map(message => message.id === id
        ? { ...message, answer: { text: result.answer, sources: result.sources } }
        : message));
    } catch (failure) {
      if (generation !== generationRef.current || failure?.name === 'AbortError') return;
      const error = failure instanceof ChatApiError ? failure : new ChatApiError('The assistant could not answer. Please try again.');
      if (error.sessionExpired) sessionRef.current = null;
      setMessages(current => current.map(message => message.id === id
        ? { ...message, answer: { text: error.message, failed: !error.sessionExpired } }
        : message));
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        sendingRef.current = false;
        setSending(false);
      }
    }
  };

  const newConversation = () => {
    generationRef.current += 1;
    controllerRef.current?.abort();
    controllerRef.current = null;
    sendingRef.current = false;
    sessionRef.current = null;
    setSending(false);
    setMessages([]);
    setQuestion('');
    inputRef.current?.focus();
  };

  return <>
    <button ref={triggerRef} className="ask-ai-trigger" type="button" onClick={() => setOpen(true)} aria-label="Ask AI" aria-haspopup="dialog" aria-expanded={open} title="Ask AI">
      <Bot size={22} strokeWidth={1.8} aria-hidden="true" /><span>Ask AI</span>
    </button>
    {open && <div className="ask-ai-overlay" onPointerDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="ask-ai-panel" role="dialog" aria-modal="true" aria-labelledby="ask-ai-title" aria-describedby="ask-ai-description">
        <div className="ask-ai-header"><div><h2 id="ask-ai-title">Ask AI</h2><p id="ask-ai-description">Ask about Didula, his projects, and how to get in touch.</p></div><div className="ask-ai-header-actions"><button type="button" onClick={newConversation} aria-label="Start a new conversation" title="New conversation"><RotateCcw size={17} /></button><button type="button" onClick={() => setOpen(false)} aria-label="Close Ask AI"><X size={19} /></button></div></div>
        <div className="ask-ai-conversation" aria-live="polite" aria-busy={sending}>
          {!messages.length && <p className="ask-ai-intro">What would you like to know?</p>}
          {messages.map(message => <div className="ask-ai-exchange" key={message.id}><p className="ask-ai-question">{message.question}</p><div className="ask-ai-answer"><p>{message.answer?.text || 'Thinking…'}</p><Sources sources={message.answer?.sources} />{message.answer?.failed && <button type="button" className="ask-ai-retry" onClick={() => ask(message.question, message.id)} disabled={sending}>Retry</button>}</div></div>)}
        </div>
        {!messages.length && <div className="ask-ai-suggestions">{suggestions.map(item => <button key={item} type="button" disabled={sending} onClick={() => ask(item)}>{item}</button>)}</div>}
        <form className="ask-ai-form" onSubmit={event => { event.preventDefault(); ask(question); }}><input ref={inputRef} value={question} onChange={event => setQuestion(event.target.value)} maxLength={maxMessageLength} placeholder="Ask about the portfolio" aria-label="Ask about the portfolio" /><button type="submit" disabled={sending || !question.trim()} aria-label="Send question"><Send size={18} /></button></form>
      </section>
    </div>}
  </>;
}
