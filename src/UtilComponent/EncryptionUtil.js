import React from 'react';

const EncryptionUtil = () => {
  const encrypt = async (data) => {
    try {
      // Fetch the public key from the .env file
      const publicKey = process.env.REACT_APP_PUBLIC_KEY;

      if (!publicKey) {
        console.error('Public key not found in .env file.');
        return null;
      }

      const cryptoKey = await crypto.subtle.importKey(
        'spki',
        new TextEncoder().encode(publicKey),
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        false,
        ['encrypt']
      );

      const dataBytes = new TextEncoder().encode(JSON.stringify(data));
      const encryptedBytes = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, cryptoKey, dataBytes);

      return btoa(String.fromCharCode(...new Uint8Array(encryptedBytes)));
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  };

  return { encrypt };
};

export default EncryptionUtil;
