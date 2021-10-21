const MessageInitialyzer = () => {
  const init = (target: any): JSON => {
    const id: string = Math.random().toString(36).slice(-8);
    target.msgId = id;
    return target;
  }
  return {
    init,
  }
};
export default MessageInitialyzer();
