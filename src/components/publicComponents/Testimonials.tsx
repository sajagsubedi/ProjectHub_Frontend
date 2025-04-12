import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Product Manager",
    quote:
      "This platform transformed our workflow! Highly recommend it to any team looking to streamline their processes.",
    image: "/client-1.jpg",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Software Engineer",
    quote:
      "The tools provided are intuitive and easy to use. It's been a game-changer for our development cycle.",
    image: "/client-2.jpg",
  },
  {
    id: 3,
    name: "Sophia Davis",
    role: "UX Designer",
    quote:
      "I love how seamless the collaboration features are. It has improved our team's productivity significantly.",
    image: "/client-3.jpg",
  },
];

export default function TestimonialSection(): JSX.Element {
  return (
    <section className="py-16 px-6 md:px-[5vw] bg-white text-gray-800">
      {/* Section Header */}
      <div className="mx-auto text-center mb-12 section-header">
        <span className="h-1 w-20 bg-red-500 rounded-full mb-4 block mx-auto"></span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover what our satisfied users have to say about their experience.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-3xl shadow-md overflow-hidden p-6 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-6 text-red-500 text-4xl">
              <FaQuoteLeft />
            </div>

            {/* Quote */}
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              &quot;{testimonial.quote}&quot;
            </p>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name}'s profile`}
                height={48}
                width={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-sm"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}