export default function Chat() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <div className="m-auto  w-full max-w-2xl rounded-lg bg-[#1E1E1E] p-4">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-semibold text-white">Chatbot</h2>
          <SettingsIcon className="text-white" />
        </div>
        <p className="text-sm text-gray-400">
          Chatting with the Astra chatbot is a breeze! Simply type your questions or requests in a clear and concise
          manner. Responses are sourced from Astra documentation and a link for further reading is provided.
        </p>
        <div className="mt-4 h-[300px] overflow-y-auto rounded-md bg-[#252526] p-4">
          <div className="space-y-4">
            <div className="rounded-md bg-[#333333] p-4">
              <p className="text-sm text-white">
                In a Vector Database like Cassandra or Astra DB, similarity search works by representing data points as
                vectors in a high-dimensional space. These vectors capture the semantic features of the data rather than
                just the individual terms. When performing a similarity search, the system calculates the similarity
                between the query vector and the vectors representing the data in the database. The closer the vectors
                are in the high-dimensional space, the more similar the data points are considered to be. This method
                enables accurate and intuitive search results by focusing on the similarity of data points rather than
                just matching specific terms.
              </p>
            </div>
            <div className="flex items-end justify-end">
              <div className="rounded-md bg-[#8A2BE2] p-4">
                <p className="text-sm text-white">I'm sorry, I don't know the answer.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <input
            className="flex-1 rounded-md bg-[#333333] py-2 px-4 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Send a message..."
          />
          <button className="ml-2 bg-[#007ACC] py-2 px-4 text-white">Send</button>
        </div>
      </div>
    </div>
  )
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
