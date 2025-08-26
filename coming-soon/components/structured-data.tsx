export default function StructuredData() {
  // Organization schema
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enkaj",
    url: "https://enkaj.com",
    logo: "https://enkaj.com/logo.webp",
    description: "Enkaj is a comprehensive real estate platform that helps you find and book your ideal space.",
    sameAs: [
      "https://www.tiktok.com/@enkaaj",
      // Add other social profiles when available
    ],
  }

  // FAQ schema
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Enkaj?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enkaj is a comprehensive real estate platform that connects property seekers with their ideal spaces. Our platform streamlines the entire process from searching to booking, making it easier than ever to find and secure the perfect property.",
        },
      },
      {
        "@type": "Question",
        name: "When will Enkaj launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're currently in the final stages of development and will be launching soon. Sign up with your email to be notified as soon as we go live and get early access to our platform.",
        },
      },
      {
        "@type": "Question",
        name: "What types of properties will be available on Enkaj?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enkaj will feature a diverse range of properties including: 1. Residential properties, 2. Commercial spaces, 3. Student accommodations, 4. Storage facilities, 5. Furnished apartments. Our platform is designed to accommodate various real estate needs for both short and long-term arrangements.",
        },
      },
      {
        "@type": "Question",
        name: "How does the booking process work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Property Search and Selection: Online Browsing: Users browse available rental and lease listings on the Enkaj platform. Detailed property information, photos, and virtual tours (if available) are reviewed. Verification: Enkaj's verified listings ensure users are viewing legitimate properties from verified agents and property managers. Reservation and Deposit: Reservation Deposit: Once a user decides to secure a listing, they are required to pay a reservation deposit. This deposit marks the property as \"reserved,\" effectively taking it off the market. Purpose of Deposit: The deposit demonstrates the user's serious intent and provides security for the agent or property manager. Transparent Deposit Management: For cancellations, a 50% refund is automatically processed through our secure payment gateway, ensuring transparent and auditable transaction records.",
        },
      },
      {
        "@type": "Question",
        name: "How does Enkaj ensure security and trust?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rigorous Entity Validation: Enkaj employs a multi-layered verification process, including identity authentication and credential validation, to ensure the legitimacy of all listings, agents, and property managers. Secure Reservation Protocol: Upon reservation, a secure deposit transaction is processed, immediately tagging the listing as reserved within our platform's database, effectively removing it from public view.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  )
}

