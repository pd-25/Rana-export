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



export default function Testimonial({ data }: { data?: any }) {
    const content = data?.content || {};
    const title = data?.title || "Trusted by People Who Value Quality";
    const testimonials = content.testimonials || [
        {
            name: "Supriya Pramanik",
            role: "Business Owner",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel",
            avatar: clientAvatar1
        },
        {
            name: "Sunita Jain",
            role: "Business Owner",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel",
            avatar: clientAvatar2
        }
    ];

    return (
        <Box component="section" className="testimonialWrapper">

            <Container>
                <Box className="sectionHeading" textAlign="center">
                    <Typography variant="h2" component="h2" >
                        {title}
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
                        {testimonials.map((t: any, idx: number) => (
                            <SwiperSlide key={idx}>
                                <Box className="testimonialCard">
                                    <Box className="avatar">
                                        <Image src={t.avatar} alt={t.name} width={80} height={80} />
                                    </Box>
                                    <Box className="reviewText">
                                        <Box className="quoteIcon">
                                            <Image src={quoteIcon1} alt="Quote Icon" />
                                            <Image src={quoteIcon2} alt="Quote Icon" />
                                        </Box>
                                        <Typography variant="body1">
                                            {t.text}
                                        </Typography>
                                    </Box>
                                    <Box className="autharInfo">
                                        <Typography variant="body1">
                                            <strong> {t.name}</strong> | {t.role}
                                        </Typography>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
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