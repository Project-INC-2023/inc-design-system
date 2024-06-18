import plugin from "tailwindcss/plugin";

export default plugin(
  function ({ addUtilities }) {
    const newUtilities = {
      ".inc-design-system-select-content::-webkit-scrollbar": {
        width: "8px",
      },
      ".inc-design-system-select-content::-webkit-scrollbar-track": {
        background: "transparent",
      },
      ".inc-design-system-select-content::-webkit-scrollbar-thumb": {
        background: "#98a2b3",
        borderRadius: "99px",
      },
      ".inc-design-system-select-scroll-area-thumb": {
        width: "8px",
        background: "#98a2b3",
        borderRadius: "99px",
      },
      ".inc-design-system-select-scroll-area-root": {
        width: "100%",
        height: "100%",
      },
      ".inc-design-system-select-scroll-area-viewport": {
        width: "100%",
        height: "100%",
      },
      ".inc-design-system-select-scroll-area-scrollbar": {
        width: "4px",
        padding: "5px 2px",
      },
      ".animate-spin-button-spinner": {
        animation: "spinner 1s linear infinite",
      },
    };

    addUtilities(newUtilities);
  },
  {
    // content: ["./node_modules/@4rchx824/ui/dist/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          // Primary colors
          primary: "#5E27B6",
          "primary-accent": "#DDD2F0",
          "primary-disabled": "#AC9BDB",
          "primary-active": "#482384",
          "text-primary-disabled": "#7260A4",

          // Secondary colors
          secondary: "#F78E5A",
          "secondary-accent": "#FCF0EE",
          "secondary-disabled": "#F7D5C2",
          "secondary-active": "#AF522A",
          "text-secondary-disabled": "#F0A47A",

          // Text colors
          "text-default": "#0D0815",
          "text-light": "#F8F8F8",

          // Gray colors
          "grey-100": "#F7F7F9",
          "grey-200": "#E4E7EC",
          "grey-300": "#D0D5DD",
          "grey-400": "#98A2B3",
          "grey-500": "#667085",
          "grey-600": "#344054",
          "grey-700": "#1D2939",

          // State colors
          success: "#58BE62",
          danger: "#ED452E",
          warning: "#FEC84B",
          info: "#58A1D4",
          "success-accent": "#ECFBEE",
          "danger-accent": "#FFF4F3",
          "warning-accent": "#FFFAEB",
          "info-accent": "#E2EFF8",

          // Background colors
          background: "#FDFCFF",

        },
      }, 

      keyframes: {
        spinner: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        spinner: "spinner 1s linear infinite",
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  }
);
