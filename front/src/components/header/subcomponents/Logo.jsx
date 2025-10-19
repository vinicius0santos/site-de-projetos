export default function Logo(){
  return (
    <a
    href='/'
    className="flex items-center space-x-3 group cursor-pointer transition duration-200"
    >
      <img src="/logo.svg" alt="Logo Bundello" className="logo-img group-hover:opacity-80 transition duration-200" />
      <h1 className="text-2xl font-black tracking-wide text-white group-hover:text-[var(--logo)] transition duration-200">
        Bundello
      </h1>
    </a>
  )
}