'use client'
import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material"
import Link from "next/link"
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

export default function Banner({ data }: { data?: any }) {
    const content = data?.content || {};
    const title = data?.title || "Explore mindfulness through sacred sound";
    const subtitle = data?.subtitle || "with Silent Mind Singing Bowls";
    const buttonText = content.buttonText || "explore the silence";
    const buttonLink = content.buttonLink || "/";
    const backgroundImage = content.backgroundImage || BannerBackground.src;
    const sliderImagesRaw = content.sliderImages || [];
    const sliderImages = sliderImagesRaw.length > 0 ? sliderImagesRaw : [
        { image: BannerImage1, link: "" },
        { image: BannerImage2, link: "" },
        { image: BannerImage3, link: "" },
        { image: BannerImage4, link: "" },
    ];
    const bottomInfo = content.bottomInfo || [
        {
            title: "Wholesale B2B Business",
            description: "Unveil tradition and serenity With Handmade Singing Bowls We're your premier B2B source for authentic, handcrafted singing bowls, With wholesale prices and global shipping, expenence the essence of West Bengal artisanal mastery.",
            icon: BannerBottomInfoIcon1
        },
        {
            title: "Shipping Worldwide",
            description: "Experience the essence of Indian culture with Singing Bowls, As a top wholesaler and exporter, we provide competitive wholesale prices for all types of singng bowls & Accessories. Please note that shipping costs may vary based on distance. Explore now",
            icon: BannerBottomInfoIcon2
        },
        {
            title: "PDF Catalog Available",
            description: "Discover the harmomous world of Handmade Singing Bowls' Check out our PDF With a vanety of sizes, weight, price and colors to your preferences Elevate your senses with our Indiantreasures",
            icon: BannerBottomInfoIcon3
        }
    ];
    const features = content.features || [
        { title: "Mindful", subtitle: "Mindful", icon: BannerFeaturesInfoIcon1 },
        { title: "7 Chakra", subtitle: "Healing", icon: BannerFeaturesInfoIcon2 },
        { title: "Inner", subtitle: "Peace", icon: BannerFeaturesInfoIcon3 }
    ];

    return (
        <Box component="section" className="bannerWrapper">
            <Box className="bannerContentWrapper" sx={{ backgroundImage: `url(${backgroundImage})` }}>
                <Box className="floatingGraphic">
                    <Image src={BannerFloatingGraphic} alt="banner features info floating graphic" />
                </Box>
                <Container>
                    <Stack direction="column" spacing={8}>
                        <Box className="bannerContent" sx={{ textAlign: 'center' }}>
                            <Typography variant="h1" className="bannerTitle">
                                {title}
                            </Typography>
                            <Typography variant="body1" className="bannerDescription">
                                {subtitle}
                            </Typography>
                            <Button variant="contained" color="primary" className="bannerButton" href={buttonLink} >
                                <Image src={BannerIcon} alt="banner button" width={44} height={28} />
                                {buttonText}
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
                                {sliderImages.map((slide: any, idx: number) => {
                                    const img = typeof slide === 'string' 
                                        ? slide 
                                        : (slide?.image || BannerImage1);
                                    const link = (typeof slide === 'object' && slide !== null) ? slide.link : "";
                                    
                                    const slideContent = (
                                        <Box className="bannerImageBox">
                                            <Image 
                                                src={img} 
                                                alt={`banner image ${idx + 1}`} 
                                                width={1200} 
                                                height={600} 
                                                priority={idx === 0}
                                            />
                                        </Box>
                                    );

                                    return (
                                        <SwiperSlide key={idx}>
                                            {link ? (
                                                <Link href={link} style={{ display: 'block' }}>
                                                    {slideContent}
                                                </Link>
                                            ) : slideContent}
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box className="bannerBottomInfoWrapper">
                <Container>
                    <Stack direction="row" spacing={4} justifyContent="space-between" flexWrap="wrap">
                        {bottomInfo.map((info: any, idx: number) => (
                            <Box key={idx} className="bannerBottomInfoItem" sx={{ textAlign: 'center', width: { xs: 1, md: "calc(33.33% - 32px)" } }}>
                                <Box className="bannerBottomInfoIcon">
                                    <Image src={info.icon} alt="banner bottom info icon" width={60} height={60} />
                                </Box>
                                <Box className="bannerBottomInfoContent">
                                    <Typography variant="h3" className="bannerBottomInfoTitle">
                                        {info.title}
                                    </Typography>
                                    <Typography variant="body1" className="bannerBottomInfoDescription">
                                        {info.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
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
                    <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
                        {features.map((feature: any, idx: number) => (
                            <Box key={idx} className="bannerFeaturesInfoBox" sx={{ textAlign: 'center', width: { xs: 1, md: "calc(33.33% - 32px)" } }}>
                                <Typography variant="h3" className="bannerFeaturesInfoTitle">
                                    {feature.title} <span>{feature.subtitle}</span>
                                </Typography>
                                <Box className="bannerFeaturesInfoIcon">
                                    <Image src={feature.icon} alt="banner features info icon" width={100} height={100} />
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </Box >
    );
}
