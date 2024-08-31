module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      boxShadow: {
        "bottom-left": "-10px 10px 10px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "custom-bounce": "custom-bounce 2s infinite",
      },
      keyframes: {
        "custom-bounce": {
          "0%, 100%": {
            transform: "translateY(-35%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
            backgroundOpacity: "0.5",
          },
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
