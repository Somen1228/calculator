module.exports = {
    content: [
      "./*.html", // This will scan all HTML files in your project
      "./*.js", // This will scan all JS files in your project
    ],
    theme: {
      extend: {
        animation: {
          "custom-bounce": "custom-bounce 2s infinite",
        },
        keyframes: {
          "custom-bounce": {
            "0%, 100%": {
              transform: "translateY(-35%)",
              animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
              backgroundOpacity: "0.5", 
            "50%": {
              transform: "translateY(0)",
              animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
              backgroundOpacity: "1", 
            },
          },
        },
      },
    },
    plugins: [],
  };
  