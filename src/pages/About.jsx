import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-12 md:py-24">

      <section className="max-w-4xl mx-auto bg-dark rounded-xl border border-gold shadow-xl p-8 md:p-12 text-white">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-heading text-gold text-center mb-4">
          About Me
        </h2>
        <div className="border-b-2 border-gold w-24 mx-auto mb-8" />

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src="/assets/images/real_life/beach.jpg"
            alt="Bane Portrait"
            className="w-40 h-40 rounded-full border-2 border-gold shadow-md object-cover"
          />
          <div className="text-base md:text-lg leading-relaxed">
            <p>
              Hi, I'm <span className="text-gold font-semibold">Bane</span>, a self-taught developer and graphic designer. My passion for technology and design began purely from curiosity, which quickly evolved into an unwavering commitment to master the craft independently. Despite lacking formal education opportunities due to regional constraints, I've dedicated myself to proving my worth through relentless learning and practical application.
            </p>
          </div>
        </div>

        {/* Professional Experience Section */}
        <section className="mb-10">
          <h3 className="text-2xl md:text-3xl font-heading text-gold mb-4">Professional Journey</h3>
          <p className="text-sm md:text-base leading-relaxed">
            My professional journey includes running my own successful venture, <span className="text-gold font-semibold">Jaybane Computers</span>, a self-established business focused on custom computing solutions. Recognizing economic challenges, I proactively decided to close operations responsibly, demonstrating financial acumen and strategic foresight rather than succumbing to market pressures. My projects span <span className="text-gold font-semibold">frontend and backend development</span>, <span className="text-gold font-semibold">Discord community integrations</span>, and <span className="text-gold font-semibold">graphic and UI/UX design</span>, illustrating a unique blend of technical expertise and creative vision.
          </p>
        </section>

        {/* Skills & Expertise Section */}
        <section className="mb-10">
          <h3 className="text-2xl md:text-3xl font-heading text-gold mb-4">Skills & Expertise</h3>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li><span className="text-gold font-semibold">Frontend:</span> React, Tailwind CSS, JavaScript, HTML/CSS</li>
            <li><span className="text-gold font-semibold">Backend & APIs:</span> Node.js, Discord.js, Wise Old Man API</li>
            <li><span className="text-gold font-semibold">Database:</span> SQLite3, Data Optimization & Management</li>
            <li><span className="text-gold font-semibold">Design:</span> Adobe Photoshop, Custom UI/UX Design</li>
          </ul>
        </section>

        {/* Distinctive Traits Section */}
        <section className="mb-10">
          <h3 className="text-2xl md:text-3xl font-heading text-gold mb-4">What Sets Me Apart</h3>
          <p className="text-sm md:text-base leading-relaxed">
            My strengths lie in my <span className="text-gold font-semibold">analytical mindset</span>, exceptional <span className="text-gold font-semibold">pattern recognition</span>, and the ability to <span className="text-gold font-semibold">think outside the box</span>. I thrive in modifying and enhancing existing projects to improve functionality and user experience, with a keen focus on <span className="text-gold font-semibold">modularity and scalability</span>. My solutions aren't merely functional—they're robust, adaptable, and primed for growth.
          </p>
        </section>

        {/* Personal Philosophy Section */}
        <section className="mb-10">
          <h3 className="text-2xl md:text-3xl font-heading text-gold mb-4">My Philosophy</h3>
          <p className="text-sm md:text-base leading-relaxed">
            Driven by a passion for continual learning and improvement, I consistently push the boundaries of what's possible in design and technology. I believe effective solutions come from clear, thoughtful communication paired with meticulous execution, ultimately leading to meaningful and sustainable outcomes.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <h3 className="text-2xl md:text-3xl font-heading text-gold mb-4">Let's Collaborate!</h3>
          <p className="text-sm md:text-base mb-6">
            I'm always eager to take on new challenges and collaborate on exciting projects. Feel free to reach out—let's build something remarkable together.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300"
          >
            Contact Me
          </Link>
        </section>
      </section>
    </div>
  );
}