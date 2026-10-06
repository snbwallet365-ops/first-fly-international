function tokenKeyBytes() {
  const value = Deno.env.get('GOOGLE_TOKEN_ENCRYPTION_KEY');
  if (!value) throw new Error('GOOGLE_TOKEN_ENCRYPTION_KEY is not configured.');
  if (/^[a-f0-9]{64}$/i.test(value)) {
    return Uint8Array.from(value.match(/.{2}/g)!.map((pair) => parseInt(pair, 16)));
  }
  const decoded = Uint8Array.from(atob(value.trim()), (character) => character.charCodeAt(0));
  if (decoded.length !== 32) throw new Error('GOOGLE_TOKEN_ENCRYPTION_KEY must be 32 random bytes encoded as base64 or 64 hex characters.');
  return decoded;
}

function toBase64(bytes: Uint8Array) {
  let binary = '';
  for (let start = 0; start < bytes.length; start += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(start, Math.min(start + 0x8000, bytes.length)));
  }
  return btoa(binary);
}

export function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

export function toBase64Url(bytes: Uint8Array) {
  return toBase64(bytes).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');
}

export function randomHex(size = 32) {
  return Array.from(crypto.getRandomValues(new Uint8Array(size)), (value) => value.toString(16).padStart(2, '0')).join('');
}

export async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
}

export async function encryptSecret(value: string) {
  const key = await crypto.subtle.importKey('raw', tokenKeyBytes(), { name: 'AES-GCM' }, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(value));
  return { ciphertext: toBase64(new Uint8Array(ciphertext)), iv: toBase64(iv) };
}

export async function decryptSecret(ciphertext: string, ivValue: string) {
  const key = await crypto.subtle.importKey('raw', tokenKeyBytes(), { name: 'AES-GCM' }, false, ['decrypt']);
  const clear = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromBase64(ivValue) }, key, fromBase64(ciphertext));
  return new TextDecoder().decode(clear);
}

export function encodeUtf8Base64Url(value: string) {
  return toBase64Url(new TextEncoder().encode(value));
}

export function bytesToBase64(bytes: Uint8Array) {
  return toBase64(bytes);
}
