// src/components/ACMLogo.jsx
// Logo Y da ACM Sorocaba — SVG inline, sem dependência de arquivo externo
// Baseado na identidade visual oficial: braço azul + triângulo vermelho invertido

export function ACMLogo({ size = 32, variant = "color" }) {
  // variant: "color" | "white" | "mono-blue"

  const blue = variant === "white" ? "#FFFFFF"
             : variant === "mono-blue" ? "#2E6DA4"
             : "#2E6DA4";

  const red  = variant === "white" ? "#FFFFFF"
             : variant === "mono-blue" ? "#2E6DA4"
             : "#D9534F";

  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 110"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ACM Sorocaba"
    >
      {/* Braço esquerdo do Y (azul) */}
      <path
        d="M8 6 L50 60 L50 106 L62 106 L62 60 L94 6 L79 6 L51 44 L21 6 Z"
        fill={blue}
      />
      {/* Triângulo vermelho invertido (topo direito) */}
      <polygon
        points="62,6 94,6 78,30"
        fill={red}
      />
    </svg>
  );
}

// Versão com texto "ACM SOROCABA" abaixo
export function ACMLogoBadge({ size = 32 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <ACMLogo size={size} />
      <span style={{
        fontSize: size * 0.28,
        fontWeight: 700,
        color: "#2E6DA4",
        letterSpacing: 1.5,
        fontFamily: "sans-serif",
        lineHeight: 1,
      }}>
        ACM SOROCABA
      </span>
    </div>
  );
}
