// src/components/ACMLogo.jsx
// Versão definitiva: Carrega a imagem oficial fornecida pelo usuário
// Requisito: Salvar a imagem como 'public/logo-acm.png'

export function ACMLogo({ size = 32, variant = "color" }) {
  // Nota: Para a versão 'white', o ideal seria ter uma imagem 'logo-acm-white.png'
  // Mas por enquanto usaremos a mesma ou um filtro de brilho se for a colorida
  const isWhite = variant === "white";

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: size 
    }}>
      <img 
        src="/logo-acm.png" 
        alt="ACM Sorocaba" 
        style={{ 
          width: '100%', 
          height: 'auto',
          filter: isWhite ? 'brightness(0) invert(1)' : 'none'
        }} 
        onError={(e) => {
          // Fallback caso a imagem não seja encontrada na pasta public
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
}

export function ACMIcon({ size = 32, variant = "color" }) {
  const isWhite = variant === "white";
  return (
    <img 
      src="/logo-acm.png" 
      alt="ACM Icon" 
      style={{ 
        width: size, 
        height: 'auto',
        filter: isWhite ? 'brightness(0) invert(1)' : 'none'
      }} 
    />
  );
}
