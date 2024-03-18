import React, { useContext } from "react";
import { ChatContext } from "../ChatContext";

export default function Dashboard() {
  const { chatState, setChatState, sentiment, setSentiment } =
    useContext(ChatContext);
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
                  className="w-[40] border-4 max-w-xs margin-auto px-[17px] py-[8px] mt-10 rounded-lg transition-all hover:bg-black hover:text-white hover:border-0 hover:scale-105"
                  size="lg"
                  variant="outline"
                >
                  View Chat
                </button>
              </div>
            </div>
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
    </>
  );
}
