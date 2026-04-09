// src/components/ACMLogo.jsx
// Logo Oficial da ACM Sorocaba
// Redesenhado em SVG para fidelidade total à identidade visual (Y curvo + Triângulo + Texto)

export function ACMLogo({ size = 32, variant = "color" }) {
  // variant: "color" | "white"
  
  const blue = variant === "white" ? "#FFFFFF" : "#00529B"; // Azul oficial YMCA/ACM
  const red  = variant === "white" ? "#FFFFFF" : "#E31E24"; // Vermelho oficial

  return (
    <svg 
      width={size} 
      height={size * 1.35} 
      viewBox="0 0 100 135" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ACM Sorocaba Official Logo"
    >
      {/* O "Y" Curvo Oficial */}
      <path 
        d="M34.5 13.5C28.5 13.5 24 18 24 24V48C24 64.5 37.5 78 54 78H55.5V102C55.5 106.5 58.5 109.5 63 109.5H72V102C72 90 61.5 79.5 49.5 79.5H48C40.5 79.5 34.5 73.5 34.5 66V24C34.5 19.5 37.5 16.5 42 16.5H54C60 16.5 64.5 12 64.5 6H34.5V13.5Z" 
        fill={blue}
        transform="translate(-10, 0)"
      />
      
      {/* O Triângulo Vermelho Tradicional */}
      <path 
        d="M58.5 6H94.5L76.5 36L58.5 6Z" 
        fill={red}
        transform="translate(-10, 0)"
      />

      {/* ACM Texto - Simulação da tipografia bold */}
      <text 
        x="50%" 
        y="110" 
        textAnchor="middle" 
        fill={blue} 
        style={{ font: 'bold 24px Arial, sans-serif', letterSpacing: '-0.5px' }}
      >
        ACM
      </text>
      
      {/* SOROCABA Texto */}
      <text 
        x="50%" 
        y="130" 
        textAnchor="middle" 
        fill={blue} 
        style={{ font: 'bold 12px Arial, sans-serif', letterSpacing: '1px' }}
      >
        SOROCABA
      </text>
    </svg>
  );
}

// Versão compacta (apenas o ícone Y) para lugares pequenos
export function ACMIcon({ size = 32, variant = "color" }) {
  const blue = variant === "white" ? "#FFFFFF" : "#00529B";
  const red  = variant === "white" ? "#FFFFFF" : "#E31E24";

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 110" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M34.5 13.5C28.5 13.5 24 18 24 24V48C24 64.5 37.5 78 54 78H55.5V102C55.5 106.5 58.5 109.5 63 109.5H72V102C72 90 61.5 79.5 49.5 79.5H48C40.5 79.5 34.5 73.5 34.5 66V24C34.5 19.5 37.5 16.5 42 16.5H54C60 16.5 64.5 12 64.5 6H34.5V13.5Z" 
        fill={blue}
        transform="translate(-10, 0)"
      />
      <path 
        d="M58.5 6H94.5L76.5 36L58.5 6Z" 
        fill={red}
        transform="translate(-10, 0)"
      />
    </svg>
  );
}
