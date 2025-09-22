import React from "react";

function Tooltip({ children, text }) {
  return (
    <div className="relative group inline-block">
      {children}
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-3 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
        {text}
      </span>
    </div>
  );
}

export default Tooltip;
