export function base64ToFile(base64String: string, fileName: string) {
  const [prefix, data] = base64String.split(',');

  if (!prefix || !data) {
    throw new Error("Invalid Base64 string format");
  }

  const mimeTypeMatch = prefix.match(/:(.*?);/);
  if (!mimeTypeMatch) {
    throw new Error("MIME type could not be detected from Base64 string");
  }

  const mimeType = mimeTypeMatch[1];
  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mimeType });
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}
