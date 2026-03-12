export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file selected'));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
