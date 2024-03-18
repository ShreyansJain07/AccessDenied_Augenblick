import { useState, useContext, useRef, useEffect } from "react";
import { ChatContext } from "../ChatContext";
import axios from "axios";
import {Link} from "react-router-dom"

export default function Chat() {
  const { chatState, setChatState,sentiment,setSentiment,setCc } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
const[botResponse,setbotResponse]=useState("")
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState]);
  const NewResponse = () => {
   
    if (botResponse.includes("customer care team")) {
      
      sendBotMessage("I'm redirecting you to our customer care team for assistance.");
    } else if (botResponse.includes("redirected")) {
     
      sendBotMessage("You've been redirected to another team for assistance.");
    } else if (botResponse.includes("not enough context")) {
      
      sendBotMessage("I'm sorry, but I need more context to assist you further.");
    }
  };
  useEffect(() => {
    NewResponse();
  }, [botResponse]);
  
  const fetchNode = async (results, prompt) => {
    try {
      const response = await axios.post("http://localhost:3001/replicate", {
        prompt,
        results,
      });
      console.log("Response data:", response.data.output);
      setbotResponse(response.data.output.join(" "));
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

  const fetchSentiment = async () => {
    const query = chatState
      .filter((msg) => msg.sender === "user")
      .map((msg) => msg.message)
      .join(" ");
  
    if (query.split(" ").length >= 3) {
      try {
        const response = await axios.post("http://localhost:3001/sentiment", {
          message: query,
        });
        console.log(response.data.output);
        setSentiment(response.data.output);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("Not enough user messages to analyze sentiment.");
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
      fetchSentiment(message);
      setMessage("");
    }
  };
  const sendBotMessage = async (message) => {
    if (message.trim() !== "") {
      setChatState((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: message.trim(),
          sender: "bot",
        },
      ]);
    }
  };
  
  return (
    <div className="flex h-screen bg-[#121212]">
      <div className="m-auto  w-full max-w-2xl rounded-lg bg-[#1E1E1E] p-4">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-semibold text-white">Chatbot</h2>
          {/* SettingsIcon */}
          <Link to="/dashboard"
            className="bg-red-400 hover:bg-green-400 text-white px-3 py-1 rounded-md font-semibold"
            onClick={() => {
              setCc(true);
              
            }}
          >
            Not Satisfied
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          Chatting with the Augenblick chatbot is a breeze! Simply type your
          questions or requests in a clear and concise manner.
         
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
