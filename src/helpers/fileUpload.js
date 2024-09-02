export const fileUpload = async (file) => {
  if (!file) throw new Error('No tenemos ningun archivo a subir');

  const cloudUrl =
    'https://api.cloudinary.com/v1_1/dcf2mlfo1/auto/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'react-journal');
  formData.append('public_id', 'udemy');
  formData.append('api_key', 357383512288624);
  try {
    const resp = await fetch(cloudUrl, { method: 'POST', body: formData });
    if (!resp.ok) throw new Error('No se pudo subir archivo');
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
