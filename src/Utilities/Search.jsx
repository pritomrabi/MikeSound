import { RxCross2 } from "react-icons/rx";

const Search = ({ setSearch }) => {
  return (
    <div className="absolute w-full top-0 left-0  transition-all duration-500 h-screen">
      <div
        onClick={() => setSearch(false)}
        className="w-full cursor-pointer h-full"
      ></div>
      <div className="fixed right-0 bg-[#fdfeff] dark:bg-[#1a1a1a] w-full   h-full items-center top-20  shadow-md z-50">
        <div className="flex border-y border-secandari py-6">
          <input
            type="text"
            placeholder="Search For Products ..."
            className="w-full px-4 py-2  rounded-lg outline-none transition-all text-xl font-Lato font-medium text-primary-default dark:text-primary-dark border-none justify-center flex text-center placeholder:text-3xl"
          />
          <p onClick={() => setSearch(false)} className="pr-14 cursor-pointer">
            <RxCross2 size={30} />
          </p>
        </div>
        <div>
          <p className="text-center py-5 text-secandari text-sm font-normal font-Lato ">
            Start typing to see products you are looking for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
