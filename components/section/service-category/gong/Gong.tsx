'use client'
import { useRef, useState, useEffect } from "react"
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import Icon from "@/components/ui/icon/Icon"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import GongImage1 from "@/public/home/gong-pic-01.png"
import GongImage2 from "@/public/home/gong-pic-02.png"
import GongImage3 from "@/public/home/gong-pic-03.png"
import GongImage4 from "@/public/home/gong-pic-04.png"


export default function Gong() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        // Update navigation state after mount and on resize
        const updateNavigation = () => {
            if (swiperRef.current) {
                // Use requestAnimationFrame to ensure DOM is ready
                requestAnimationFrame(() => {
                    if (swiperRef.current) {
                        swiperRef.current.navigation.update();
                    }
                });
            }
        };

        // Small delay to ensure navigation buttons are in DOM
        const timeoutId = setTimeout(updateNavigation, 100);
        window.addEventListener('resize', updateNavigation);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateNavigation);
        };
    }, []);

    return (
        <>
            <Box component="section" className="serviceCategoryWrapper" id="gong-1" sx={{ backgroundColor: "#FFE9F0" }}>
                <Container>
                    <Stack direction="column" spacing={8}>
                        <Box className="sectionHeading" sx={{ textAlign: "center" }}>
                            <Typography variant="h2" component="h2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                                GONG
                                <Icon name="headingIcon" width={48} height={48} style={{ marginBottom: "0" }} />
                            </Typography>
                            <Typography component="h3">
                                Sacred Sound, Infinite Stillness.
                            </Typography>
                            <Typography variant="body1">
                                Each Gong carries the wisdom of centuries — tuned to align energy, release blocks, and harmonize the
                                mind-body connection. Ideal for spiritual rituals, group healing, or solo practice.
                            </Typography>
                        </Box>
                    </Stack>
                </Container>
                <Box className="serviceCategorySliderOuter">
                    <Stack direction="column" spacing={4} className="serviceCategoryComponent">
                        <Box className="serviceCategorySliderInner">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination={false}
                                navigation={{
                                    nextEl: "#gong-1 .ComSliderNavigation .swiper-button-next",
                                    prevEl: "#gong-1 .ComSliderNavigation .swiper-button-prev",
                                }}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                    setIsBeginning(swiper.isBeginning);
                                    setIsEnd(swiper.isEnd);
                                }}
                                onInit={(swiper) => {
                                    // Update navigation state after Swiper is fully initialized
                                    swiper.navigation.update();
                                }}
                                onSlideChange={(swiper) => {
                                    setIsBeginning(swiper.isBeginning);
                                    setIsEnd(swiper.isEnd);
                                }}
                                onTransitionStart={() => {
                                    // Update navigation when transition starts (fires immediately on button click)
                                    // Use requestAnimationFrame to ensure DOM is ready
                                    requestAnimationFrame(() => {
                                        if (swiperRef.current && swiperRef.current.navigation) {
                                            swiperRef.current.navigation.update();
                                        }
                                    });
                                }}
                                onSlideChangeTransitionEnd={(swiper) => {
                                    // Update navigation after transition completes (critical for button clicks)
                                    setIsBeginning(swiper.isBeginning);
                                    setIsEnd(swiper.isEnd);
                                    // Use setTimeout to ensure Swiper's internal state is fully updated
                                    setTimeout(() => {
                                        swiper.navigation.update();
                                    }, 0);
                                }}
                                onReachBeginning={(swiper) => {
                                    // Explicitly handle when reaching the beginning
                                    setIsBeginning(true);
                                    setIsEnd(swiper.isEnd);
                                    setTimeout(() => {
                                        swiper.navigation.update();
                                    }, 0);
                                }}
                                onReachEnd={(swiper) => {
                                    // Explicitly handle when reaching the end
                                    setIsBeginning(swiper.isBeginning);
                                    setIsEnd(true);
                                    setTimeout(() => {
                                        swiper.navigation.update();
                                    }, 0);
                                }}
                                onBreakpoint={(swiper) => {
                                    // Update navigation when breakpoint changes (responsive)
                                    swiper.navigation.update();
                                }}
                                // autoPlay={true}
                                loop={false}
                                speed={1000}
                                autoHeight={false}
                                autoplay={{
                                    delay: 1500,
                                    disableOnInteraction: true,
                                }}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 2,
                                    },
                                    1200: {
                                        slidesPerView: 3,
                                    },
                                    1366: {
                                        slidesPerView: 4,
                                    },
                                }}
                                className="serviceCategorySwiper"
                            >
                                <SwiperSlide>
                                    <Box className="serviceCategorySliderItem">
                                        <Box className="imageHolder">
                                            <Image src={GongImage1} alt="singing bowl image" />
                                            <IconButton sx={{ backgroundColor: "#F4F4F4" }}>
                                                <Icon name="wishList" width={24} height={24} />
                                            </IconButton>
                                        </Box>
                                        <Box className="contentHolder">
                                            <Typography variant="h3">Bengali traditional bowl</Typography>

                                            <Stack direction="row" spacing={1} alignItems="end" justifyContent="space-between">
                                                <Box className="metaData">
                                                    <Typography variant="body1">Tibetan Singing Bowl </Typography>
                                                    <Typography variant="body1">Chakra Carving</Typography>

                                                </Box>
                                                <Box className="actionButtons">
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="Product3DView" width={20} height={20} />
                                                    </IconButton>
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="AddToCart" width={20} height={20} />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="serviceCategorySliderItem">
                                        <Box className="imageHolder">
                                            <Image src={GongImage2} alt="singing bowl image" />
                                            <IconButton sx={{ backgroundColor: "#F4F4F4" }}>
                                                <Icon name="wishList" width={24} height={24} />
                                            </IconButton>
                                        </Box>
                                        <Box className="contentHolder">
                                            <Typography variant="h3">Tibetan Hand Made Singing Bowl</Typography>

                                            <Stack direction="row" spacing={1} alignItems="end" justifyContent="space-between">
                                                <Box className="metaData">
                                                    <Typography variant="body1">Tibetan Singing Bowl </Typography>
                                                    <Typography variant="body1">Chakra Carving</Typography>

                                                </Box>
                                                <Box className="actionButtons">
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="Product3DView" width={20} height={20} />
                                                    </IconButton>
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="AddToCart" width={20} height={20} />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="serviceCategorySliderItem">
                                        <Box className="imageHolder">
                                            <Image src={GongImage3} alt="singing bowl image" />
                                            <IconButton sx={{ backgroundColor: "#F4F4F4" }}>
                                                <Icon name="wishList" width={24} height={24} />
                                            </IconButton>
                                        </Box>
                                        <Box className="contentHolder">
                                            <Typography variant="h3">Bengali traditional bowl</Typography>

                                            <Stack direction="row" spacing={1} alignItems="end" justifyContent="space-between">
                                                <Box className="metaData">
                                                    <Typography variant="body1">Tibetan Singing Bowl </Typography>
                                                    <Typography variant="body1">Chakra Carving</Typography>

                                                </Box>
                                                <Box className="actionButtons">
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="Product3DView" width={20} height={20} />
                                                    </IconButton>
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="AddToCart" width={20} height={20} />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="serviceCategorySliderItem">
                                        <Box className="imageHolder">
                                            <Image src={GongImage4} alt="singing bowl image" />
                                            <IconButton sx={{ backgroundColor: "#F4F4F4" }}>
                                                <Icon name="wishList" width={24} height={24} />
                                            </IconButton>
                                        </Box>
                                        <Box className="contentHolder">
                                            <Typography variant="h3">Jhamka Bowl</Typography>

                                            <Stack direction="row" spacing={1} alignItems="end" justifyContent="space-between">
                                                <Box className="metaData">
                                                    <Typography variant="body1">Tibetan Singing Bowl </Typography>
                                                    <Typography variant="body1">Chakra Carving</Typography>

                                                </Box>
                                                <Box className="actionButtons">
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="Product3DView" width={20} height={20} />
                                                    </IconButton>
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="AddToCart" width={20} height={20} />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="serviceCategorySliderItem">
                                        <Box className="imageHolder">
                                            <Image src={GongImage1} alt="singing bowl image" />
                                            <IconButton sx={{ backgroundColor: "#F4F4F4" }}>
                                                <Icon name="wishList" width={24} height={24} />
                                            </IconButton>
                                        </Box>
                                        <Box className="contentHolder">
                                            <Typography variant="h3">Antique Tibetan Singing Bowl</Typography>

                                            <Stack direction="row" spacing={1} alignItems="end" justifyContent="space-between">
                                                <Box className="metaData">
                                                    <Typography variant="body1">Tibetan Singing Bowl </Typography>
                                                    <Typography variant="body1">Chakra Carving</Typography>

                                                </Box>
                                                <Box className="actionButtons">
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="Product3DView" width={20} height={20} />
                                                    </IconButton>
                                                    <IconButton sx={{ backgroundColor: "#FFFFFF" }}>
                                                        <Icon name="AddToCart" width={20} height={20} />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            </Swiper>
                        </Box>
                        <Container className="serviceCategorySliderFooterContainer">
                            <Box className="serviceCategorySliderFooterData" sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: 5 }}>
                                <Box className="ComSliderNavigation">
                                    <Box className="swiper-button-prev"></Box>
                                    <Box className="swiper-button-next"></Box>
                                </Box>
                                <Box className="actionButton" >
                                    <Button variant="contained" color="primary" className="gradientButton">
                                        EXPLORE MORE
                                        <Icon name="ButtonArrow" width={35} height={35} className="buttonArrowIcon" />
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Stack>

                </Box>
            </Box>
        </>
    )
}