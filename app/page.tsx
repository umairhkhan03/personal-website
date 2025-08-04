"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Linkedin, Mail, Phone, ChevronDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useAnimation, useInView } from "framer-motion"
import { CVModal } from "@/components/cv-modal"

// Logo data with positions and animation parameters
const logos = [
  // Left side logos
  {
    src: "/images/natwest-logo.png",
    alt: "NatWest",
    width: 80,
    height: 80,
    initialX: -180,
    initialY: 0,
    initialZ: -20,
    floatX: 20,
    floatY: 15,
    floatZ: 30,
    rotateX: 15,
    rotateY: 15,
    rotateZ: 5,
    duration: 8,
    delay: 0,
  },
  {
    src: "/images/warwick-racing-logo.png",
    alt: "Warwick Racing",
    width: 100,
    height: 50,
    initialX: -160,
    initialY: 100,
    initialZ: -30,
    floatX: 15,
    floatY: -20,
    floatZ: 25,
    rotateX: -10,
    rotateY: 10,
    rotateZ: -5,
    duration: 10,
    delay: 1.5,
  },
  // Right side logos
  {
    src: "/images/paperbox-health-logo.png",
    alt: "Paperbox Health",
    width: 100,
    height: 50,
    initialX: 220,
    initialY: 0,
    initialZ: -25,
    floatX: -20,
    floatY: 15,
    floatZ: 20,
    rotateX: 10,
    rotateY: -15,
    rotateZ: 5,
    duration: 9,
    delay: 0.5,
  },
  {
    src: "/images/jlr-logo.png",
    alt: "Jaguar Land Rover",
    width: 120,
    height: 60,
    initialX: 240,
    initialY: 100,
    initialZ: -15,
    floatX: -15,
    floatY: -25,
    floatZ: 15,
    rotateX: -5,
    rotateY: 15,
    rotateZ: -10,
    duration: 11,
    delay: 2,
  },
]

// Floating Logo Component
const FloatingLogo = ({ logo }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x: logo.initialX,
        y: logo.initialY,
        z: logo.initialZ,
        perspective: 1000,
      }}
      animate={{
        x: [logo.initialX, logo.initialX + logo.floatX, logo.initialX],
        y: [logo.initialY, logo.initialY + logo.floatY, logo.initialY],
        z: [logo.initialZ, logo.initialZ + logo.floatZ, logo.initialZ],
        rotateX: [0, logo.rotateX, 0],
        rotateY: [0, logo.rotateY, 0],
        rotateZ: [0, logo.rotateZ, 0],
      }}
      transition={{
        duration: logo.duration,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Number.POSITIVE_INFINITY,
        delay: logo.delay,
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden backdrop-blur-sm bg-white p-3 shadow-lg"
        style={{
          transform: "perspective(1000px) rotateX(10deg) rotateY(10deg)",
          boxShadow: "0 10px 30px -5px rgba(98, 54, 255, 0.3)",
          border: "1px solid rgba(98, 54, 255, 0.2)",
        }}
      >
        <Image
          src={logo.src || "/placeholder.svg"}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="object-contain"
        />
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)
  const profileRef = useRef(null)
  const isInView = useInView(profileRef, { once: false })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      {/* CV Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6236FF]/20 via-zinc-950/5 to-transparent opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6236FF]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6236FF]/50 to-transparent"></div>
      </div>

      {/* Header/Hero Section */}
      <header className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Umair Husain Khan
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#6236FF] to-[#9170FF] rounded-full mb-6"></div>
              <p className="text-xl md:text-2xl mb-8 text-zinc-400">
                Electrical & Electronic Engineering Student | Entrepreneur
              </p>
              <div className="flex flex-wrap gap-4 mb-12 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(98,54,255,0.5)]"
                  onClick={() => window.open("https://www.linkedin.com/in/umair-h-khan/", "_blank")}
                >
                  <Linkedin className="mr-2 h-5 w-5 text-[#6236FF]" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(98,54,255,0.5)]"
                >
                  <Mail className="mr-2 h-5 w-5 text-[#6236FF]" />
                  umairhkhan03@gmail.com
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(98,54,255,0.5)]"
                >
                  <Phone className="mr-2 h-5 w-5 text-[#6236FF]" />
                  +447435387141
                </Button>
              </div>
            </motion.div>

            {/* Profile Image with Floating Logos */}
            <motion.div
              ref={profileRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center mb-20"
              style={{ perspective: 1000 }}
            >
              {/* Floating Logos */}
              <div className="absolute inset-0 w-full h-full">
                {logos.map((logo, index) => (
                  <FloatingLogo key={index} logo={logo} />
                ))}
              </div>

              {/* Profile Image */}
              <div className="relative w-44 h-44 md:w-56 md:h-56 z-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6236FF] to-[#9170FF] blur-2xl opacity-20"></div>
                <div className="absolute inset-0 rounded-full border border-zinc-700 overflow-hidden backdrop-blur-sm">
                  <Image src="/images/profile.png" alt="Umair Husain Khan" fill className="object-cover" />
                </div>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#6236FF] to-[#9170FF] opacity-50 blur"></div>
                <div className="absolute inset-0 rounded-full border border-zinc-700 overflow-hidden">
                  <Image src="/images/profile.png" alt="Umair Husain Khan" fill className="object-cover" />
                </div>

                {/* Animated Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px 5px rgba(98, 54, 255, 0.3)",
                      "0 0 30px 8px rgba(98, 54, 255, 0.5)",
                      "0 0 20px 5px rgba(98, 54, 255, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                ></motion.div>
              </div>
            </motion.div>

            <div className="mt-4">
              <Button
                variant="link"
                size="lg"
                className="text-zinc-400 hover:text-white group"
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }}
              >
                Explore my experience
                <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-10 left-0 right-0 flex justify-center lg:hidden"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <Button
            variant="link"
            size="lg"
            className="text-zinc-400 hover:text-white group animate-bounce"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-24">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              About Me
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              First-gen immigrant on a scholarship to UK. Got funded to research piezoelectric tiles at 18, then worked
              a year at Jaguar (before the terrible rebrand), then built UK's largest student startup community from 0
              to 1.7k+ members - all while juggling six jobs to pay bills.
            </p>
          </div>
        </motion.section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="experience" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-5 mb-12 bg-zinc-900/50 border border-zinc-800 rounded-full p-1 backdrop-blur-sm">
            <TabsTrigger
              value="experience"
              className="text-lg data-[state=active]:bg-[#6236FF] data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="text-lg data-[state=active]:bg-[#6236FF] data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-lg data-[state=active]:bg-[#6236FF] data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="awards"
              className="text-lg data-[state=active]:bg-[#6236FF] data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              Awards
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="text-lg data-[state=active]:bg-[#6236FF] data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <div className="space-y-8">
              <ExperienceCard
                title="Co-Founder"
                company="Redwood Founders"
                period="Jan. 2024 - Present"
                achievements={[
                  "Scaled one of UK's largest student startup communities to 600+ members, 1,000+ followers, backed by 2 angel investors.",
                  "Hosted 22+ events at 10 universities including talks by YC, EF, Techstars, and Innovate UK backed founders.",
                  "Built internal tools using Notion, automated community ops, and led marketing, speaker outreach, and podcast production.",
                  "Running a national summer buildathon, initiated collaborations with Google, EF, Techstars, Antler, and Barclays.",
                ]}
              />

              <ExperienceCard
                title="Digital Transformation Intern"
                company="NatWest"
                period="Jul. 2024 - Aug. 2024"
                achievements={[
                  "Project-1: Led the creation of the strategy for an AI ethics project impacting 60k+ employees, developed a double digit growth plan approved by the Head of Data & AI Innovation.",
                  "Project-2: Interviewed 10+ internal stakeholders to formulate a plan for offsetting bio-diversity impact, produced an analytics dashboard using Power BI aiming to reduce impact by 26% and increase credit diversification.",
                ]}
              />

              <ExperienceCard
                title="Year in Industry (Electronics & Systems)"
                company="Jaguar Land Rover (JLR)"
                period="Jul. 2023 - 2024"
                achievements={[
                  "Interviewed 35+ stakeholders and compiled 15+ key data points to create a PowerPoint guide for the vehicle assembly team, reducing time spent in assembling prototypes by 22% and improved efficiency in the Programme Delivery team.",
                  "Conducted 4 user trials using MATLAB, Simulink, CarMaker, and Unreal Engine 4. Performed usability and exploratory testing, invited participants and key stakeholders, recommendations approved by the Group Product Owner.",
                  "Selected as a JLR Undergraduate Ambassador, featured in promo material on YouTube, Instagram and print.",
                ]}
              />

              <ExperienceCard
                title="Electrical Systems Engineer"
                company="Warwick Racing"
                period="Oct. 2022 - Jul. 2023"
                achievements={[
                  "Worked on building the first ever self-built autonomous EV car to compete in Formula Student UK.",
                  "Designed custom PCBs using OrCAD, mounts and casings using Fusion 360, and wire harness design using Rapid Harness.",
                ]}
              />
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-900/80 p-6">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">University of Warwick</h3>
                      <p className="text-zinc-400">BEng Electrical and Electronic Engineering With Placement Year</p>
                    </div>
                    <span className="text-lg text-zinc-400 bg-zinc-800/50 px-4 py-1 rounded-full">2021 - 2025</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 list-disc pl-5 text-zinc-300">
                    <li>Predicted 1st Class Honours</li>
                    <li>
                      Systems Modelling & Control 80%, Maths & Data Analytics 78%, Engineering Design 78%, Business
                      Management 74%
                    </li>
                    <li>
                      Merit scholarship, Gold Award, Head of Marketing for Engineering Society, Head of Partnerships for
                      Warwick ISOC
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard
                title="Eye-tracking & Machine Learning Dyslexia Screening"
                period="Oct. 2024 - Present"
                tech="Python"
                description={[
                  "Developed a mobile-based dyslexia screening algorithm using front-facing eye-tracking and analysis of gaze patterns.",
                  "Created a User-Interface using Replit and ran a useability study with a score of 85/100.",
                  "Collaborated with Italian startup-Paperbox Health and presented findings at BCUR 2025 and ICUR 2025 conferences.",
                ]}
              />

              <ProjectCard
                title="Warwick Engineering Society - Head of Marketing"
                period="Apr. 2022 - Apr. 2023"
                description={[
                  "One of the largest societies with over 3000 members, co-ordinated the marketing strategy, social media, and newsletter.",
                  "Increased social media presence by over 256% and event attendance by over 134%, achieved the most liked post and most attended event ever.",
                ]}
              />

              <ProjectCard
                title="Vector Algebra game"
                period="June 2023"
                tech="MATLAB"
                description={[
                  "Developed a creative game in MATLAB to help 1st year engineering students visualise vector algebra and multiplication.",
                  "Implemented 3 modes -Learn, Single Player, and AI Mode with an algorithm to mimic an AI opponent. Final grade: 72%.",
                ]}
              />

              <ProjectCard
                title="Warwick ISOC - Head of Outreach"
                period="Jun. 2023 - 2024"
                description={[
                  "Fundraised over £72k over the year for various projects including Ramadan and Charity Week, secured 8 sponsorships.",
                  "Organised over 8 talks by scholars and 2 football tournaments for over 1000 members of the society.",
                ]}
              />

              <ProjectCard
                title="Piezoelectricity and Solar Based Energy Harvesting Device"
                period="Jul. 2022"
                tech="Arduino"
                description={[
                  "Wrote a research paper on the construction of a walkable tile incorporating piezoelectric and solar energy harvesters.",
                  "Presented a proof of concept built using an Arduino at the International Conference of Undergraduate Research (ICUR) held at Warwick. Received a bursary, 1st in Engineering.",
                ]}
              />
            </div>
          </TabsContent>

          {/* Awards Tab */}
          <TabsContent value="awards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AwardCard
                title="Albukhary Undergraduate Scholarship"
                description="1 of 10"
                period="Sep. 2021 – Jun. 2025"
              />

              <AwardCard title="Warwick Merit Scholarship" description="Top 5 in cohort" period="Feb. 2023" />

              <AwardCard title="Warwick Award Gold and Pioneer" description="1 of 15 in cohort" period="Nov. 2022" />

              <AwardCard
                title="Undergraduate Research Support Scheme Bursary"
                description="1st in Engineering"
                period="Jul. 2022"
              />
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Python",
                    "SQL",
                    "C++",
                    "Arduino",
                    "MATLAB",
                    "Simulink",
                    "HTML",
                    "CSS",
                    "MS Office",
                    "No-code tools",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-gradient-to-r from-[#6236FF]/20 to-[#9170FF]/20 hover:from-[#6236FF]/30 hover:to-[#9170FF]/30 text-white border border-[#6236FF]/30 px-4 py-2 text-base rounded-full transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Interests</h3>
                <ul className="list-disc pl-5 space-y-3 text-zinc-300">
                  <li>Table Tennis - Regional Finalist</li>
                  <li>Young Debater of the Year (U16)</li>
                  <li>Running - 27 minute 5k PB</li>
                  <li>Badminton - Society Captain</li>
                  <li>Languages - 370+ day Duolingo streak (Arabic)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* EF-themed Footer */}
      <footer className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-[#6236FF]/20 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Ready to Build Something Great with YC
            </h2>
            <p className="text-lg mb-12 max-w-2xl mx-auto text-zinc-400">
              Looking forward to the opportunity to join the Y Combinator community.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#6236FF] to-[#9170FF] hover:opacity-90 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(98,54,255,0.5)]"
              onClick={() => setIsCVModalOpen(true)}
            >
              Prefer the boring version? View my resume here
              <Eye className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

// Component for Experience Cards
function ExperienceCard({ title, company, period, achievements }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden hover:border-zinc-700 transition-colors duration-300">
        <CardContent className="p-0">
          <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-900/80 p-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-zinc-400">{company}</p>
              </div>
              <span className="text-zinc-400 bg-zinc-800/50 px-4 py-1 rounded-full">{period}</span>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4 list-disc pl-5 text-zinc-300">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Component for Project Cards
function ProjectCard({ title, period, tech, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden hover:border-zinc-700 transition-colors duration-300">
        <CardContent className="p-0">
          <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-900/80 p-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                {tech && (
                  <Badge className="mt-2 bg-gradient-to-r from-[#6236FF]/20 to-[#9170FF]/20 text-white border border-[#6236FF]/30 rounded-full">
                    {tech}
                  </Badge>
                )}
              </div>
              <span className="text-zinc-400 bg-zinc-800/50 px-4 py-1 rounded-full">{period}</span>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4 list-disc pl-5 text-zinc-300">
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Component for Award Cards
function AwardCard({ title, description, period }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden hover:border-zinc-700 transition-colors duration-300">
        <CardContent className="p-0">
          <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-900/80 p-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-zinc-400">{description}</p>
              </div>
              <span className="text-zinc-400 bg-zinc-800/50 px-4 py-1 rounded-full">{period}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
