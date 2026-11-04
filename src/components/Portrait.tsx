import { useState } from 'react';

interface PortraitProps {
  /** Path to the portrait inside /public. Replace public/portrait.jpg with your photo. */
  src?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Shows the portrait from /public. If the file is missing, a clearly marked
 * placeholder is shown instead of a broken image.
 */
export default function Portrait({ src = '/portrait.jpg', className = '', priority = false }: PortraitProps) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className={`portrait-missing ${className}`} role="img" aria-label="Portrait placeholder">
        <span className="mono">PORTRAIT</span>
        <span>Add your photo as public/portrait.jpg</span>
      </div>
    );
  }

  return (
    <img
      className={`portrait-img ${className}`}
      src={src}
      alt="Portrait of Anshika Yadav"
      width={800}
      height={1000}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setMissing(true)}
    />
  );
}
