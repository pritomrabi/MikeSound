import  { useRef } from "react";
import emailjs from "emailjs-com";
const Form = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_99t8mvk",
        "template_dawoxxq",
        form.current,
        "Xr2QJ71Wn52Q92xeO"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset(); // clear form
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error(error.text);
        }
      );
  };
  return (
    <section className="bg-white p-8 max-w-4xl mx-auto rounded-lg shadow-sm my-10">
      <h2 className="text-2xl text-primary font-Nunito-font font-bold text-center">
        Send Us a Message
      </h2>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="mt-6 grid grid-cols-1 gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border p-3 rounded-md w-full outline-none  border-gray-300 text-sm text-primary font-Popins"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border p-3 rounded-md w-full outline-none  border-gray-300 text-sm text-primary font-Popins"
          required
        />
        <textarea
          name="project"
          placeholder="Your Message"
          rows="5"
          className="border p-3 rounded-md w-full outline-none  border-gray-300 text-sm text-primary font-Popins"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-brand text-white text-base font-Lato  px-7 py-2.5 rounded-lg w-fit font-bold scale-95 cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Form;
