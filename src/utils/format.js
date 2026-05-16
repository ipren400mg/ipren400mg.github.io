const fallbackImage =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
  );

export function formatPrice(price) {
  return Number.isFinite(price) ? `$${price.toFixed(2)}` : '';
}

export function pluralizeItems(quantity) {
  return `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
}

export function decodeHtml(value) {
  if (!value) {
    return '';
  }

  const element = document.createElement('textarea');
  element.innerHTML = value;
  return element.value;
}

export function getDescriptionExcerpt(value) {
  return decodeHtml(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100);
}

export function getFallbackImage() {
  return fallbackImage;
}
