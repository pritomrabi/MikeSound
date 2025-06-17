const Map = () => {
  return (
    <section className="py-10 text-center bg-[#fdfeff] dark:bg-[#1a1a1a]">
      <h2 className="text-3xl text-primary-default dark:text-primary-dark font-Lato font-bold text-center py-5">
        Find Us
      </h2>
      <div className="mt-6 w-full h-68">
        <iframe
          title="Google Maps"
          className="w-full h-full rounded-lg shadow-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093717!2d144.9559253153181!3d-37.81720974202161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sCake%20Shop!5e0!3m2!1sen!2sus!4v1614972000000!5m2!1sen!2sus"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Map;
