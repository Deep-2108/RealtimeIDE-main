import React, { useState, useRef, useEffect } from "react";
import "./ChatbotPanel.css";

const Avatar = ({ role }) => (
  <div className={`chatbot-avatar ${role}`}>{role === "user" ? "U" : "A"}</div>
);

const ChatbotPanel = ({ codeContext }) => {
  const initialMessages = [
    { role: "assistant", text: "Ask me anything about your code, compiler errors, or project setup.", id: Date.now() },
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [unread, setUnread] = useState(0);
  const [miniPos, setMiniPos] = useState({ right: 24, bottom: 24 });
  const historyRef = useRef(null);
  const abortRef = useRef(null);
  const clearRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartRef = useRef(null);
  const prevMessagesLen = useRef(messages.length);

  useEffect(() => {
    // Auto-scroll to bottom on new messages
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
    // unread tracking: if panel is collapsed and a new assistant message arrived, increment unread
    if (collapsed) {
      const prev = prevMessagesLen.current || 0;
      if (messages.length > prev) {
        const last = messages[messages.length - 1];
        if (last && last.role === "assistant") {
          setUnread((u) => u + 1);
        }
      }
    }
    prevMessagesLen.current = messages.length;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage, id: Date.now() }]);
    setLoading(true);
    setError("");

    // create abort controller so request can be cancelled
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, codeContext }),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error((data && (data.error || JSON.stringify(data))) || `Status ${response.status}`);
      }

      setMessages((prev) => [...prev, { role: "assistant", text: data?.reply || "(no reply)", id: Date.now() }]);
    } catch (err) {
      console.error(err);
      if (err.name === "AbortError") {
        if (!clearRef.current) {
          setError("Request cancelled");
          setMessages((prev) => [...prev, { role: "assistant", text: "Request cancelled.", id: Date.now() }]);
        }
      } else {
        setError(err.message || "Chat error");
        setMessages((prev) => [...prev, { role: "assistant", text: "I could not reach the chat service.", id: Date.now() }]);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
      clearRef.current = false;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    if (loading && abortRef.current) {
      clearRef.current = true;
      abortRef.current.abort();
    }

    setMessages(initialMessages);
    setError("");
    setUnread(0);
    setLoading(false);
  };

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  };

  // drag handlers for mini bubble
  const onMiniMouseDown = (e) => {
    draggingRef.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    dragStartRef.current = { startX, startY, ...miniPos };
    window.addEventListener("mousemove", onMiniMouseMove);
    window.addEventListener("mouseup", onMiniMouseUp);
  };

  const onMiniMouseMove = (e) => {
    if (!draggingRef.current) return;
    const { startX, startY, right, bottom } = dragStartRef.current;
    const dx = startX - e.clientX; // movement to left increases right
    const dy = e.clientY - startY; // moving down decreases bottom
    const newRight = Math.max(8, right + dx);
    const newBottom = Math.max(8, bottom + dy);
    setMiniPos({ right: newRight, bottom: newBottom });
  };

  const onMiniMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onMiniMouseMove);
    window.removeEventListener("mouseup", onMiniMouseUp);
  };

  // touch support
  const onMiniTouchStart = (e) => {
    const t = e.touches[0];
    draggingRef.current = true;
    dragStartRef.current = { startX: t.clientX, startY: t.clientY, ...miniPos };
    window.addEventListener("touchmove", onMiniTouchMove);
    window.addEventListener("touchend", onMiniTouchEnd);
  };

  const onMiniTouchMove = (e) => {
    if (!draggingRef.current) return;
    const t = e.touches[0];
    const { startX, startY, right, bottom } = dragStartRef.current;
    const dx = startX - t.clientX;
    const dy = t.clientY - startY;
    const newRight = Math.max(8, right + dx);
    const newBottom = Math.max(8, bottom + dy);
    setMiniPos({ right: newRight, bottom: newBottom });
  };

  const onMiniTouchEnd = () => {
    draggingRef.current = false;
    window.removeEventListener("touchmove", onMiniTouchMove);
    window.removeEventListener("touchend", onMiniTouchEnd);
  };

  if (collapsed) {
    return (
      <div
        className="chatbot-mini"
        onClick={() => {
          setCollapsed(false);
          setUnread(0);
        }}
        title="Open chat"
        onMouseDown={onMiniMouseDown}
        onTouchStart={onMiniTouchStart}
        style={{ right: `${miniPos.right}px`, bottom: `${miniPos.bottom}px` }}
      >
        <div className="chatbot-floating-icon">💬</div>
        {unread > 0 && <div className="chatbot-badge">{unread}</div>}
      </div>
    );
  }

  return (
    <>
      <div className="chatbot-overlay" onClick={() => setCollapsed(true)} />
      <div className={`chatbot-panel expanded right-dock`} role="dialog" aria-label="Code chat panel">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <strong>Code Chat</strong>
          <span className="chatbot-sub">AI assistant</span>
        </div>
        <div className="chatbot-controls">
          <button className="chatbot-btn" onClick={() => setCollapsed(true)} aria-label="Collapse">
            ✕
          </button>
          <button className="chatbot-btn" onClick={handleClear} aria-label="Clear chat">
            Clear
          </button>
        </div>
      </div>

      <div className="chatbot-history" ref={historyRef}>
        {messages.map((message) => (
          <div key={message.id} className={`chatbot-message-row ${message.role}`}>
            <Avatar role={message.role} />
            <div className="chatbot-message-bubble">
              <div className="chatbot-message-meta">{message.role === "user" ? "You" : "Assistant"}</div>
              <div className="chatbot-message-text">{message.text}</div>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="chatbot-error">{error}</div>}

      <div className="chatbot-input-row">
        <textarea
          className="chatbot-input"
          placeholder="Ask about the code, errors, or environment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={loading}
        />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {loading && (
            <button className="chatbot-cancel-button" onClick={handleCancel} aria-label="Stop request">
              Stop
            </button>
          )}
          <button className="chatbot-send-button" onClick={handleSend} disabled={loading || !input.trim()}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default ChatbotPanel;
