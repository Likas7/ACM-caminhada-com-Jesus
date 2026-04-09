// src/components/ACMLogo.jsx
// Logo Oficial da ACM Sorocaba - Versão Geométrica Estável
// Construída com formas simples para garantir renderização perfeita em qualquer tela

export function ACMLogo({ size = 32, variant = "color" }) {
  const blue = variant === "white" ? "#FFFFFF" : "#00539B";
  const red  = variant === "white" ? "#FFFFFF" : "#E31E24";

  // Proporções baseadas no ícone oficial
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: size }}>
      <svg 
        width={size} 
        height={size * 0.9} 
        viewBox="0 0 100 90" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Braço superior esquerdo */}
        <rect x="10" y="5" width="45" height="15" rx="2" fill={blue} />
        {/* Haste vertical curvada (simulada por dois blocos e um círculo de junção) */}
        <rect x="25" y="5" width="15" height="50" rx="2" fill={blue} />
        <rect x="25" y="45" width="45" height="15" rx="7" fill={blue} />
        <rect x="55" y="45" width="15" height="40" rx="2" fill={blue} />
        
        {/* Triângulo Vermelho - Posicionado no canto superior direito */}
        <path d="M60 5 H95 L77.5 35 Z" fill={red} />
      </svg>
      
      {/* Texto Institucional */}
      <div style={{ 
        marginTop: size * 0.05, 
        textAlign: 'center', 
        color: variant === "white" ? "#FFFFFF" : blue, 
        fontWeight: '900', 
        fontFamily: 'Arial Black, Arial, sans-serif',
        lineHeight: 1.1
      }}>
        <div style={{ fontSize: size * 0.28, letterSpacing: '-0.5px' }}>ACM</div>
        <div style={{ fontSize: size * 0.11, letterSpacing: '1px', fontWeight: 'bold' }}>SOROCABA</div>
      </div>
    </div>
  );
}

export function ACMIcon({ size = 32, variant = "color" }) {
  const blue = variant === "white" ? "#FFFFFF" : "#00539B";
  const red  = variant === "white" ? "#FFFFFF" : "#E31E24";

  return (
    <svg 
      width={size} 
      height={size * 0.9} 
      viewBox="0 0 100 90" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="5" width="45" height="15" rx="2" fill={blue} />
      <rect x="25" y="5" width="15" height="50" rx="2" fill={blue} />
      <rect x="25" y="45" width="45" height="15" rx="7" fill={blue} />
      <rect x="55" y="45" width="15" height="40" rx="2" fill={blue} />
      <path d="M60 5 H95 L77.5 35 Z" fill={red} />
    </svg>
  );
}
