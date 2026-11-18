// import JSEncrypt from 'jsencrypt/bin/jsencrypt'
import JSEncrypt from 'encryptlong'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYifNGLjD/7ILujCPeTAh0anVze/2Qv65M9RpcU6uY6kJ67GDEdTZweZIh+E3nAFZQ9eLF+35Nnh9W2dEOfbJf949sK6eVoO8E+UL1TMB3QpMs6rmg6LrDCDNBO7Cdt05mln+lAgLFbDpOe3h76JxvtzCzT/I5EUkNkHQBQCcZNwIDAQAB'

// 注意：前端只做加密，私钥只应存在于服务端。此前这里硬编码了一份 RSA 私钥，
// 属安全隐患（前端私钥无保密意义且与服务端配对后会使传输加密失效），已移除。

// 加密
// export function encrypt(txt) {
//   const encryptor = new JSEncrypt()
//   encryptor.setPublicKey(publicKey) // 设置公钥
//   return encryptor.encrypt(txt) // 对需要加密的数据进行加密
// }
export function encrypt(txt) {
  const encryptor = new JSEncrypt()

  encryptor.setPublicKey(publicKey)

  return encryptor.encryptLong(txt)
}
// Certificate profiles span many RSA blocks. Preserve each ciphertext block's
// modulus width; encryptlong concatenates variable-width hexadecimal values.
export function encryptPaymentProfile(text) {
  return encryptPaymentProfileWithKey(text, publicKey)
}

export function encryptPaymentProfileWithKey(text, key) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(key)
  const rsa = encryptor.getKey()
  const width = Math.ceil(rsa.n.bitLength() / 8)
  // JSON escapes keep chunks ASCII and avoid splitting UTF-8 characters.
  const ascii = text.replace(/[\u007f-\uffff]/g, char =>
    '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'))
  let hex = ''
  for (let offset = 0; offset < ascii.length; offset += width - 11) {
    const block = rsa.encrypt(ascii.slice(offset, offset + width - 11))
    if (!block) throw new Error('支付配置加密失败')
    hex += block.padStart(width * 2, '0')
  }
  return btoa(hex.match(/../g).map(byte => String.fromCharCode(parseInt(byte, 16))).join(''))
}
