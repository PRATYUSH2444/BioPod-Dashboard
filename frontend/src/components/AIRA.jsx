import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/aira/chat";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning ☀️";
  if (hour < 18) return "Good afternoon 🌤️";
  return "Good evening 🌙";
}

export default function AIRA() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `${getGreeting()}! I'm AIRA 🤖  
I can help with environment status, health score, fan state, feed efficiency, and safety insights.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const interactedRef = useRef(false);

  /* ================= AUTO SCROLL (SAFE) ================= */
  useEffect(() => {
    if (!interactedRef.current) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;

    interactedRef.current = true;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { message: userMsg.text });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Unable to reach BIOPOD AI service." },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      {/* ================= FLOATING BUTTON ================= */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-black font-bold shadow-xl flex items-center justify-center hover:scale-105 transition"
        >
          🤖
        </button>
      )}

      {/* ================= CHAT PANEL ================= */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[480px] bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold">
                AI
              </div>
              <div>
                <p className="text-sm font-semibold text-green-400">AIRA</p>
                <p className="text-xs text-zinc-400">AI Risk Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm scrollbar-thin scrollbar-thumb-zinc-700">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-2 rounded-2xl leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 ml-auto text-white rounded-br-sm"
                    : "bg-zinc-800 text-zinc-200 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-zinc-500 italic">
                AIRA is thinking…
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask AIRA about BIOPOD…"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-xl text-sm font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export { AIRA };