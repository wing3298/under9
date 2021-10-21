const MessageSelector = () => {

  //イベントが発生したエレメントを取得しひとつ前の兄弟を探してフォーカスする
  //自分の親に対して最初の子である場合は親にフォーカスする
  const prevId = (target: any): string => {
    return parentNode(target).id;
  };
  const parentNode = (target: any): any => {
    return target.parentNode.parentNode;
  };
  const nextId = (target: any): string => {
    //子階層の先頭NodeのIDを返す
    return target.id;
  };
  return {
    parentNode,
    prevId,
    nextId,
  };
};
export default MessageSelector();
