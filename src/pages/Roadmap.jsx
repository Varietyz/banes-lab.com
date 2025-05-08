import { Link } from 'react-router-dom';
import {
  FaWrench,
  FaLaptopCode,
  FaRocket,
  FaBriefcase,
  FaGraduationCap,
  FaCode
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Roadmap data structured with sections and nested subsections for full content
const roadmapData = [
  {
    title: 'The Early Days: Foundations',
    years: '2006–2014',
    icon: <FaGraduationCap className="text-gold text-3xl" />,
    subsections: [
      {
        title: 'Digital Graphics & Clan UI Design (2006–2011)',
        items: [
          'Started experimenting with digital graphics at 11, crafting unique UI overlays, avatars, and clan branding.',
          'Explored image editing, web design, and creative automation to fuel my passion.'
        ]
      },
      {
        title: 'Mechanical & Electrical Studies (2010–2014)',
        items: [
          'Dove into mechanics, welding, and electrical systems to understand the nuts and bolts of technology.',
          'Earned certifications in basic mechanics and electro-mechanics.',
          'Gained hands-on expertise as a student welder at Soetaert, mastering structural components and workshop tooling.'
        ]
      }
    ]
  },
  {
    title: 'Technical Mastery',
    years: '2014–2021',
    icon: <FaWrench className="text-gold text-3xl" />,
    subsections: [
      {
        title: 'Construction & Foundation Engineering Roles (2014–2020)',
        items: [
          'Operated heavy machinery at Soetaert, Ago Construct, and Omni-Tech, ensuring every project was built on solid ground.',
          'Commanded pumps, mixers, cranes, and laser leveling tools with precision.',
          'Led teams in high-pressure settings, always prioritizing safety and efficiency.',
          'Mentored junior crew, sharpening my leadership and logistics skills.'
        ]
      },
      {
        title: 'Daikin NV – Brazing Technician & Assembly (2020–2021)',
        items: [
          'Executed high-precision brazing for HVAC components, blending technical skill with attention to detail.',
          'Streamlined component logistics and strictly adhered to order protocols.',
          'Deepened my understanding of production flow and machine sequencing.'
        ]
      }
    ]
  },
  {
    title: 'Solo Venture & Entrepreneurial Spirit',
    years: '2021–2022',
    icon: <FaBriefcase className="text-gold text-3xl" />,
    subsections: [
      {
        title: 'Founder – JayBane Computers (2021)',
        items: [
          'Launched my own venture delivering PC servicing, remote support, hardware mods, and standout brand design.',
          'Handled logistics, CRM, and client onboarding with a hands-on approach.',
          'Built internal automation scripts and dashboards to keep operations smooth.',
          'Crafted clear documentation and service outlines to ensure customer success.'
        ]
      },
      {
        title: 'Validated by UNIZO (2022)',
        items: [
          'Showcased market readiness with a focus on automation, client onboarding, and technical clarity.',
          'Proved that a hands-on, innovative approach truly pays off.'
        ]
      }
    ]
  },
  {
    title: 'Corporate Communications',
    years: '2023–2024',
    icon: <FaBriefcase className="text-gold text-3xl" />,
    subsections: [
      {
        title: 'Orange (via Wengage/Konvert) – Admin & Contact Center (May–Dec 2023)',
        items: [
          'Managed full-spectrum casework for B2C and B2B, from billing corrections to escalations.',
          'Utilized tools like Salesforce and PeopleSoft to handle high call and chat volumes with ease.',
          'Achieved top sales performance while keeping customer service exceptional.',
          'Mastered ERP navigation and delivered rapid solutions, even in unscripted scenarios.',
          'Blended technical expertise with genuine empathy to exceed performance benchmarks.',
          {
            text: 'Benchmarks:',
            subitems: [
              '181% mobile sales target',
              '577% internet/TV sales growth',
              '92% case quality (target: 87%)',
              '99% interaction log accuracy (target: 98%)',
              'AHT: 668.34 sec (vs. 480 target) – showcasing deep sales engagement'
            ]
          }
        ]
      },
      {
        title: 'Fitco Grass – Operator & Line Supervisor Trainee (Nov 2022–May 2023)',
        items: [
          'Oversaw production targets for synthetic grass filament with precision.',
          'Adjusted software settings and calibrated machines to maintain stable output.',
          'Led staff training and managed shift layouts, always prioritizing operational excellence.',
          'Advocated for safety and streamlined production after critical incidents.',
          'Developed a sharp eye for production flow and risk mitigation.'
        ]
      },
      {
        title: 'Metagenics – Tablet Press Operator (May–Oct 2024)',
        items: [
          'Achieved ultra-precise pill compression with minimal product loss, proving technical mastery.',
          'Optimized production parameters to boost speed without compromising quality.',
          'Managed calibration, logs, and material stock with rigorous attention to detail.',
          'Identified and proposed improvements to enhance documentation and tracking.',
          'Learned firsthand how machine logic and programming converge.'
        ]
      }
    ]
  },
  {
    title: 'Full-Stack Systems Engineering & Developer UX',
    years: '2022–Present',
    icon: <FaLaptopCode className="text-gold text-3xl" />,
    subsections: [
      {
        title: 'Varietyz Bot (Discord.js, Node.js, SQLite)',
        items: [
          'Built a modular Discord bot with 150+ commands to automate clan events and sync real-time stats.',
          'Engineered a bingo pattern engine with smooth database integration, leaderboards, and team tracking.',
          'Developed robust service layers featuring emoji syncing and reliable API fallbacks.'
        ]
      },
      {
        title: 'RuneLite Plugins (Java)',
        items: [
          'Created **LiteRegenMeter** to unify plugin overlays into a sleek, theme-ready status system.',
          'Developed **Lite Utilities** with an inventory HUD, session profit tracking, and interactive tooltips.',
          'Delivered plugins to over 3.5K active users with a focus on clean, modular design.'
        ]
      },
      {
        title: 'banes-lab.com (React, Tailwind CSS)',
        items: [
          'Designed a modern portfolio with modal navigation, dark/light theme toggling, and dynamic content sorting.',
          'Maintained a minimal and elegant interface that stays true to my branding.',
          'Built a user-centric experience that’s both intuitive and visually polished.'
        ]
      },
      {
        title: 'RoseyRS Team',
        items: [
          'Crafted Discord interface templates and Twitch overlays that capture the brand’s identity.',
          'Developed comprehensive onboarding systems, navigation maps, and content guides to streamline team collaboration.'
        ]
      }
    ]
  },
  {
    title: 'Why I Love Software Engineering',
    years: '',
    icon: <FaCode className="text-gold text-3xl" />,
    subsections: [
      {
        title: '',
        items: [
          'I build with modularity, precision, and a genuine passion for creating user-friendly systems.',
          'Every line of code is an opportunity to solve problems in an elegant, scalable way.',
          'For me, software engineering is where creativity meets practicality, turning ideas into real-world solutions.'
        ]
      }
    ]
  },
  {
    title: 'What’s Next – My Career Goals',
    years: 'Future',
    icon: <FaRocket className="text-gold text-3xl" />,
    subsections: [
      {
        title: 'Target Roles',
        items: [
          'Full-Stack Developer (JavaScript/Node.js/Java)',
          'DevTools Engineer / Platform Architect',
          'Community Automation Engineer (Discord, Slack, API-first systems)',
          'UI/UX-Focused Systems Developer'
        ]
      },
      {
        title: 'Key Strengths',
        items: [
          'Self-taught, system-minded, and all about clean, scalable code.',
          'Deep expertise in real-world integrations and bot ecosystems.',
          'A pro at Markdown, GitHub workflows, and structured DB logic.',
          'Great at breaking down complex tech into plain, relatable language.'
        ]
      },
      {
        title: '',
        items: [
          '“I don’t just build features, I create systems that solve problems and feel effortlessly intuitive.”'
        ]
      }
    ]
  }
];

/**
 *
 */
export default function Roadmap() {
  // Variants for the vertical center line.
  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1.5, ease: 'easeOut' } }
  };

  // Variants for each roadmap section.
  // 'custom' is used to stagger the animation based on index.
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.2, duration: 0.5, ease: 'easeOut' }
    })
  };

  return (
    <div className="px-4 scroll-smooth flex justify-center">
      <section className="max-w-5xl w-full">
        {/* Page Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-gold text-center mb-6">
          Career Roadmap
        </h2>

        <div className="border-b-2 border-gold w-24 mx-auto mb-12" />

        {/* Timeline Wrapper */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          {/* Vertical Line Positioned in the Center */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 border-l-4 border-gold"
            variants={lineVariants}
            initial="hidden"
            animate="visible"></motion.div>

          {/* Timeline Content */}
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            {roadmapData.map((section, idx) => (
              <motion.div
                key={idx}
                className="mb-16 relative flex flex-col items-center"
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}>
                {/* Icon Container Centered on the Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark border-2 border-gold flex items-center justify-center shadow-lg">
                  {section.icon}
                </div>
                {/* Card Container for the Section Text */}
                <div className="w-full max-w-4xl lg:max-w-5xl mt-8 border-2 bg-dark border-gold p-4 sm:p-6 rounded-lg">
                  {/* Section Title & Years */}
                  <h3 className="text-2xl font-heading text-gold text-center mb-1">
                    {section.title}{' '}
                    {section.years && (
                      <span className="text-sm text-gray-300 font-body">({section.years})</span>
                    )}
                  </h3>
                  {/* Render each subsection */}
                  {section.subsections.map((sub, subIdx) => (
                    <div key={subIdx} className="ml-8 mb-4">
                      {sub.title && (
                        <h4 className="text-xl text-gold font-semibold mb-1">{sub.title}</h4>
                      )}
                      <ul className="list-disc list-inside text-gray-200">
                        {sub.items.map((item, itemIdx) =>
                          typeof item === 'object' && item.subitems ? (
                            <li key={itemIdx}>
                              <span className="font-semibold">{item.text}</span>
                              <ul className="list-disc list-inside ml-4 mt-1">
                                {item.subitems.map((subitem, subitemIdx) => (
                                  <li key={subitemIdx}>{subitem}</li>
                                ))}
                              </ul>
                            </li>
                          ) : (
                            <li key={itemIdx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-16 transform -translate-y-10">
          {' '}
          {/* Moves down by 8 units */}
          <Link
            to="/about"
            className="px-6 py-3 bg-gold text-dark font-bold rounded-full shadow hover:bg-accent transition duration-300">
            Learn More About Me
          </Link>
        </div>
      </section>
    </div>
  );
}
