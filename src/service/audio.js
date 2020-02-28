import RNFetchBlob from 'rn-fetch-blob';

export const downloadFile = url => {
  let dirs = RNFetchBlob.fs.dirs;

  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', url, { Accept: 'audio/mp3', 'Transfer-Ecoding': 'chunked' })
    .then(res => {
      const NEW_FILE_PATH = RNFetchBlob.fs.dirs.MusicDir + '/teste.mp3';

      RNFetchBlob.fs.writeFile(NEW_FILE_PATH, response);
      console.warn('The file saved to ', res.path());
    })
    .catch(err => {
      console.warn('The file err ', err);
    });
  // RNFetchBlob.config({
  //   // DCIMDir is in external storage
  //   path: dirs.DCIMDir + '/music.mp3',
  // })
  //   .fetch('GET', url)
  //   .then(res =>
  //     RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'audio/mpeg' }])
  //   )
  //   .then(respo => {
  //     // scan file success
  //     console.warn('foi', respo);
  //     console.log('The file saved to ', respo.path());

  //     const NEW_FILE_PATH = RNFetchBlob.fs.dirs.MusicDir + '/teste.mp3';

  //     RNFetchBlob.fs.writeFile(NEW_FILE_PATH, response);
  //   })
  //   .catch(err => {
  //     // scan file error
  //     console.warn('err', err);
  //   });
  // .then(res =>
  //   RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'audio/mpeg' }])
  // )
  // .then(() => {
  //   // scan file success
  //   console.warn('foi');
  // })
  // .catch(err => {
  //   // scan file error
  //   console.warn('err', err);
  // });
  // return axios
  //   .request({
  //     responseType: 'arraybuffer',
  //     url,
  //     method: 'get',
  //     headers: {
  //       'Content-Type': 'audio/mpeg',
  //     },
  //   })
  //   .then(result => {
  //     const outputFilename = '/tmp/file.mp3';
  //     fs.writeFileSync(outputFilename, result.data);
  //     return outputFilename;
  //   });
  // return null; //RNFetchBlob.fetch('POST', url, {});
};

export function savePDF(pdf) {
  RNFetchBlob.fs.writeFile(NEW_FILE_PATH, pdf, 'utf8');
}
