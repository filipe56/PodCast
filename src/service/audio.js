import RNFetchBlob from 'rn-fetch-blob';

export const downloadFile = url => {
  let dirs = RNFetchBlob.fs.dirs;
  return RNFetchBlob.config({
    fileCache: true,
    path: dirs.DocumentDir + `/${url}`,
  }).fetch('GET', url, {});
};
