import { env } from 'env';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  privateKey: env.IK_PRIVATE_KEY,
  publicKey: env.IK_PUBLIC_KEY,
  urlEndpoint: 'https://ik.imagekit.io/glkluvyhf/',
  uploadEndpoint: 'https://upload.imagekit.io/api/v1/files/upload',
});

export default imagekit;
