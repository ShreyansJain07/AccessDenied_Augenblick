import { useState, useContext, useRef, useEffect } from "react";
import { ChatContext } from "../ChatContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const loaderStyle = {
  borderColor: "lightgray",
};

export default function Chat() {
  const { chatState, setChatState, sentiment, setSentiment, setCc } =
    useContext(ChatContext);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [botResponse, setbotResponse] = useState("");
  const [respBot, setRespBot] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState]);
  const NewResponse = () => {
    if (botResponse.includes("customer care team")) {
      sendBotMessage(
        "I'm redirecting you to our customer care team for assistance."
      );
    } else if (botResponse.includes("redirected")) {
      sendBotMessage("You've been redirected to another team for assistance.");
    } else if (botResponse.includes("not enough context")) {
      sendBotMessage(
        "I'm sorry, but I need more context to assist you further."
      );
    }
  };
  useEffect(() => {
    NewResponse();
  }, [botResponse]);

  // const fetchNode = async (results, prompt) => {
  //   try {
  //     const response = await axios.post("http://localhost:3001/replicate", {
  //       prompt,
  //       results,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     // Extract the output from the response
  //     const output = response.data.output.join(" ");
  //     correctOutputWithEdenAI(output)
  //     // Use Eden AI to correct indentation and text
  //     console.log(output);

  //     // Update bot response state with the corrected output

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // // Function to correct output using Eden AI
  // const correctOutputWithEdenAI = async (output) => {
  //   try {
  //     const response = await fetch(
  //       "https://api.edenai.run/v2/text/generation",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjA4OTEzZGYtODBiZS00ZmRiLWE0ZDMtMjI3NzQyYjg0MmJjIiwidHlwZSI6ImFwaV90b2tlbiJ9.AW10Hz3bl4eA3SpD8GrndUUCB9lo6BBhInt_O3DuJTk`,
  //         },
  //         body: JSON.stringify({
  //           text: output,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setbotResponse(data.corrected_text);

  //     // Update chat state with the corrected output
  //     setChatState((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now() + 1,
  //         message: data.corrected_text,
  //         sender: "bot",
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error correcting output with Eden AI:", error);
  //     return output; // Return original output if an error occurs
  //   }
  // };

  const fetchNode = async (results, prompt) => {
    try {
      const response = await axios.post("http://localhost:3001/replicate", {
        prompt,
        results,
      });
      console.log("Response data:", response.data.output);
      generateText(response.data.output.join(" "));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async function generateText(text) {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGZjMDdiMWItZDVhYS00MDEwLWJjMzEtYjRjMGJjNmNmOWJkIiwidHlwZSI6ImFwaV90b2tlbiJ9.FRpoCr6xHdRLkoW_ysOWdzAqW7gS-blH9cdHAo3NAaY",
      },
      data: {
        providers: "google",
        text: `correct this ${text} properly without asterisk and should be accurate`,
        temperature: 0.2,
        max_tokens: 1024,
        fallback_providers: "",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setRespBot(false);
      setChatState((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          message: response.data.google.generated_text,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

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
      setRespBot(true);
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
          <Link
            to="/dashboard"
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
            {chatState.map((message, id) => (
              <div key={id} className={`rounded-md flex`}>
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
            {respBot && (
              <div
                className={`rounded-md p-4 ${
                  true
                    ? "bg-[#333333]"
                    : "bg-[#8A2BE2] "
                } flex w-[15%]`}
              >
                <SyncLoader style={loaderStyle} color="#8A2BE2" />
              </div>
            )}

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
            className="ml-2 bg-[#007ACC] py-2 px-4 rounded-md text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
