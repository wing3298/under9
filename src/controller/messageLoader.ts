import { callFunctions, readDoc } from "../service/infra/firebase";

const MESSAGE_COLLECTION = "messages/wave1";
const MESSGAE_FUNCTIONS = "messages";


const getRootMessage = (callback: Function) => {
  readDoc(MESSAGE_COLLECTION).then(result => {
    callback(result);
  });
};

const getMessage = () => {

};

/**
 * Firebase Functionsの呼び出し
 *
 * @param callback
 * @param params
 */
const getMessages = (callback: Function, params: Object) => {
  callFunctions(MESSGAE_FUNCTIONS, params).then((result) => {
    callback(result);
  });
};

//定義した関数をアプリで使えるようにする
export { getRootMessage, getMessages }
