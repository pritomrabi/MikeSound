import { useEffect, useState } from "react";
import { getFAQs } from "../../api/api";

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            const res = await getFAQs(); // fetch FAQs from your Django API
            if (res.error) setFaqs([]);
            else setFaqs(res);
        };
        fetchFaqs();
    }, []);

    const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

    if (faqs.length === 0) {
        return (
            <div className="text-center py-10 text-primary dark:text-secandari-dark font-Lato">

            </div>
        );
    }

    return (
        <div className="dark:bg-[#2c2b2b] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl text-primary dark:text-secandari-dark font-Roboto font-bold mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="flex flex-col space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center dark:text-secandari-dark text-primary text-left text-lg sm:text-xl font-Lato font-medium py-4"
                            >
                                {faq.question}
                                <span className="ml-2 cursor-pointer text-xl sm:text-2xl transition-transform duration-300">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openIndex === index ? "max-h-40" : "max-h-0"
                                    }`}
                            >
                                <p className="mt-2 text-gray-700 dark:text-secandari-dark font-Lato font-normal text-sm sm:text-base">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
