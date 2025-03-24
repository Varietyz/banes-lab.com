// 📂 src/components/ui/Modal.jsx
import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function Modal({ project, onClose }) {
  const [zoomed, setZoomed] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!project) return null;

  // Use project.gallery if it exists and has more than one image; otherwise fallback to single image
  const images =
    project.gallery && project.gallery.length > 1
      ? project.gallery
      : [project.image];

  const sliderOptions = {
    slidesPerView: 1,
    spacing: 0,
    slideChanged: (slider) => setActiveSlide(slider.track.details.rel),
  };

  const [sliderRef, slider] =
    images.length > 1 ? useKeenSlider(sliderOptions) : [null, null];

  return (
    <>
      {/* Zoomed Fullscreen Overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[999] bg-black bg-opacity-90 flex items-center justify-center cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <img
            src={images[activeSlide]}
            alt={`${project.title} zoomed`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* Main Modal Container */}
      <div
        className="fixed inset-0 z-[998] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <div
          className="bg-dark rounded-lg max-w-3xl w-full p-6 relative shadow-xl text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {images.length > 1 ? (
            <div className="relative">
              <div ref={sliderRef} className="keen-slider">
                {images.map((img, index) => (
                  <div key={index} className="keen-slider__slide">
                    <img
                      src={img}
                      alt={`${project.title} ${index + 1}`}
                      className="max-w-full h-auto mx-auto rounded mb-4 cursor-zoom-in"
                      onClick={() => setZoomed(true)}
                    />
                  </div>
                ))}
              </div>
              {slider && (
                <>
                  <button
                    onClick={() => slider.prev()}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 z-50 bg-gold text-dark px-3 py-2 rounded-full shadow hover:bg-accent transition"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => slider.next()}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 z-50 bg-gold text-dark px-3 py-2 rounded-full shadow hover:bg-accent transition"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="max-w-full h-auto mx-auto mb-4 cursor-zoom-in "
              onClick={() => setZoomed(true)}
            />
          )}

          <h2 className="text-2xl font-heading text-gold mb-2">{project.title}</h2>
          <p className="text-sm font-body mb-4">{project.description}</p>
          {project.tags && (
            <div className="flex flex-wrap gap-2 text-xs mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 border border-gold rounded-full text-gold">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-6 py-2 bg-gold text-dark font-semibold rounded-full hover:bg-accent transition"
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </>
  );
}
