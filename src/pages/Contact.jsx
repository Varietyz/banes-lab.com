// 📂 src/pages/Contact.jsx

export default function Contact() {
  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-12 md:py-24">
      <section className="max-w-6xl mx-auto bg-dark border border-gold rounded-xl shadow-xl p-6 md:p-12">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-heading text-gold text-center mb-4">
          Contact & Live Preview
        </h2>
        <div className="border-b-2 border-gold w-24 mx-auto mb-8" />

        {/* Embedded Figma / Contact Tool */}
        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/20 shadow-lg"></div>
      </section>
    </div>
  );
}
