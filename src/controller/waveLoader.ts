import { readDocList } from "../service/infra/firebase";

const WAVE_COLLECTION = "waves";


const getWaveListAll = (callback: Function) => {
  readDocList(WAVE_COLLECTION).then(result => {
    callback(result);
  });
};

export { getWaveListAll }
