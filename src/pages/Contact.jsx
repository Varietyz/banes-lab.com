// 📂 src/pages/Contact.jsx

/**
 *
 */
export default function Contact() {
  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
      <section className="max-w-4xl xl:max-w-6xl mx-auto bg-dark border border-gold rounded-xl shadow-xl p-4 sm:p-6 md:p-12">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-gold text-center mb-4">
          Contact & Live Preview
        </h2>

        <div className="border-b-2 border-gold w-24 mx-auto mb-8" />

        {/* Embedded Figma / Contact Tool */}
        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/20 shadow-lg max-w-full mx-auto mt-8 sm:mt-12 lg:mt-16">
          <iframe
            src="https://www.figma.com/embed?fileId=YOUR_FILE_ID"
            title="Live Preview"
            className="w-full h-full"
            allowFullScreen></iframe>
        </div>
      </section>
    </div>
  );
}
