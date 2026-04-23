export function isImageAsset(src: string) {
  return /\.(png|jpe?g|gif|webp|avif)$/i.test(src)
}

export function getAssetUrl(src: string) {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedPath = src.startsWith('/') ? src.slice(1) : src
  return `${baseUrl}${encodeURI(normalizedPath)}`
}
