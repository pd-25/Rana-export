'use client'
import Banner from "@/components/section/hero/Hero"
import Discover from "@/components/section/service-category/Discover"
import SingingBowl from "@/components/section/service-category/singing-bowl/SingingBowl"
import Stick from "@/components/section/service-category/stick/Stick"
import Tingsha from "@/components/section/service-category/tingsha/Tingsha"
import Gong from "@/components/section/service-category/gong/Gong"
import BellDorjee from "@/components/section/service-category/bell-dorjee/BellDorjee"
import Cushion from "@/components/section/service-category/cushion/Cushion"
import OtherProduct from "@/components/section/service-category/other-product/OtherProduct"
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
      <Stick />
      <Tingsha />
      <Gong />
      <BellDorjee />
      <Cushion />
      <OtherProduct />
      <CsrAwards />
      <TrustedService />
      <Testimonial />
      <ProductVideo />
    </>
  );
}
