/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
      './src/**/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
      extend: {
          fontFamily: {
              "jost": ["Jost", "sans-serif"]
          },
          backgroundImage: {
              'new-tracks': "url('src/assets/new_tracks.png')",
              'top-songs': "url('src/assets/top_songs.png')",
              'trending': "url('src/assets/trending.png')",
          },
          gridTemplateColumns: {
              'playlistsWrap': 'repeat(auto-fit, minmax(176px)'
          },
          minHeight: {
              '32dvh': '32dvh',
              '100vh': '100vh'
          }
      },
      colors: {
          "gray-12": '#121212',
          "white": '#FFFFFF',
          "gray-600": "#666666"
      },
      boxShadow: {
          'cardShadow': '0px 0px 15px 3px rgba(0, 0, 0, 1)',
          'playlist': '0px 0px 5px 3px rgba(0, 0, 0, 1)'
      },
  },
  plugins: [],
}
