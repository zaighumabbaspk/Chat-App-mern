import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
// import Message from "./Message";
  import Message from ',/message';
import useListenMessages from "../../hooks/useListenMessages";
// import useConversation from "../../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto h-full">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;

// import useGetMessages from "../../hooks/useGetMessages";
// import useConversation from "../../../zustand/useConversation";

// const Messages = () => {
//   const { messages, loading } = useGetMessages(); // Fetch messages
//   const { selectedConversation } = useConversation(); // Get selected chat

//   // Filter messages to show only those related to the selected conversation
//   const filteredMessages = messages.filter(
//     (msg) =>
//       msg.senderId === selectedConversation._id ||
//       msg.receiverId === selectedConversation._id
//   );

//   return (
//     <div className="flex-1 overflow-auto px-4">
//       {loading ? (
//         <p>Loading messages...</p>
//       ) : filteredMessages.length > 0 ? (
//         filteredMessages.map((msg) => (
//           <div key={msg._id} className="message">
//             <p>{msg.text}</p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400">No messages yet.</p>
//       )}
//     </div>
//   );
// };

// export default Messages;
