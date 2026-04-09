// src/components/ACMLogo.jsx
// Logo Oficial da ACM Sorocaba - Versão Corrigida
// SVG robusto com coordenadas precisas e tipografia tratada

export function ACMLogo({ size = 32, variant = "color" }) {
  const blue = variant === "white" ? "#FFFFFF" : "#00539B";
  const red  = variant === "white" ? "#FFFFFF" : "#E31E24";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: size }}>
      <svg 
        width={size} 
        height={size * 0.8} 
        viewBox="0 0 120 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Y oficial YMCA/ACM - Path simplificado e harmônico */}
        <path 
          d="M20 5h20c5 0 8 3 8 8v40c0 8 7 15 15 15h2v30c0 4 3 7 7 7h15v-8c0-12-10-22-22-22h-2c-5 0-8-3-8-8V13c0-4 3-7 7-7h22V5H20z" 
          fill={blue}
        />
        {/* Triângulo Red */}
        <path 
          d="M70 5h45L92.5 35L70 5z" 
          fill={red}
        />
      </svg>
      
      {/* Texto institucional - Fora do SVG para evitar distorções de escala */}
      <div style={{ 
        marginTop: size * 0.1, 
        textAlign: 'center', 
        color: blue, 
        fontWeight: '900', 
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1
      }}>
        <div style={{ fontSize: size * 0.28, letterSpacing: '-0.5px' }}>ACM</div>
        <div style={{ fontSize: size * 0.12, letterSpacing: '1.5px', marginTop: size * 0.05 }}>SOROCABA</div>
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
      height={size * 0.8} 
      viewBox="0 0 120 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20 5h20c5 0 8 3 8 8v40c0 8 7 15 15 15h2v30c0 4 3 7 7 7h15v-8c0-12-10-22-22-22h-2c-5 0-8-3-8-8V13c0-4 3-7 7-7h22V5H20z" 
        fill={blue}
      />
      <path 
        d="M70 5h45L92.5 35L70 5z" 
        fill={red}
      />
    </svg>
  );
}
