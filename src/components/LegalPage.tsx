import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  lang: 'nl' | 'en';
  onBack: () => void;
}

export function LegalPage({ type, lang, onBack }: LegalPageProps) {
  const content = {
    privacy: {
      nl: {
        title: "Privacybeleid",
        lastUpdated: "Laatst bijgewerkt: Juni 2026",
        sections: [
          {
            h: "1. Geen cookies, geen tracking",
            p: "Wij hechten veel waarde aan jouw privacy. Daarom maken wij op deze website geen gebruik van cookies, analytische software of trackingpixels. Je bezoek aan onze website is volledig anoniem. Er worden geen gegevens verzameld, gedeeld of verkocht aan derde partijen voor advertentiedoeleinden of profileringsdoeleinden."
          },
          {
            h: "2. Verwerking van contactgegevens",
            p: "De enige persoonsgegevens die wij verwerken, zijn de gegevens die je zelf vrijwillig aan ons verstrekt via het contactformulier (naam, e-mailadres en telefoonnummer). Deze gegevens worden uitsluitend gebruikt om:"
          },
          {
            h: "",
            bullets: [
              "Contact met je op te nemen naar aanleiding van je aanvraag.",
              "De door jou opgevraagde informatie of diensten te leveren."
            ]
          },
          {
            h: "3. Bewaartermijn",
            p: "Wij bewaren je contactgegevens niet langer dan strikt noodzakelijk is om de doelen te realiseren waarvoor je gegevens worden verzameld. Indien er geen samenwerking tot stand komt, worden je gegevens binnen 6 maanden veilig verwijderd."
          },
          {
            h: "4. Gegevens delen met derden",
            p: "[Bedrijfsnaam] verstrekt jouw gegevens uitsluitend aan derden als dit nodig is voor de uitvoering van onze overeenkomst of om te voldoen aan een wettelijke verplichting. In geen enkel geval verkopen wij jouw gegevens."
          },
          {
            h: "5. Jouw rechten",
            p: "Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heb je het recht om je eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door [Bedrijfsnaam]. Stuur hiervoor een e-mail naar info@carabusads.be of info@carabusads.com."
          }
        ]
      },
      en: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: June 2026",
        sections: [
          {
            h: "1. No cookies, no tracking",
            p: "We highly value your privacy. That is why we do not use cookies, analytics software, or tracking pixels on this website. Your visit to our website is completely anonymous. No data is collected, shared, or sold to third parties for advertising or profiling purposes."
          },
          {
            h: "2. Processing of contact details",
            p: "The only personal data we process is the information you voluntarily provide to us via the contact form (name, email address, and phone number). This data is used exclusively to:"
          },
          {
            h: "",
            bullets: [
              "Contact you regarding your request.",
              "Provide the information or services you have requested."
            ]
          },
          {
            h: "3. Retention period",
            p: "We do not store your contact details longer than is strictly necessary to achieve the purposes for which your data is collected. If no collaboration is established, your data will be securely deleted within 6 months."
          },
          {
            h: "4. Sharing data with third parties",
            p: "[Company Name] only provides your data to third parties if this is necessary for the execution of our agreement or to comply with a legal obligation. Under no circumstances do we sell your data."
          },
          {
            h: "5. Your rights",
            p: "You have the right to view, correct, or delete your personal data. In addition, you have the right to withdraw your consent for data processing or object to the processing of your personal data by [Company Name]. To do so, please send an email to info@carabusads.be or info@carabusads.com."
          }
        ]
      }
    },
    terms: {
      nl: {
        title: "Algemene Voorwaarden",
        lastUpdated: "Laatst bijgewerkt: Juni 2026",
        sections: [
          {
            h: "1. Toepasselijkheid",
            p: "Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes, werkzaamheden en overeenkomsten tussen [Bedrijfsnaam] (hierna: Opdrachtnemer) en de opdrachtgever."
          },
          {
            h: "2. Inspanningsverbintenis",
            p: "De dienstverlening van Opdrachtnemer, waaronder het beheren van advertentiecampagnes (zoals Meta Ads) en het bouwen van funnels, betreft altijd een inspanningsverbintenis en geen resultaatsverbintenis. Opdrachtnemer zal haar uiterste best doen om het gewenste resultaat te behalen, maar kan geen garanties afgeven over specifieke (financiële) resultaten of ROI (Return On Investment)."
          },
          {
            h: "3. Uitvoering van de opdracht",
            p: "Opdrachtnemer voert de opdracht uit naar beste inzicht en vermogen en overeenkomstig de eisen van goed vakmanschap. Opdrachtgever draagt er zorg voor dat alle gegevens, waarvan Opdrachtnemer aangeeft dat deze noodzakelijk zijn, tijdig worden verstrekt."
          },
          {
            h: "4. Aansprakelijkheid",
            p: "Opdrachtnemer is uitsluitend aansprakelijk voor directe schade die het gevolg is van opzet of bewuste roekeloosheid. De aansprakelijkheid van Opdrachtnemer is te allen tijde beperkt tot maximaal het factuurbedrag van de desbetreffende opdracht over de laatste 3 maanden. Opdrachtnemer is nimmer aansprakelijk voor indirecte schade, daaronder begrepen gevolgschade, gederfde winst, en advertentiekosten (budget) gespendeerd aan de platformen (zoals Facebook of Google)."
          },
          {
            h: "5. Betaling",
            p: "Facturen dienen te worden voldaan binnen de op de factuur aangegeven betalingstermijn, tenzij schriftelijk anders is overeengekomen. Bij het uitblijven van betaling behoudt Opdrachtnemer zich het recht voor de werkzaamheden en/of campagnes tijdelijk stop te zetten."
          },
          {
            h: "6. Intellectueel Eigendom",
            p: "Tenzij anders overeengekomen, behoudt Opdrachtnemer alle intellectuele eigendomsrechten op de door haar ontwikkelde strategieën, concepten, en ontwerpen."
          },
          {
            h: "7. Bedrijfsgegevens",
            p: "[Bedrijfsnaam]\n[Adres]\n[BTW Nummer]\nE-mail: info@carabusads.be / info@carabusads.com"
          }
        ]
      },
      en: {
        title: "Terms and Conditions",
        lastUpdated: "Last updated: June 2026",
        sections: [
          {
            h: "1. Applicability",
            p: "These general terms and conditions apply to all offers, quotations, work, and agreements between [Company Name] (hereinafter: Contractor) and the client."
          },
          {
            h: "2. Obligation to Perform to the Best of Ability",
            p: "The services provided by the Contractor, including managing advertising campaigns (such as Meta Ads) and building funnels, always constitute an obligation to perform to the best of their ability (inspanningsverbintenis) and not an obligation to achieve a specific result. The Contractor will do its utmost to achieve the desired result but cannot guarantee specific (financial) results or ROI (Return On Investment)."
          },
          {
            h: "3. Execution of the Agreement",
            p: "The Contractor executes the agreement to the best of its knowledge and ability and in accordance with the requirements of good workmanship. The client ensures that all data, which the Contractor indicates is necessary, is provided in a timely manner."
          },
          {
            h: "4. Liability",
            p: "The Contractor is only liable for direct damage resulting from intent or deliberate recklessness. The Contractor's liability is at all times limited to a maximum of the invoice amount for the relevant assignment over the last 3 months. The Contractor is never liable for indirect damage, including consequential damage, lost profits, and advertising costs (budget) spent on platforms (such as Facebook or Google)."
          },
          {
            h: "5. Payment",
            p: "Invoices must be paid within the payment term specified on the invoice, unless otherwise agreed in writing. In the event of non-payment, the Contractor reserves the right to temporarily suspend the work and/or campaigns."
          },
          {
            h: "6. Intellectual Property",
            p: "Unless otherwise agreed, the Contractor retains all intellectual property rights to the strategies, concepts, and designs it has developed."
          },
          {
            h: "7. Company Details",
            p: "[Company Name]\n[Address]\n[VAT Number]\nEmail: info@carabusads.be / info@carabusads.com"
          }
        ]
      }
    }
  };

  const activeContent = content[type][lang];

  return (
    <div className="min-h-screen bg-[var(--color-agency-bg)] pt-24 pb-16 px-6 sm:px-10 flex justify-center">
      <div className="max-w-[800px] w-full">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-10 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          {lang === 'nl' ? 'Terug naar home' : 'Back to home'}
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.04]"
        >
          <h1 className="font-display text-[32px] md:text-[40px] text-[var(--color-text-primary)] mb-2">
            {activeContent.title}
          </h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-10">
            {activeContent.lastUpdated}
          </p>

          <div className="flex flex-col gap-8 text-[15px] font-light text-[var(--color-text-secondary)] leading-relaxed">
            {activeContent.sections.map((section, idx) => (
              <div key={idx}>
                {section.h && (
                  <h2 className="font-outfit font-semibold text-[18px] text-[var(--color-text-primary)] mb-3">
                    {section.h}
                  </h2>
                )}
                {section.p && (
                  <p className="whitespace-pre-line">{section.p}</p>
                )}
                {section.bullets && (
                  <ul className="list-disc pl-5 mt-2 flex flex-col gap-2">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
