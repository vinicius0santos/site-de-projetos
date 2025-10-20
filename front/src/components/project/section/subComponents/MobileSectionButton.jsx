export default function MobileSectionButton({
  isMobileSectionMenuOpen,
  activeSection,
  setIsMobileSectionMenuOpen,
  setIsSectionMenuOpen
}) {
  return (
    <button
      id="mobile-active-section-button"
      className="md:hidden flex items-center justify-between w-full py-3 px-2 text-white font-bold text-lg rounded-lg transition duration-150"
      onClick={(e) => {
        e.stopPropagation();
        setIsMobileSectionMenuOpen(!isMobileSectionMenuOpen);
        setIsSectionMenuOpen(false);
      }}
    >
      <span id="active-mobile-section-name">{activeSection?.name}</span>
      <svg
        id="mobile-section-dropdown-arrow"
        className={`${isMobileSectionMenuOpen ? 'text-[--logo]' : 'text-gray-400'} w-5 h-5`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  )
}
