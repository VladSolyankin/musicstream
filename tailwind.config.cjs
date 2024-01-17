/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './src/**/*.{api,jsx,ts,tsx}',
      './src/**/**/*.{api,jsx,ts,tsx}'
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
              'playlistsWrap-2xl': 'repeat(5, 1fr)',
              'playlistsWrap-xl': 'repeat(4, 1fr)',
              'playlistsWrap-lg': 'repeat(3, 1fr)',
              'playlistsWrap-md': 'repeat(2, 1fr)',
              'playlistsWrap-sm': 'repeat(1, 1fr)',
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
