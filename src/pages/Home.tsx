import { useTranslation } from 'react-i18next'
import { Hero } from '../components/home/Hero'
import { Intro } from '../components/home/Intro'
import { FeaturedRooms } from '../components/home/FeaturedRooms'
import { LocationAdvantage } from '../components/home/LocationAdvantage'
import { Amenities } from '../components/home/Amenities'
import { CtaSection } from '../components/home/CtaSection'
import { ContactStrip } from '../components/home/ContactStrip'
import { PageSeo } from '../components/shared/PageSeo'

export function Home() {
  const { t } = useTranslation()
  return (
    <>
      <PageSeo title={t('seo.homeTitle')} description={t('seo.homeDescription')} />
      <Hero />
      <Intro />
      <FeaturedRooms />
      <LocationAdvantage />
      <Amenities />
      <CtaSection />
      <ContactStrip />
    </>
  )
}
