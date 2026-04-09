// src/components/ACMLogo.jsx
// Versão definitiva: Carrega a imagem oficial (SVG para máxima fidelidade)
// Requisito: Salvo como 'public/logo-acm.svg'

export function ACMLogo({ size = 32, variant = "color" }) {
  const isWhite = variant === "white";

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: size 
    }}>
      <img 
        src="/logo-acm.svg" 
        alt="ACM Sorocaba" 
        style={{ 
          width: '100%', 
          height: 'auto',
          filter: isWhite ? 'brightness(0) invert(1)' : 'none'
        }} 
      />
    </div>
  );
}

export function ACMIcon({ size = 32, variant = "color" }) {
  const isWhite = variant === "white";
  return (
    <img 
      src="/logo-acm.svg" 
      alt="ACM Icon" 
      style={{ 
        width: size, 
        height: 'auto',
        filter: isWhite ? 'brightness(0) invert(1)' : 'none'
      }} 
    />
  );
}

