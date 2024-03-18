import React, { useContext, useState } from "react";
import { ChatContext } from "../ChatContext";
import { Button, Modal } from "antd";

export default function Dashboard() {
  const { chatState, setChatState, sentiment, setSentiment, cc } =
    useContext(ChatContext);
    const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const sendMessage = () =>{
    setChatState((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: message.trim(),
        sender: "bot",
      },
    ]);
    setMessage("");
  }
  return (
    <>
      <div className="mt-10 m-20 ">
        <div className="text-5xl font-bold">Customer Care</div>
        <div className="text-2xl font-semibold mt-6">
          Track and Manage Customers Progress
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 m-20 mt-10">
        <div>
          <div className="space-y-6">
            {cc && (
              <div className="bg-white rounded-lg p-6 shadow-lg hover:transition-transform hover:scale-105 ">
                <h2 className="text-4xl font-bold">Cases to be Dealt With</h2>
                <div className="mt-10">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Customer:</span>
                      <span>Shreyans</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Case ID:</span>
                      <span>124574294</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Summary:</span>
                      <span>Laptops not working</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Sentiment:</span>
                      <div
                        className={`rounded-full px-4 py-1 ${
                          sentiment === "Neutral"
                            ? "bg-gray-300"
                            : sentiment === "Good"
                            ? "bg-green-300"
                            : "bg-red-300"
                        }`}
                      >
                        <span
                          className={
                            sentiment === "Neutral"
                              ? "text-gray-700"
                              : sentiment === "Good"
                              ? "text-green-700"
                              : "text-red-700"
                          }
                        >
                          {sentiment}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={showModal}
                    className="w-[40] border-4 max-w-xs margin-auto px-[17px] py-[8px] mt-10 rounded-lg transition-all hover:bg-black hover:text-white hover:border-0 hover:scale-105"
                    size="lg"
                    variant="outline"
                  >
                    View Chat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
              <h2 className="text-4xl font-bold">Resolved Cases</h2>
              <div className="mt-10">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Customer:</span>
                    <span>Olivia Brown</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Case ID:</span>
                    <span>7890</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Summary:</span>
                    <span>Information about product features</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Sentiment:</span>
                    <span>Positive</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <h2 className="text-4xl font-bold ">Resolved Cases</h2>
              <div className="mt-10">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Customer:</span>
                    <span>William Lee</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Case ID:</span>
                    <span>4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Summary:</span>
                    <span>Issue with shipping address</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Sentiment:</span>
                    <span>Neutral</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Continued Chat"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex h-screen bg-[#121212]">
      <div className="m-auto  w-full max-w-2xl rounded-lg bg-[#1E1E1E] p-4">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-semibold text-white">Chatbot</h2>
        </div>
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
                    message.sender === "user"
                      ? "bg-[#333333] flex-start"
                      : "bg-[#8A2BE2] ml-auto flex-end"
                  } flex`}
                >
                  <p className="text-sm text-white">{message.message}</p>
                </div>
              </div>
            ))}
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
      </Modal>
    </>
  );
}
