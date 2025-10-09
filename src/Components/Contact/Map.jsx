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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116638.9685886066!2d90.24331679615287!3d23.9969152492504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755dafdd8aa72a1%3A0xe3a23793cb030fdb!2sGazipur!5e0!3m2!1sen!2sbd!4v1757683771437!5m2!1sen!2sbd"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Map;
