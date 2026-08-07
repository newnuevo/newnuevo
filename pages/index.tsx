import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as contentful from 'contentful'
import styles from '../styles/Home.module.css'

type ContentfulData = {
  email?: string
}

const services = [
  {
    number: "",
    title: "Strategy & ideation",
    description:
      "We pressure-test early concepts against real constraints - users, budget, timelines and turn them into a clear product direction.",
    detail: "Discovery / Consultation / Prototyping",
  },
  {
    number: "",
    title: "Design & branding",
    description:
      "We create distinctive identities and thoughtful visual systems that work consistently across print and digital.",
    detail: "Brand Identity / Print / Digital",
  },
  {
    number: "",
    title: "UX & UI design",
    description:
      "We shape clear, accessible interfaces around real user needs, from early flows and prototypes to flexible design systems.",
    detail: "Research / UX / UI",
  },
  {
    number: "",
    title: "Software development",
    description:
      "We build performant, accessible web applications and polished mobile products for iOS, Android and cross-platform delivery.",
    detail: "Websites / Applications / Mobile",
  },
];

const studies = [
  {
    number: '',
    eyebrow: 'Hotel & events venue',
    title: 'No. 30 Knightsbridge',
    description:
      'Case study coming soon',
    meta: 'Branding / Print / Digital',
    video: undefined,
    images: [
      {
        src: '/no30-1.jpg',
        alt: 'No. 30 Knightsbridge hotel sign',
      },
      {
        src: '/no30-2.jpg',
        alt: 'The upper floor interior at No. 30 Knightsbridge',
      },
      {
        src: '/no30-3.jpg',
        alt: 'The lounge interior at No. 30 Knightsbridge',
      },
    ],
  },
  {
    number: '02',
    eyebrow: 'Independent media brand',
    title: 'Courier Media',
    description:
      'Case study coming soon',
    meta: 'Digital / Web / Print',
    video: undefined,
    images: [
      {
        src: '/courier-1.jpeg',
        alt: 'Courier Media digital experiences displayed across mobile devices',
      },
      {
        src: '/courier-2.jpg',
        alt: 'Courier Media website and membership designs on two mobile devices',
      },
    ],
  },
  {
    number: '03',
    eyebrow: 'Creative content studio',
    title: 'Studio 5',
    description:
      'Case study coming soon',
    meta: 'Digital / Web',
    video: {
      src: '/studio-5-reel.mp4',
      poster: '/studio-5-poster.jpg',
      label: 'Studio 5 2025 showreel',
    },
    images: [],
  },
]

const client = contentful.createClient({
  space: process.env.CONTENT_SPACE_ID as string,
  accessToken: process.env.CONTENT_ACCESS_TOKEN as string,
})

const AnimatedMark = ({ instance }: { instance: 'hero' | 'nav' }) => (
  <svg
    className={styles.animatedMark}
    viewBox="0 0 91.4 91.2"
    role="presentation"
    aria-hidden="true"
    focusable="false"
  >
    <polygon
      id={`${instance}-top-left-black`}
      className={`${styles.animatedPiece} ${styles.pieceTopLeft}`}
      points="35.1,0.3 15,0.3 15,15.1 41.6,15.1"
    />
    <rect
      id={`${instance}-top-right-black`}
      className={`${styles.animatedPiece} ${styles.pieceTopRight}`}
      x="56"
      y="0.3"
      width="20.2"
      height="14.7"
    />
    <polygon
      id={`${instance}-top-center-black`}
      className={`${styles.animatedPiece} ${styles.pieceTopCenter}`}
      points="56,15.1 41.6,15.1 56,47.7"
    />
    <polygon
      id={`${instance}-right-top-red`}
      className={`${styles.animatedPiece} ${styles.animatedAccent} ${styles.pieceRightTop}`}
      fill="#ff5b55"
      points="91,35.2 91,15.1 76.2,15.1 76.2,41.7"
    />
    <polygon
      id={`${instance}-right-center-red`}
      className={`${styles.animatedPiece} ${styles.animatedAccent} ${styles.pieceRightCenter}`}
      fill="#ff5b55"
      points="43.6,56.1 76.2,56.1 76.2,41.7"
    />
    <rect
      id={`${instance}-right-bottom-red`}
      className={`${styles.animatedPiece} ${styles.animatedAccent} ${styles.pieceRightBottom}`}
      fill="#ff5b55"
      x="76.2"
      y="56.1"
      width="14.7"
      height="20.2"
    />
    <polygon
      id={`${instance}-bottom-right-red`}
      className={`${styles.animatedPiece} ${styles.pieceBottomRight}`}
      points="56,91.1 76.2,91.1 76.2,76.3 49.2,76.3"
    />
    <polygon
      id={`${instance}-bottom-centre-black`}
      className={`${styles.animatedPiece} ${styles.pieceBottomCenter}`}
      points="35.2,76.3 49.2,76.3 35.2,46.2"
    />
    <rect
      id={`${instance}-bottom-left-black`}
      className={`${styles.animatedPiece} ${styles.pieceBottomLeft}`}
      x="15"
      y="76.3"
      width="20.2"
      height="14.7"
    />
    <rect
      id={`${instance}-left-top-red`}
      className={`${styles.animatedPiece} ${styles.animatedAccent} ${styles.pieceLeftTop}`}
      fill="#ff5b55"
      x="0.2"
      y="15.1"
      width="14.7"
      height="20.2"
    />
    <polygon
      id={`${instance}-left-center-red`}
      className={`${styles.animatedPiece} ${styles.animatedAccent} ${styles.pieceLeftCenter}`}
      fill="#ff5b55"
      points="15,35.3 15,49.3 45.1,35.3"
    />
    <polygon
      id={`${instance}-left-bottom-red`}
      className={`${styles.animatedPiece} ${styles.animatedAccent} ${styles.pieceLeftBottom}`}
      fill="#ff5b55"
      points="0.2,56.1 0.2,76.3 15,76.3 15,49.3"
    />
  </svg>
)

const Home: NextPage<ContentfulData> = ({ email }) => {
  const contactEmail = email || 'hello@newnuevo.com'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 48)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const revealEverything = () => {
      revealElements.forEach((element) => element.setAttribute('data-reveal-state', 'visible'))
    }

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealEverything()
      return
    }

    revealElements.forEach((element) => element.setAttribute('data-reveal-state', 'pending'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-reveal-state', 'visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const organisationData = {
    '@context': 'https://schema.org',
    '@type': 'Organisation',
    name: 'New Nuevo Ltd',
    url: 'https://newnuevo.com/',
    email: contactEmail,
    description:
      'A London digital product studio specialising in product strategy, UX and UI design, web platforms, and mobile development.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'First Floor, 7 Blackhorse Lane',
      addressLocality: 'London',
      postalCode: 'E17 6DS',
      addressCountry: 'GB',
    },
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>New Nuevo | Digital Product Studio, London</title>
        <meta
          name="description"
          content="New Nuevo is a London digital product studio designing and building useful, characterful web and mobile experiences."
        />
        <link rel="canonical" href="https://newnuevo.com/" />
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
        <meta property="og:url" content="https://newnuevo.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="New Nuevo | Digital Product Studio" />
        <meta
          property="og:description"
          content="We design and build digital products with care."
        />
        <meta property="og:image" content="https://newnuevo.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="New Nuevo. We design and build digital products with character." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="New Nuevo | Digital Product Studio" />
        <meta
          name="twitter:description"
          content="We design and build digital products with care."
        />
        <meta name="twitter:image" content="https://newnuevo.com/og.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationData) }}
        />
      </Head>

      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <a className={styles.brand} href="#top" aria-label="New Nuevo, back to top">
          <span className={styles.brandFull}>
            <Image
              src="/new-nuevo-logo-black.svg"
              alt="New Nuevo"
              width={104}
              height={63}
              priority
            />
          </span>
          <span className={styles.brandCompact} aria-hidden="true">
            <AnimatedMark instance="nav" />
          </span>
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 id="hero-title">
              We design and build digital products <span className={styles.heroCare}>with care.</span>
            </h1>
          </div>

          <div className={styles.heroArtwork} aria-hidden="true">
            <div className={styles.heroMark}>
              <AnimatedMark instance="hero" />
            </div>
          </div>
        </section>

        <section className={styles.section} id="services" aria-labelledby="services-title">
          <div className={`${styles.sectionHeading} ${styles.reveal}`} data-reveal>
            <h2 id="services-title">From initial ideas to finished products.</h2>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article
                className={`${styles.serviceCard} ${styles.reveal}`}
                key={service.title}
                data-reveal
              >
                <div className={styles.serviceTopline}>
                  <span>{service.number}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <small>{service.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.workSection}`} id="work" aria-labelledby="work-title">
          <div className={`${styles.workHeading} ${styles.reveal}`} data-reveal>
            <div>
              <h2 id="work-title">Recent projects</h2>
            </div>
          </div>

          <div className={styles.studyGrid}>
            {studies.map((study) => (
              <article className={`${styles.study} ${styles.reveal}`} key={study.number} data-reveal>
                <div className={`${styles.studyImage} ${study.video ? styles.studyImageVideo : ''}`}>
                  {study.video ? (
                    <video
                      className={styles.studyVideo}
                      poster={study.video.poster}
                      aria-label={study.video.label}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={study.video.src} type="video/mp4" />
                    </video>
                  ) : (
                    study.images.map((image, imageIndex) => (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className={
                          study.images.length > 1
                            ? `${styles.studyImageFrame} ${study.images.length === 2 ? styles.studyImageFrameTwo : ''} ${imageIndex === 0 ? styles.studyImageFrameFirst : ''}`
                            : undefined
                        }
                        style={{
                          animationDelay: `${imageIndex === 0 ? 0 : (imageIndex - study.images.length) * 5}s`,
                        }}
                        key={image.src}
                      />
                    ))
                  )}
                </div>
                <div className={styles.studyMeta}>
                  <div>
                    <p className={styles.studyEyebrow}>{study.eyebrow}</p>
                    <h3>{study.title}</h3>
                    {study.description && (
                      <p className={styles.studyDescription}>{study.description}</p>
                    )}
                  </div>
                  <span>{study.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.locationSection}`} id="location" aria-labelledby="location-title">
          <div className={`${styles.locationHeading} ${styles.reveal}`} data-reveal>
            <p className={styles.eyebrow}>Where to find us</p>
            <h2 id="location-title">Made in London.</h2>
          </div>
          <div className={`${styles.locationAddress} ${styles.reveal}`} data-reveal>
            <address>
              <strong>Creative Works</strong>
              <span>First Floor</span>
              <span>7 Blackhorse Lane</span>
              <span>London, E17 6DS</span>
            </address>
            <a
              className={styles.mapLink}
              href="https://www.google.co.uk/maps/place/Creative+Works/@51.5886675,-0.0420934,17z/data=!3m1!4b1!4m5!3m4!1s0x48761dd1e1d2ff2d:0x3298c94ad8dc5a6c!8m2!3d51.5886642!4d-0.0399047"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
          <div className={`${styles.contactIntro} ${styles.reveal}`} data-reveal>
            <h2 id="contact-title">Have something in mind?</h2>
          </div>
          <a
            className={`${styles.contactEmail} ${styles.reveal}`}
            href={`mailto:${contactEmail}`}
            data-reveal
          >
            {contactEmail} <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.footerTop} ${styles.reveal}`} data-reveal>
          <a className={styles.footerBrand} href="#top" aria-label="New Nuevo, back to top">
            <Image
              src="/new-nuevo-logo-white.svg"
              alt="New Nuevo"
              width={150}
              height={91}
            />
          </a>
          <div className={styles.socialLinks}>
            <a href="https://instagram.com/thenewnuevo" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://twitter.com/thenewnuevo" target="_blank" rel="noreferrer">X / Twitter ↗</a>
            <a href={`mailto:${contactEmail}`}>Email us ↗</a>
          </div>
        </div>
        <div className={styles.footerLegal}>
          <span>© {new Date().getFullYear()} New Nuevo Ltd</span>
          <span>Company no. 11927264</span>
          <span>Registered office: 20–22 Wenlock Road, London, N1 7GU</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const data = await client.getEntry('6Ildm9AXKqXUUChAAJKLNT')

  return {
    props: {
      ...(data.fields as object),
    },
  }
}
