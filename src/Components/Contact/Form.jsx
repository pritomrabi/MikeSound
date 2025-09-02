const Form = () => {
  return (
    <section className="  py-12 bg-[#fdfeff] dark:bg-[#201f1f]">
      <div className=" container mx-auto px-2 md:px-6 flex flex-wrap justify-center items-center">
        {/* Left Column: Contact Form */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="sm:text-3xl text-2xl font-semibold text-primary-default dark:text-primary-dark font-Roboto uppercase">
            Send us a message
          </h2>
          <p className="mt-4 text-secandari-default dark:text-secandari-dark text-sm font-Lato font-normal">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do{" "}
            <br />
            eiusmod tempor incididunt.
          </p>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your name*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
            />
            <input
              type="email"
              placeholder="Your email*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            />
            <input
              type="number"
              placeholder="Your phone*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            />
            <input
              type="text"
              placeholder="Your subject*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            />
            <textarea
              placeholder="Message"
              rows="5"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
            ></textarea>
            <button
              type="submit"
              className="w-fit bg-brand text-white py-3 px-6 rounded-lg text-sm cursor-pointer font-Popins font-normal"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info */}
        <div className="w-full md:block sm:hidden hidden md:w-1/2 px-4 flex flex-col space-y-6 mt-8 md:mt-0">
          <div
            className="sm:h-[400px] h-[350px] bg-cover bg-no-repeat bg-center rounded-md w-[95%] sm:w-[90%] justify-center flex mx-auto"
            style={{ backgroundImage: "url('home.jpg')" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Form;
