'use client'
import Banner from "@/components/section/hero/Hero"
import Discover from "@/components/section/service-category/Discover"
import SingingBowl from "@/components/section/service-category/singing-bowl/SingingBowl"
import CsrAwards from "@/components/section/csr-awards/CsrAwards"
import TrustedService from "@/components/section/trusted-service/TrustedService"
import Testimonial from "@/components/section/testimonial/Testimonial"
import ProductVideo from "@/components/section/product-video/ProductVideo"


export default function Home() {
  return (
    <>
      <Banner />
      <Discover />
      <SingingBowl />
      <CsrAwards />
      <TrustedService />
      <Testimonial />
      <ProductVideo />
    </>
  );
}
