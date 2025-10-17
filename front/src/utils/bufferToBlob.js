export const bufferToBlob =  (buffer) => {
  if(!buffer) return null;

  const uint8Array = new Uint8Array(buffer.data);

  const blob = new Blob([uint8Array], {type: 'image/webp'});
  const url = URL.createObjectURL(blob);

  return url;
}