function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="" alt="user avatar" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">
        Hey! how is it going?
      </div>
      <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
        12:44pm
      </div>
    </div>
  );
}

export default Message;
