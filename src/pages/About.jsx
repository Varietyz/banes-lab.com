import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-12 md:py-24">
      <section className="max-w-5xl mx-auto bg-dark rounded-xl border border-gold shadow-xl p-8 md:p-12 text-white space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading text-gold mb-2">About Me</h2>
          <div className="border-b-2 border-gold w-24 mx-auto mb-6" />
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            I'm <span className="text-gold font-semibold">Bane</span>, a self-taught developer and
            designer with nearly 15 years of experience building full-stack systems, automation
            tools, and digital brand ecosystems. I specialize in solutions that balance visual
            precision with robust, scalable architecture.
          </p>
        </div>

        {/* Current Work */}
        <section className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-heading text-gold">What I'm Working On</h3>
          <p>
            I'm currently the <span className="text-gold font-semibold">Creative Lead</span> for{' '}
            <span className="text-gold font-semibold">RoseyRS</span>—a RuneScape content brand with
            over 22K subscribers and 4M+ views. I manage branding, Discord automation, visual asset
            creation, and team workflows in a collaborative VSCode + GDrive-powered environment.
          </p>
          <p>
            In parallel, I actively develop{' '}
            <span className="text-gold font-semibold">Varietyz Bot</span>, a production-grade
            Discord bot tailored for OSRS clans. It features real-time stat tracking, webhook
            integrations, event automations, and image rendering powered by the Wise Old Man API.
          </p>
          <p>
            Through <span className="text-gold font-semibold">banes-lab.com</span>, I showcase my
            full-stack work, plugin systems, Discord solutions, and design services aimed at
            creators, gamers, startups, and tech-forward brands.
          </p>
        </section>

        {/* Professional Background */}
        <section className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-heading text-gold">Professional Journey</h3>
          <p>
            My career began with founding{' '}
            <span className="text-gold font-semibold">Jaybane Computers</span>, a solo-run business
            offering custom PC builds, IT support, and brand design. After years of successful
            operation, I made a strategic decision to close it due to global economic
            factors—demonstrating long-term vision and financial responsibility.
          </p>
        </section>

        {/* Skills & Expertise */}
        <section className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-heading text-gold">Skills & Expertise</h3>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>
              <span className="text-gold font-semibold">Frontend:</span> React, Tailwind CSS,
              JavaScript, HTML5/CSS3
            </li>
            <li>
              <span className="text-gold font-semibold">Backend & APIs:</span> Node.js, Discord.js,
              REST APIs, Wise Old Man API
            </li>
            <li>
              <span className="text-gold font-semibold">Database:</span> SQLite3, Data Optimization,
              Schema Migrations
            </li>
            <li>
              <span className="text-gold font-semibold">Design:</span> UI/UX Systems, Adobe
              Photoshop, Custom Branding, Theming
            </li>
            <li>
              <span className="text-gold font-semibold">DevOps & Tools:</span> Git, VSCode
              (plugin-driven), PostCSS, ESLint, Prettier
            </li>
          </ul>
        </section>

        {/* Mindset & Approach */}
        <section className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-heading text-gold">How I Work</h3>
          <p>
            I think in systems, design with intention, and build autonomously. I bring a strong
            analytical mindset, deep pattern recognition, and a constant focus on modularity and
            scalability. My solutions aren’t just functional—they’re engineered for growth.
          </p>
          <p>
            I follow structured models like Lippitt-Knoster to guide sustainable change and team
            alignment. I create reusable templates, enforce file structure and quality control, and
            empower teams with automation.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h3 className="text-2xl md:text-3xl font-heading text-gold mb-4">Let’s Collaborate</h3>
          <p className="text-sm md:text-base mb-6 max-w-xl mx-auto">
            I'm open to remote roles in full-stack development, systems engineering, or Discord
            tech. Freelance contracts welcome (VAT available within 2 business weeks). If you need
            structured, performant, and design-driven solutions—I'm the one who builds it.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300">
            Contact Me
          </Link>
        </section>
      </section>
    </div>
  );
}
