import { useState, useContext, useRef, useEffect } from "react";
import { ChatContext } from "../ChatContext";
import axios from "axios";

export default function Chat() {
  const { chatState, setChatState } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState]);

  const fetchNode = async (results, prompt) => {
    try {
      const response = await axios.post("http://localhost:3001/replicate", {
        prompt,
        results,
      });
      console.log("Response data:", response.data.output);
      setChatState((prev) => [
        ...prev,
        {
          
          id: Date.now() + 1,
          message: response.data.output.join(" "),
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFlask = async (message) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/query", {
        query: message.trim(),
      });
      console.log(response.data.documents.join(" "));
      fetchNode(response.data.documents.join(","), message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      setChatState((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: message.trim(),
          sender: "user",
        },
      ]);
      fetchFlask(message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-[#121212]">
      <div className="m-auto  w-full max-w-2xl rounded-lg bg-[#1E1E1E] p-4">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-semibold text-white">Chatbot</h2>
          {/* SettingsIcon */}
        </div>
        <p className="text-sm text-gray-400">
          Chatting with the Astra chatbot is a breeze! Simply type your
          questions or requests in a clear and concise manner. Responses are
          sourced from Astra documentation and a link for further reading is
          provided.
        </p>
        <div className="mt-4 h-[500px] overflow-y-auto rounded-md bg-[#252526] p-4">
          <div className="space-y-4">
            {chatState.map((message,id) => (
              <div
              key={id}
                className={`rounded-md flex`}
              >
                <div
                  key={id}
                  className={`rounded-md p-4 ${
                    message.sender === "bot"
                      ? "bg-[#333333] flex-start"
                      : "bg-[#8A2BE2] ml-auto flex-end"
                  } flex`}
                >
                  <p className="text-sm text-white">{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-md bg-[#333333] py-2 px-4 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Send a message..."
          />
          <button
            onClick={() => sendMessage()}
            className="ml-2 bg-[#007ACC] py-2 px-4 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
