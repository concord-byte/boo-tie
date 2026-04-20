export default function HubDiagram() {
  return (
    <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Outer connecting arcs */}
      <ellipse cx="300" cy="300" rx="230" ry="230" stroke="#3B7DD8" strokeWidth="2" fill="none" opacity="0.3" />

      {/* Connection lines from center to nodes */}
      <line x1="300" y1="180" x2="300" y2="105" stroke="#3B7DD8" strokeWidth="2" />
      <line x1="180" y1="420" x2="140" y2="470" stroke="#4CAF50" strokeWidth="2" />
      <line x1="420" y1="420" x2="460" y2="470" stroke="#4CAF50" strokeWidth="2" />

      {/* Connection dots */}
      <circle cx="300" cy="142" r="5" fill="white" stroke="#3B7DD8" strokeWidth="2" />
      <circle cx="160" cy="445" r="5" fill="white" stroke="#4CAF50" strokeWidth="2" />
      <circle cx="440" cy="445" r="5" fill="white" stroke="#4CAF50" strokeWidth="2" />

      {/* Center circle - BowTie */}
      <circle cx="300" cy="300" r="120" fill="white" stroke="#1B3A5C" strokeWidth="3" />

      {/* BowTie bowtie icon */}
      <g transform="translate(300, 265)">
        {/* Left triangle */}
        <polygon points="-30,-18 0,0 -30,18" fill="#1B3A5C" />
        {/* Right triangle */}
        <polygon points="30,-18 0,0 30,18" fill="#3B7DD8" />
        {/* Center knot */}
        <circle cx="0" cy="0" r="4" fill="#1B3A5C" />
        {/* Green accents */}
        <polygon points="-30,-18 -15,-9 -15,9 -30,18" fill="#4CAF50" opacity="0.4" />
        <polygon points="30,-18 15,-9 15,9 30,18" fill="#4CAF50" opacity="0.4" />
      </g>

      {/* BO TIE text */}
      <text x="300" y="310" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="28" fill="#1B3A5C">
        <tspan>BO</tspan>
        <tspan fill="#3B7DD8">W</tspan>
        <tspan fill="#1B3A5C">TIE</tspan>
      </text>
      <text x="300" y="335" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="14" fill="#1B3A5C" letterSpacing="3">
        SCHOOL PARTNERS
      </text>
      <text x="300" y="355" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="400" fontSize="11" fill="#D4A843" fontStyle="italic">
        tying it all together
      </text>

      {/* Schools node - top */}
      <circle cx="300" cy="70" r="55" fill="white" stroke="#1B3A5C" strokeWidth="2.5" />
      {/* Graduation cap icon */}
      <g transform="translate(300, 52)">
        <rect x="-18" y="-2" width="36" height="4" rx="1" fill="#1B3A5C" />
        <polygon points="0,-14 -22,0 0,6 22,0" fill="#1B3A5C" />
        <line x1="18" y1="0" x2="18" y2="10" stroke="#1B3A5C" strokeWidth="1.5" />
        <circle cx="18" cy="11" r="1.5" fill="#1B3A5C" />
      </g>
      <text x="300" y="95" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="13" fill="#1B3A5C" letterSpacing="1">
        SCHOOLS
      </text>

      {/* Trusted Vendors node - bottom left */}
      <circle cx="120" cy="510" r="55" fill="white" stroke="#4CAF50" strokeWidth="2.5" />
      {/* Handshake icon */}
      <g transform="translate(120, 492)">
        <path d="M-16,-4 L-8,-10 L0,-4 L8,-10 L16,-4" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-16,4 L-8,-2 L0,4 L8,-2 L16,4" stroke="#8BC34A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Radiating lines */}
        <line x1="-18" y1="8" x2="-22" y2="12" stroke="#4CAF50" strokeWidth="1" opacity="0.5" />
        <line x1="-14" y1="10" x2="-16" y2="16" stroke="#4CAF50" strokeWidth="1" opacity="0.5" />
        <line x1="18" y1="8" x2="22" y2="12" stroke="#4CAF50" strokeWidth="1" opacity="0.5" />
      </g>
      <text x="120" y="525" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="11" fill="#4CAF50" letterSpacing="1">
        TRUSTED
      </text>
      <text x="120" y="540" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="11" fill="#4CAF50" letterSpacing="1">
        VENDORS
      </text>

      {/* National Brands node - bottom right */}
      <circle cx="480" cy="510" r="55" fill="white" stroke="#4CAF50" strokeWidth="2.5" />
      {/* Shield with checkmark icon */}
      <g transform="translate(480, 495)">
        <path d="M0,-18 L-18,-6 L-14,14 L0,20 L14,14 L18,-6 Z" fill="#4CAF50" opacity="0.15" stroke="#4CAF50" strokeWidth="2" />
        <polyline points="-7,2 -2,8 8,-4" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="480" y="530" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="11" fill="#4CAF50" letterSpacing="1">
        NATIONAL
      </text>
      <text x="480" y="545" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="11" fill="#4CAF50" letterSpacing="1">
        BRANDS
      </text>

      {/* Curved arcs connecting the three outer nodes */}
      <path d="M 175 485 Q 300 580 425 485" stroke="#4CAF50" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M 250 95 Q 100 250 145 460" stroke="#3B7DD8" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M 350 95 Q 500 250 455 460" stroke="#3B7DD8" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
}
