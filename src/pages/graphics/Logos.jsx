// 📂 src/pages/graphics/Logos.jsx
import { logos } from '../../data/graphicsData';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const descriptions = [
  {
    title: 'Varietyz Logo (Main)',
    text: 'The primary logo for Varietyz showcases a clean, modern aesthetic built for versatility across various platforms. Utilizing a bold gold hue (#cea555), it strikes the perfect balance between elegance and clarity. This design prioritizes readability and brand consistency, making it ideal for high-impact branding efforts, including merchandise, promotional material, and digital interfaces.',
    color: '#cea555'
  },
  {
    title: 'RoseyRS Logo',
    text: 'The RoseyRS logo is a testament to sophistication and modernity, featuring a seamless blend of Rosey Pink (#D66894) and Deep Purple (#512A43). The smooth curves and luxurious color palette reflect a high-quality brand that values creativity and premium presentation. This logo is crafted to stand out across social media, community events, and promotional graphics, maintaining its distinct visual identity.',
    color: '#D66894'
  },
  {
    title: 'Enigma Logo',
    text: "The Enigma logo employs a dark aesthetic accentuated by vibrant gold highlights. Its sharp, cohesive design represents the brand's dedication to quality and complexity. The combination of sleek lines and powerful contrast reflects the sophistication and depth of the Enigma identity. This logo is perfect for use on merchandise, branding materials, and digital platforms, where clarity and impact are essential.",
    color: '#cea555'
  }
];

/**
 *
 */
export default function Logos() {
  const [showTopButton, setShowTopButton] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const handleScroll = () => setShowTopButton(node.scrollTop > 600);
    node.addEventListener('scroll', handleScroll);

    return () => node.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-[calc(100vh-2rem)] no-scrollbar overflow-y-auto pt-[5.5rem] pb-[5.5rem] scroll-smooth">
      <section className="max-w-6xl mx-auto space-y-20 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link to="/graphics" title="Back to Graphics Overview">
            <ArrowLeft size={36} className="text-gold hover:text-accent transition" />
          </Link>
          <h2 className="text-5xl font-heading text-gold">Logo Designs</h2>
        </div>

        {/* Logo Content */}
        {logos.files.map((file, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center justify-between gap-12 mb-16 transition-all duration-700 transform ${
              i % 2 === 0 ? 'md:flex-row-reverse fade-in-right' : 'fade-in-left'
            }`}>
            {/* Image */}
            <div className="w-full md:w-2/3 flex justify-center cursor-zoom-in transition-transform hover:scale-105">
              <img
                src={`${logos.basePath}/${file}`}
                alt={file}
                className="rounded-xl border border-gold bg-dark p-4 shadow-xl max-w-[400px] w-full"
                loading="lazy"
              />
            </div>

            {/* Description */}
            <div className="w-full md:w-1/2 space-y-4 px-4">
              <h3
                className="text-4xl font-heading transition-all duration-500"
                style={{ color: descriptions[i].color }}>
                {descriptions[i].title}
              </h3>
              <p className="text-xl font-body text-white/80">{descriptions[i].text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Styles for animations */}
      <style>
        {`
          @keyframes fadeInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes fadeInRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .fade-in-left {
            animation: fadeInLeft 0.8s ease forwards;
          }

          .fade-in-right {
            animation: fadeInRight 0.8s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
