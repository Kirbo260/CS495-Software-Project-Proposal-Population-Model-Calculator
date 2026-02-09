import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
<<<<<<< HEAD
=======
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    coverage: {
      reporter: ["text", "html"]
    }
  }
>>>>>>> 64414ccf79a2d1051e0d0340196a1a3016492187
})
