'use client'

import { Box, Stack, Typography, Container, Button } from "@mui/material";
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
// Swiper global CSS is imported in app/layout.tsx
import clientAvatar1 from "@/public/home/client-avatar-01.png"
import clientAvatar2 from "@/public/home/client-avatar-02.png"
import quoteIcon1 from "@/public/home/quote-icon-01.svg"
import quoteIcon2 from "@/public/home/quote-icon-02.svg"



export default function Testimonial() {
    return (
        <Box component="section" className="testimonialWrapper">

            <Container>
                <Box className="sectionHeading" textAlign="center">
                    <Typography variant="h2" component="h2" >
                        Trusted by People Who Value Quality
                    </Typography>
                </Box>
                <Box className="testimonialSliderOuter">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                            nextEl: ".ComSliderNavigation .swiper-button-next",
                            prevEl: ".ComSliderNavigation .swiper-button-prev",
                        }}
                        pagination={false}
                        loop={true}
                        speed={1000}
                        // autoplay={false}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            1400: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1800: {
                                slidesPerView: 4,
                            },
                        }}
                        className="testimonialSwiper"
                    >
                        <SwiperSlide>
                            <Box className="testimonialCard">
                                <Box className="avatar">
                                    <Image src={clientAvatar1} alt="Avatar" />
                                </Box>
                                <Box className="reviewText">
                                    <Box className="quoteIcon">
                                        <Image src={quoteIcon1} alt="Quote Icon" />
                                        <Image src={quoteIcon2} alt="Quote Icon" />
                                    </Box>
                                    <Typography variant="body1">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                                        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                                        consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
                                        velit esse molestie consequat, vel
                                    </Typography>
                                </Box>
                                <Box className="autharInfo">
                                    <Typography variant="body1">
                                        <strong> Supriya Pramanik</strong> | Business Owner
                                    </Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box className="testimonialCard">
                                <Box className="avatar">
                                    <Image src={clientAvatar2} alt="Avatar" />
                                </Box>
                                <Box className="reviewText">
                                    <Box className="quoteIcon">
                                        <Image src={quoteIcon1} alt="Quote Icon" />
                                        <Image src={quoteIcon2} alt="Quote Icon" />
                                    </Box>
                                    <Typography variant="body1">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                                        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                                        consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
                                        velit esse molestie consequat, vel
                                    </Typography>
                                </Box>
                                <Box className="autharInfo">
                                    <Typography variant="body1">
                                        <strong> Sunita Jain</strong> | Business Owner
                                    </Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box className="testimonialCard">
                                <Box className="avatar">
                                    <Image src={clientAvatar1} alt="Avatar" />
                                </Box>
                                <Box className="reviewText">
                                    <Box className="quoteIcon">
                                        <Image src={quoteIcon1} alt="Quote Icon" />
                                        <Image src={quoteIcon2} alt="Quote Icon" />
                                    </Box>
                                    <Typography variant="body1">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                                        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                                        consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
                                        velit esse molestie consequat, vel
                                    </Typography>
                                </Box>
                                <Box className="autharInfo">
                                    <Typography variant="body1">
                                        <strong> Supriya Pramanik</strong> | Business Owner
                                    </Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box className="testimonialCard">
                                <Box className="avatar">
                                    <Image src={clientAvatar2} alt="Avatar" />
                                </Box>
                                <Box className="reviewText">
                                    <Box className="quoteIcon">
                                        <Image src={quoteIcon1} alt="Quote Icon" />
                                        <Image src={quoteIcon2} alt="Quote Icon" />
                                    </Box>
                                    <Typography variant="body1">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                                        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                                        consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
                                        velit esse molestie consequat, vel
                                    </Typography>
                                </Box>
                                <Box className="autharInfo">
                                    <Typography variant="body1">
                                        <strong> Sunita Jain</strong> | Business Owner
                                    </Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box className="testimonialCard">
                                <Box className="avatar">
                                    <Image src={clientAvatar2} alt="Avatar" />
                                </Box>
                                <Box className="reviewText">
                                    <Box className="quoteIcon">
                                        <Image src={quoteIcon1} alt="Quote Icon" />
                                        <Image src={quoteIcon2} alt="Quote Icon" />
                                    </Box>
                                    <Typography variant="body1">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                                        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                                        consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
                                        velit esse molestie consequat, vel
                                    </Typography>
                                </Box>
                                <Box className="autharInfo">
                                    <Typography variant="body1">
                                        <strong> Sunita Jain</strong> | Business Owner
                                    </Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    </Swiper>
                    <Box className="ComSliderNavigation">
                        <Box className="swiper-button-prev"></Box>
                        <Box className="swiper-button-next"></Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}