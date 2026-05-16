import { useEffect, useRef, useState } from 'react';
import { getFallbackImage } from '../utils/format';

export default function ShopImage({
  src,
  alt,
  placeholder,
  className = '',
  imgClassName = '',
}) {
  const imgRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [imageSrc]);

  return (
    <div
      className={`shop-image ${className}`.trim()}
      style={placeholder ? { backgroundImage: `url('${placeholder}')` } : undefined}
    >
      {imageSrc ? (
        <img
          alt={alt}
          className={`${imgClassName} ${loaded ? 'is-loaded' : ''}`.trim()}
          ref={imgRef}
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
