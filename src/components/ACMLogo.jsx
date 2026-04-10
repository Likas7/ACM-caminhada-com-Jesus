// src/components/ACMLogo.jsx
export function ACMLogo({ size = 32, className = "" }) {
  return (
    <div className={`acm-logo-container ${className}`} style={{ width: size }}>
      <img 
        src="/logo-acm.png" 
        alt="ACM Sorocaba" 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
}

export function ACMIcon({ size = 32, variant = "color", className = "" }) {
  const isWhite = variant === "white";
  return (
    <div className={`acm-icon-container ${className}`} style={{ width: size }}>
      <img 
        src="/logo-acm.png" 
        alt="ACM Icon" 
        style={{ 
          width: '100%', 
          height: 'auto',
          filter: isWhite ? 'brightness(0) invert(1)' : 'none'
        }} 
      />
    </div>
  );
}

