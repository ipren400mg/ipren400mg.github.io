import { useEffect, useState } from 'react';
import { getFallbackImage } from '../utils/format';

export default function ShopImage({
  src,
  alt,
  placeholder,
  className = '',
  imgClassName = '',
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setLoaded(false);
  }, [src]);

  return (
    <div
      className={`shop-image ${className}`.trim()}
      style={placeholder ? { backgroundImage: `url('${placeholder}')` } : undefined}
    >
      {imageSrc ? (
        <img
          alt={alt}
          className={`${imgClassName} ${loaded ? 'is-loaded' : ''}`.trim()}
          onError={() => {
            if (!placeholder) {
              setImageSrc(getFallbackImage());
            }
          }}
          onLoad={() => setLoaded(true)}
          src={imageSrc}
        />
      ) : null}
    </div>
  );
}
