/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // 1. O Tailwind deve vir primeiro. Ele processa as diretivas @tailwind e gera as classes.
    tailwindcss: {},
    // 2. O Autoprefixer deve vir depois. Ele garante a compatibilidade com navegadores antigos.
    autoprefixer: {},
  },
}