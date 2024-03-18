import React from "react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <div className="space-y-6">
          <div>
            <div>
              <h2 className="text-2xl font-bold">Cases to be Dealt With</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Customer:</span>
                  <span>Michael Johnson</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Case ID:</span>
                  <span>1245</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Summary:</span>
                  <span>Unable to log in to the account</span>
                </div>
              </div>
              <button className="w-full max-w-xs" size="lg" variant="outline">
                View Transcript
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-6">
          <div>
            <div>
              <h2 className="text-2xl font-bold">Resolved Cases</h2>
            </div>
            <div className="space-y-6">
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
          <div>
            <div>
              <h2 className="text-2xl font-bold">Resolved Cases</h2>
            </div>
            <div className="space-y-6">
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
  )
}

