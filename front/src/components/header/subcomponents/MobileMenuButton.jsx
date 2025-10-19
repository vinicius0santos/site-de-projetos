export default function MobileMenuButton(){
  return (
    <button
      id="mobile-menu-toggle"
      className="p-1 rounded-full hover:bg-neutral-800 transition duration-150 flex items-center justify-center"
      title="Menu"
    >
      <svg className="w-6 h-6 text-gray-300 block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  )
}