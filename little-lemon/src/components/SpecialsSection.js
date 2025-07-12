import React from "react";

const specials = [
  {
    title: "Greek salad",
    price: "$12.99",
    image: process.env.PUBLIC_URL + "/icons/greek salad.jpg",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    orderLink: "#",
  },
  {
    title: "Bruschetta",
    price: "$ 5.99",
    image: process.env.PUBLIC_URL + "/icons/bruchetta.svg",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    orderLink: "#",
  },
  {
    title: "Lemon Dessert",
    price: "$ 5.00",
    image: process.env.PUBLIC_URL + "/icons/lemon dessert.jpg",
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    orderLink: "#",
  },
];

const SpecialsSection = () => {
  return (
    <section className="w-full py-12 bg-white mt-10" aria-labelledby="specials-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 id="specials-heading" className="text-3xl md:text-4xl font-bold text-gray-900">This weeks specials!</h2>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded shadow-md transition-colors duration-200 w-max self-start md:self-auto text-base md:text-lg"
            aria-label="View the online menu"
            type="button"
          >
            Online Menu
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {specials.map((item, idx) => (
            <article
              key={item.title}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100"
              aria-labelledby={`special-title-${idx}`}
            >
              <img
                src={item.image}
                alt={item.title + ' image'}
                className="w-full h-48 object-cover object-center"
                loading="lazy"
              />
              <div className="p-6 flex flex-col flex-1">
                <header className="flex justify-between items-center mb-2">
                  <h3 id={`special-title-${idx}`} className="font-semibold text-lg text-gray-900">{item.title}</h3>
                  <span className="text-[#EE9972] font-semibold text-base" aria-label={`Price: ${item.price}`}>{item.price}</span>
                </header>
                <p className="text-gray-600 text-sm mb-6 flex-1">{item.description}</p>
                <a
                  href={item.orderLink}
                  className="mt-auto text-sm font-semibold text-gray-900 flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  aria-label={`Order a delivery of ${item.title}`}
                  tabIndex={0}
                >
                  Order a delivery
                  <span role="img" aria-label="delivery scooter" className="ml-1">
                    🛵
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialsSection; 