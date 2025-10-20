export async function uploadImageToCloudinary(
  uri,
  {
    cloudName = 'dpcsrgpyr',    
    uploadPreset = 'tictonto',      
    folder = 'tictonto/avatars',
  } = {}
) {
  const api = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const form = new FormData();
  form.append('file', {
    uri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  form.append('upload_preset', uploadPreset);
  if (folder) form.append('folder', folder);

  const res = await fetch(api, { method: 'POST', body: form });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Cloudinary error: ${txt}`);
  }
  const json = await res.json();

  return json; 
}
