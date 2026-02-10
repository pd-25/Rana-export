'use client'
import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Autoplay, Pagination } from "swiper/modules"
// Swiper global CSS is imported in app/layout.tsx
import BannerIcon from "@/public/home/banner-btn-icon.svg"
import BannerImage1 from "@/public/home/banner-image-01.png"
import BannerImage2 from "@/public/home/banner-image-02.png"
import BannerImage3 from "@/public/home/banner-image-03.png"
import BannerImage4 from "@/public/home/banner-image-04.png"
import BannerBackground from "@/public/home/home-banner-pic.png"
import BannerBottomInfoIcon1 from "@/public/home/home-banner-info-icon-01.svg"
import BannerBottomInfoIcon2 from "@/public/home/home-banner-info-icon-02.svg"
import BannerBottomInfoIcon3 from "@/public/home/home-banner-info-icon-03.svg"
import BannerFeaturesInfoIcon1 from "@/public/home/home-banner-features-info-icon-01.svg"
import BannerFeaturesInfoIcon2 from "@/public/home/home-banner-features-info-icon-02.svg"
import BannerFeaturesInfoIcon3 from "@/public/home/home-banner-features-info-icon-03.svg"
import BannerFeaturesInfoOverlayShape1 from "@/public/home/home-curve-shape-01.png"
import BannerFeaturesInfoOverlayShape2 from "@/public/home/home-curve-shape-02.png"
import BannerFloatingGraphic from "@/public/home/home-banner-floating-graphic.png"
import BannerFeaturesInfoFloatingGraphic1 from "@/public/home/home-banner-floating-graphic-01.png"
import BannerFeaturesInfoFloatingGraphic2 from "@/public/home/home-banner-floating-graphic-02.png"
import BannerFeaturesInfoFloatingGraphic3 from "@/public/home/home-banner-floating-graphic-03.png"
import BannerFeaturesInfoFloatingGraphic4 from "@/public/home/home-banner-floating-graphic-04.png"

export default function Banner() {
    return (
        <Box component="section" className="bannerWrapper">
            <Box className="bannerContentWrapper" sx={{ backgroundImage: `url(${BannerBackground.src})` }}>
                <Box className="floatingGraphic">
                    <Image src={BannerFloatingGraphic} alt="banner features info floating graphic" />
                </Box>
                <Container>
                    <Stack direction="column" spacing={8}>
                        <Box className="bannerContent" sx={{ textAlign: 'center' }}>
                            <Typography variant="h1" className="bannerTitle">
                                Explore mindfulness through sacred sound
                            </Typography>
                            <Typography variant="body1" className="bannerDescription">
                                with Silent Mind Singing Bowls
                            </Typography>
                            <Button variant="contained" color="primary" className="bannerButton" href="/" >
                                <Image src={BannerIcon} alt="banner button" width={44} height={28} />
                                explore the silence
                            </Button>
                        </Box>
                        <Box className="bannerImageSliderOuter" sx={{ textAlign: 'center' }}>
                            <Swiper
                                modules={[EffectFade, Autoplay, Pagination]}
                                effect="fade"
                                speed={2000}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                pagination={false}
                                loop={true}
                                className="bannerImageSlider"
                            >
                                <SwiperSlide>
                                    <Box className="bannerImageBox">
                                        <Image src={BannerImage1} alt="banner image" />
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="bannerImageBox">
                                        <Image src={BannerImage2} alt="banner image" />
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="bannerImageBox">
                                        <Image src={BannerImage3} alt="banner image" />
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="bannerImageBox">
                                        <Image src={BannerImage4} alt="banner image" />
                                    </Box>
                                </SwiperSlide>
                            </Swiper>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box className="bannerBottomInfoWrapper">
                <Container>
                    <Stack direction="row" spacing={4} justifyContent="space-between">
                        <Box className="bannerBottomInfoItem" sx={{ textAlign: 'center', width: { xs: 1, md: 2 / 3, lg: 1 / 3 } }}>
                            <Box className="bannerBottomInfoIcon">
                                <Image src={BannerBottomInfoIcon1} alt="banner bottom info icon" />
                            </Box>
                            <Box className="bannerBottomInfoContent">
                                <Typography variant="h3" className="bannerBottomInfoTitle">
                                    Wholesale B2B Business
                                </Typography>
                                <Typography variant="body1" className="bannerBottomInfoDescription">
                                    Unveil tradition and serenity With
                                    Handmade Singing Bowls We're
                                    your premier B2B source for
                                    authentic, handcrafted singing
                                    bowls, With wholesale prices and
                                    global shipping, expenence
                                    the essence of West Bengal
                                    artisanal mastery.
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="bannerBottomInfoItem" sx={{ textAlign: 'center', width: { xs: 1, md: 2 / 3, lg: 1 / 3 } }}>
                            <Box className="bannerBottomInfoIcon">
                                <Image src={BannerBottomInfoIcon2} alt="banner bottom info icon" />
                            </Box>
                            <Box className="bannerBottomInfoContent">
                                <Typography variant="h3" className="bannerBottomInfoTitle">
                                    Shipping Worldwide
                                </Typography>
                                <Typography variant="body1" className="bannerBottomInfoDescription">
                                    Experience the essence of Indian
                                    culture with Singing Bowls, As a top
                                    wholesaler  and exporter, we
                                    provide competitive wholesale
                                    prices for all types of singng bowls
                                    & Accessories. Please note that
                                    shipping costs may vary based on
                                    distance. Explore now
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="bannerBottomInfoItem" sx={{ textAlign: 'center', width: { xs: 1, md: 2 / 3, lg: 1 / 3 } }}>
                            <Box className="bannerBottomInfoIcon">
                                <Image src={BannerBottomInfoIcon3} alt="banner bottom info icon" />
                            </Box>
                            <Box className="bannerBottomInfoContent">
                                <Typography variant="h3" className="bannerBottomInfoTitle">
                                    PDF Catalog Available
                                </Typography>
                                <Typography variant="body1" className="bannerBottomInfoDescription">
                                    Discover the harmomous world of
                                    Handmade Singing Bowls' Check
                                    out our PDF With a vanety of sizes,
                                    weight, price and colors to your
                                    preferences Elevate your senses
                                    with our Indiantreasures
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
                <Box className="overlayShape">
                    <Image src={BannerFeaturesInfoOverlayShape1} alt="banner features info overlay shape" />
                </Box>
                <Box className="floatingGraphic">
                    <Image src={BannerFeaturesInfoFloatingGraphic1} alt="banner features info floating graphic" />
                    <Image src={BannerFeaturesInfoFloatingGraphic2} alt="banner features info floating graphic" />
                    <Image src={BannerFeaturesInfoFloatingGraphic3} alt="banner features info floating graphic" />
                    <Image src={BannerFeaturesInfoFloatingGraphic4} alt="banner features info floating graphic" />

                </Box>
            </Box>
            <Box className="bannerFeaturesInfoWrapper">
                <Box className="overlayShape">
                    <Image src={BannerFeaturesInfoOverlayShape1} alt="banner features info overlay shape" />
                    <Image src={BannerFeaturesInfoOverlayShape2} alt="banner features info overlay shape" />
                </Box>
                <Container>
                    <Stack direction="row" spacing={4} justifyContent="center">
                        <Box className="bannerFeaturesInfoBox" sx={{ textAlign: 'center', width: { xs: 1, md: 2 / 3, lg: 1 / 3 } }}>
                            <Typography variant="h3" className="bannerFeaturesInfoTitle">
                                Mindful <span>Mindful</span>
                            </Typography>
                            <Box className="bannerFeaturesInfoIcon">
                                <Image src={BannerFeaturesInfoIcon1} alt="banner features info icon" />
                            </Box>
                        </Box>
                        <Box className="bannerFeaturesInfoBox" sx={{ textAlign: 'center', width: { xs: 1, md: 1 / 3, lg: 1 / 3 } }}>
                            <Typography variant="h3" className="bannerFeaturesInfoTitle">
                                7 Chakra <span>Healing</span>
                            </Typography>
                            <Box className="bannerFeaturesInfoIcon">
                                <Image src={BannerFeaturesInfoIcon2} alt="banner features info icon" />
                            </Box>
                        </Box>
                        <Box className="bannerFeaturesInfoBox" sx={{ textAlign: 'center', width: { xs: 1, md: 2 / 3, lg: 1 / 3 } }}>
                            <Typography variant="h3" className="bannerFeaturesInfoTitle">
                                Inner <span>Peace</span>
                            </Typography>
                            <Box className="bannerFeaturesInfoIcon">
                                <Image src={BannerFeaturesInfoIcon3} alt="banner features info icon" />
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Box >
    );
}
