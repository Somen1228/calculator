module.exports = {
    content: [
      './*.html', // This will scan all HTML files in your project
      './*.js',   // This will scan all JS files in your project
    ],
    theme: {
      extend: {
        boxShadow: {
            'bottom-left': '-7px 7px 10px rgba(0, 0, 0, 0.4)',
        }
      },
    },
    plugins: [],
  };
  