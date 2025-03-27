import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatbotCard = () => {
  const [chatHistory, setChatHistory] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const generateAnswer = async (e) => {
    console.log(
      "API Key:",
      import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
    );

    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");

    setChatHistory((prev) => [
      ...prev,
      { text: currentQuestion, sender: "user" },
    ]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { text: aiResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);

      let errorMessage = "Sorry, something went wrong. Please try again!";
      if (error.response) {
        if (error.response.status === 503) {
          errorMessage =
            "The API server is currently unavailable. Please try again later!";
        } else if (error.response.status === 404) {
          errorMessage = "Invalid API endpoint. Please check your API URL.";
        }
      }
      
      setChatHistory((prev) => [
        ...prev,
        { text: errorMessage, sender: "bot" },
      ]);
    }

    setGeneratingAnswer(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col h-[400px]">
        <div className="px-4 py-3 border-b dark:border-zinc-700 bg-blue-500 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Raksha Chatbot</h2>
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Online
            </div>
          </div>
        </div>
        <div
          className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2 bg-zinc-100 dark:bg-zinc-800"
          ref={chatContainerRef}
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`chat-message max-w-xs rounded-lg px-3 py-1.5 text-sm ${
                msg.sender === "user"
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-zinc-500 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div className="flex gap-2">
            <input
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateAnswer(e)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
              onClick={generateAnswer}
              disabled={generatingAnswer}
            >
              {generatingAnswer ? "Generating..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCard;
