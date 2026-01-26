'use client'
import { useRef, useState } from "react"
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import Icon from "@/components/ui/icon/Icon"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import SingingBowlImage1 from "@/public/home/singing-bowl-pic-01.png"
import SingingBowlImage2 from "@/public/home/singing-bowl-pic-02.png"
import SingingBowlImage3 from "@/public/home/singing-bowl-pic-03.png"
import SingingBowlImage4 from "@/public/home/singing-bowl-pic-04.png"


export default function SingingBowl() {
    const swiperRef = useRef<SwiperType | null>(null)
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    const updateNavigationState = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
    }

    return (
        <Box component="section" className="serviceCategoryWrapper">
            <Container>
                <Stack direction="column" spacing={8}>
                    <Box className="sectionHeading" sx={{ textAlign: "center" }}>
                        <Typography variant="h2" component="h2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                            SINGING BOWL
                            <Icon name="headingIcon" width={48} height={48} style={{ marginBottom: "0" }} />
                        </Typography>
                        <Typography component="h3">
                            Sound That Grounds, Vibration That Heals.
                        </Typography>
                        <Typography variant="body1">
                            More than just a musical note — each singing bowl creates powerful frequencies that help
                            release stress, deepen focus, and invite inner peace into your daily life.
                        </Typography>
                    </Box>
                </Stack>
            </Container>
            <Box className="serviceCategorySliderOuter">
                <Stack direction="column" spacing={4}>
                    <Box className="serviceCategorySliderInner">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation={false}
                            pagination={false}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper
                                updateNavigationState(swiper)
                            }}
                            onSlideChange={(swiper) => {
                                updateNavigationState(swiper)
                            }}
                            // autoPlay={true}
                            loop={false}
                            speed={1000}
                            autoHeight={false}
                            // autoplay={{
                            //     delay: 1500,
                            //     disableOnInteraction: true,
                            // }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="serviceCategorySwiper"
                        >
                            <SwiperSlide>
                                <Box className="serviceCategorySliderItem">
                                    <Box className="imageHolder">
                                        <Image src={SingingBowlImage1} alt="singing bowl image" />
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
                                        <Image src={SingingBowlImage2} alt="singing bowl image" />
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
                                        <Image src={SingingBowlImage3} alt="singing bowl image" />
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
                                        <Image src={SingingBowlImage4} alt="singing bowl image" />
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
                                        <Image src={SingingBowlImage1} alt="singing bowl image" />
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
                    <Container>
                        <Box className="serviceCategorySliderFooterData" sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: 2 }}>
                            <Box className="sliderNavigation" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                                <IconButton
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    disabled={isBeginning}
                                    className={isBeginning ? "swiper-button-disabled" : ""}
                                    sx={{
                                        opacity: isBeginning ? 0.5 : 1,
                                        cursor: isBeginning ? "not-allowed" : "pointer",
                                        "&:disabled": {
                                            opacity: 0.5,
                                            cursor: "not-allowed"
                                        }
                                    }}
                                >
                                    <Icon name="arrowRight" width={20} height={20} style={{ transform: "rotate(180deg)" }} />
                                </IconButton>
                                <IconButton
                                    onClick={() => swiperRef.current?.slideNext()}
                                    disabled={isEnd}
                                    className={isEnd ? "swiper-button-disabled" : ""}
                                    sx={{
                                        opacity: isEnd ? 0.5 : 1,
                                        cursor: isEnd ? "not-allowed" : "pointer",
                                        "&:disabled": {
                                            opacity: 0.5,
                                            cursor: "not-allowed"
                                        }
                                    }}
                                >
                                    <Icon name="arrowRight" width={20} height={20} />
                                </IconButton>
                            </Box>
                            <Box className="actionButton" >
                                <Button variant="contained" color="primary" className="gradientButton">
                                    EXPLORE MORE
                                    <Icon name="ButtonArrow" width={27} height={27} />
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Stack>

            </Box>
        </Box>
    )
}