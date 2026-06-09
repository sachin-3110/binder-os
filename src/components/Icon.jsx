import React from 'react';

export const Icon = ({ name, size = 20, className = '', ...props }) => {
  const icons = {
    home: (
      <path d="M3 9.5L12 3l9 6.5v11.5a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
    ),
    tasks: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </>
    ),
    code: (
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M10 20l4-16" />
    ),
    ipo: (
      <>
        <path d="M3 20h18" />
        <path d="M18 6h3v5M12 9l6-3M7 14l5-5" />
        <circle cx="5" cy="16" r="2" />
        <circle cx="12" cy="9" r="2" />
        <circle cx="18" cy="6" r="2" />
      </>
    ),
    purchase: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </>
    ),
    ims: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </>
    ),
    moon: (
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    ),
    arrowLeft: (
      <path d="M19 12H5M12 19l-7-7 7-7" />
    ),
    arrowRight: (
      <path d="M5 12h14M12 5l7 7-7 7" />
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    check: (
      <path d="M20 6L9 17l-5-5" />
    ),
    plus: (
      <path d="M12 5v14M5 12h14" />
    ),
    filter: (
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M10 11v6M14 11v6" />
      </>
    )
  };

  const svgPath = icons[name] || null;

  if (!svgPath) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-svg ${className}`}
      {...props}
    >
      {svgPath}
    </svg>
  );
};
