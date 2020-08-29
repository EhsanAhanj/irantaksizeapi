const fs = require('fs');

const Path = require('path');

const Axios = require('axios');

exports = downloadImage = async (url, merchantName) => {
  const date = new Date();

  const pathdir = 'postImage' + `/${merchantName}/`;
  fs.mkdirSync(pathdir, { recursive: true });
  const path = Path.resolve(pathdir, `${date.toISOString()}_${merchantName}.jpg`);
  const reletiveLink = path.split('postImage')[1];
  const writer = fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve(reletiveLink));
    writer.on('error', reject);
  });
};
