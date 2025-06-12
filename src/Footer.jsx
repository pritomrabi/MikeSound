import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-white text-sm pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-6 md:gap-10">
        {/* Column 1 */}
        <div className="lg:col-span-3 md:col-span-6 col-span-12">
          <Link
            to="/"
            className="block mb-4 text-2xl font-bold text-brand font-Lato"
          >
            Fashion Flat
          </Link>
          <p
            className="mb-4 text-secandari font-Popins
          text-xs font-normal"
          >
            Condimentum adipiscing vel neque dis nam parturient orci at
            scelerisque neque dis nam parturient.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <img
                src="https://woodmart.xtemos.com/wp-content/uploads/2023/09/wd-cursor-dark.svg"
                alt="location"
                width={14}
                height={14}
              />
              <span className="text-sm text-primary font-medium font-Monrope">
                Gazipur, Dhaka , Bangladesh
              </span>
            </li>
            <li className="flex items-start gap-2">
              <img
                src="https://woodmart.xtemos.com/wp-content/uploads/2023/09/wd-phone-dark.svg"
                alt="phone"
                width={14}
                height={14}
              />
              <span className="text-sm text-primary font-medium font-Monrope">
                Phone: 01929712201
              </span>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="lg:col-span-3 md:col-span-6 col-span-12">
          <h5 className="text-lg font-semibold font-Lato text-primary mb-4">
            Recent Posts
          </h5>
          <ul className="space-y-4">
            {[
              {
                title: "A companion for extra sleeping",
                date: "July 23, 2016",
                comments: "1 Comment",
                img: "https://woodmart.xtemos.com/wp-content/uploads/2016/07/blog-12-75x65.jpg",
                href: "#",
              },
              {
                title: "Outdoor seating collection inspiration",
                date: "July 23, 2016",
                comments: "1 Comment",
                img: "https://woodmart.xtemos.com/wp-content/uploads/2016/07/blog-11-75x65.jpg",
                href: "#",
              },
            ].map((post, idx) => (
              <li key={idx} className="flex gap-4">
                <a href={post.href}>
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-[75px] h-[65px] object-cover"
                  />
                </a>
                <div>
                  <a
                    href={post.href}
                    className="font-medium hover:text-primary font-Popins text-sm text-primary mb-1"
                  >
                    {post.title}
                  </a>
                  <div className="text-secandari text-xs font-Monrope font-normal ">
                    {post.date}
                  </div>
                  <div className="text-secandari text-xs font-Monrope font-normal">
                    {post.comments}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="lg:col-span-2 md:col-span-4 col-span-12">
          <h5 className="text-lg font-semibold font-Lato text-primary mb-4">
            Our Stores
          </h5>
          <ul className="space-y-2">
            {[
              "New York",
              "London SF",
              "Edinburgh",
              "Los Angeles",
              "Chicago",
              "Las Vegas",
            ].map((city, idx) => (
              <li key={idx}>
                <Link
                  to="/"
                  className="hover:underline text-sm text-primary font-Opensans font-medium hover:text-secandari duration-200"
                >
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 */}
        <div className="lg:col-span-2 md:col-span-4 col-span-12">
          <h5 className="text-lg font-semibold font-Lato text-primary mb-4">
            Useful Links
          </h5>
          <ul className="space-y-2">
            {[
              "Privacy Policy",
              "Returns",
              "Terms & Conditions",
              "Contact Us",
              "Latest News",
              "Our Sitemap",
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to="#"
                  className="hover:underline text-sm text-primary font-Opensans font-medium hover:text-secandari duration-200"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5 */}
        <div className="lg:col-span-2 md:col-span-4 col-span-12">
          <h5 className="text-lg font-semibold font-Lato text-primary mb-4">
            Footer Menu
          </h5>
          <ul className="space-y-2">
            {[
              "Instagram profile",
              "New Collection",
              "Woman Dress",
              "Contact Us",
              "Latest News",
              {
                text: "Purchase Theme",
                href: "https://xtemos.com/buy-woodmart.php",
                italic: true,
              },
            ].map((item, idx) => {
              if (typeof item === "string") {
                return (
                  <li key={idx}>
                    <Link
                      to="/"
                      className="hover:underline text-sm text-primary font-Opensans font-medium hover:text-secandari duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="italic hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secandari mt-10 pt-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-secandari text-sm font-Monrope font-normal">
          <small>
            © 2025 CREATED BY{" "}
            <span className="text-red-500 font-semibold">Fashion Flat</span>.
            PREMIUM E-COMMERCE SOLUTIONS.
          </small>
          <img
            src="https://woodmartcdn-cec2.kxcdn.com/wp-content/uploads/2017/01/payments.png"
            alt="Payments"
            className="mt-4 md:mt-0 w-[255px] h-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
