import React, { useState } from "react";
import { sendContactMessage } from "../../api/api";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendContactMessage(formData);
    if (!res.error) alert("Message sent successfully");
    else alert("Error sending message");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section className="py-12 bg-[#fdfeff] dark:bg-[#201f1f]">
      <div className="container mx-auto px-2 md:px-6 flex flex-wrap justify-center items-center">
        <div className="hidden md:block md:w-1/2 px-4 flex flex-col space-y-6 mt-8 md:mt-0">
          <div
            className="sm:h-[400px] h-[350px] bg-cover object-cover bg-no-repeat bg-center rounded-md w-[95%] sm:w-[90%] justify-center flex mx-auto"
            style={{ backgroundImage: "url('contact-1.jpg')" }}
          ></div>
        </div>

        <div className="w-full md:w-1/2 px-4">
          <h2 className="sm:text-3xl text-2xl font-semibold text-primary-default dark:text-primary-dark font-Roboto uppercase">
            Send us a message
          </h2>
          <p className="mt-4 text-secandari-default dark:text-secandari-dark text-sm font-Lato font-normal">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            <br />
            eiusmod tempor incididunt.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Your subject*"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="5"
              className="w-full p-3 border border-gray-300 outline-none rounded text-sm text-primary-default dark:text-primary-dark font-normal font-Monrope"
              required
            ></textarea>
            <button
              type="submit"
              className="w-fit bg-brand text-white py-3 px-6 rounded-lg text-sm cursor-pointer font-Popins font-normal"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
