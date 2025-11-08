export default function NewSectionButton({ handleCreateSection }) {
  return (
    <button
      onClick={handleCreateSection}
      className="flex items-center ml-4 px-3 py-2 text-sm font-medium text-gray-300 hover:text-[--logo] transition duration-150 focus:outline-none rounded"
    >
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
      Nova seção
    </button>
  )
}
