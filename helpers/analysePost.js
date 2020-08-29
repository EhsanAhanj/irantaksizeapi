const { RawPost } = require("../model/RawPost");

module.exports.analysePosts = async (posts) => {
  let i = 0;
  for (const post of posts) {
    const { id, user, caption, taken_at, code, media_type } = post;
    const { username, full_name, pk } = user;
    const { text } = caption;

    let cheak = await RawPost.find({ mediaId: id });
    switch (media_type) {
      //media tyapes of instagram
      case 1:
        if (!cheak.length) {
          const imageUrl = post.image_versions2.candidates[0].url;
          const newRawpost = new RawPost({
            mediaId: id,
            merchant: { username, userId: pk, full_name },
            caption: text,
            taken_at,
            code,
            media_type,
            images: [imageUrl],
          });
          await newRawpost.save();
        }
        break;

      case 2: {
        break;
      }
      case 8: {
        if (!cheak.length) {
          let images = [];
          for (const image of post.carousel_media) {
            if (image.media_type == 1) {
              const imageUrl = image.image_versions2.candidates[0].url;
              images.push(imageUrl);
            }
          }
          const newRawpost = new RawPost({
            mediaId: id,
            merchant: { username, userId: pk, full_name },
            caption: text,
            taken_at,
            code,
            media_type,
            images,
          });
          await newRawpost.save();
        }
        break;
      }
    }
  }
};
