"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Icon from "@/components/ui/icon/Icon";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Swiper global CSS is imported in app/layout.tsx
import SingingBowlImage1 from "@/public/home/singing-bowl-pic-01.png";
import SingingBowlImage2 from "@/public/home/singing-bowl-pic-02.png";
import SingingBowlImage3 from "@/public/home/singing-bowl-pic-03.png";
import SingingBowlImage4 from "@/public/home/singing-bowl-pic-04.png";

export type SingingBowlSlide = {
  image: StaticImageData;
  title: string;
  meta: string[];
};

const SLIDES_SECTION_1: SingingBowlSlide[] = [
  {
    image: SingingBowlImage1,
    title: "Bengali traditional bowl",
    meta: ["Tibetan Singing Bowl", "Chakra Carving"],
  },
  {
    image: SingingBowlImage2,
    title: "Tibetan Hand Made Singing Bowl",
    meta: ["Tibetan Singing Bowl", "Chakra Carving"],
  },
  {
    image: SingingBowlImage3,
    title: "Bengali traditional bowl",
    meta: ["Tibetan Singing Bowl", "Chakra Carving"],
  },
  {
    image: SingingBowlImage4,
    title: "Jhamka Bowl",
    meta: ["Tibetan Singing Bowl", "Chakra Carving"],
  },
  {
    image: SingingBowlImage1,
    title: "Antique Tibetan Singing Bowl",
    meta: ["Tibetan Singing Bowl", "Chakra Carving"],
  },
];

const SWIPER_BREAKPOINTS = {
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 2 },
  1200: { slidesPerView: 3 },
  1366: { slidesPerView: 4 },
} as const;

function ProductSlideCard({
  image,
  title,
  meta,
  alt = "singing bowl",
}: {
  image: StaticImageData;
  title: string;
  meta: string[];
  alt?: string;
}) {
  return (
    <Box className="serviceCategorySliderItem">
      <Box className="imageHolder">
        <Image src={image} alt={alt} />
        <IconButton
          sx={{ backgroundColor: "#F4F4F4" }}
          aria-label="Add to wishlist"
        >
          <Icon name="wishList" width={24} height={24} />
        </IconButton>
      </Box>
      <Box className="contentHolder">
        <Typography variant="h3">{title}</Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="end"
          justifyContent="space-between"
        >
          <Box className="metaData">
            {meta.map((line, i) => (
              <Typography key={i} variant="body1">
                {line}
              </Typography>
            ))}
          </Box>
          <Box className="actionButtons">
            <IconButton
              sx={{ backgroundColor: "#FFFFFF" }}
              aria-label="3D view"
            >
              <Icon name="Product3DView" width={20} height={20} />
            </IconButton>
            <IconButton
              sx={{ backgroundColor: "#FFFFFF" }}
              aria-label="Add to cart"
            >
              <Icon name="AddToCart" width={20} height={20} />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default function SingingBowl() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncNavState = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    swiper.navigation?.update();
  }, []);

  useEffect(() => {
    const updateNavigation = () => {
      if (swiperRef.current) {
        requestAnimationFrame(() => swiperRef.current?.navigation?.update());
      }
    };
    const timeoutId = setTimeout(updateNavigation, 100);
    window.addEventListener("resize", updateNavigation);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateNavigation);
    };
  }, []);

  return (
    <>
      <Box
        component="section"
        className="serviceCategoryWrapper"
        id="singing-bowl-1"
        sx={{ backgroundColor: "#efcfce" }}
      >
        <Container>
          <Stack direction="column" spacing={8}>
            <Box className="sectionHeading" sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                SINGING BOWL
                <Icon
                  name="headingIcon"
                  width={48}
                  height={48}
                  style={{ marginBottom: "0" }}
                />
              </Typography>
              <Typography component="h3">
                Sound That Grounds, Vibration That Heals.
              </Typography>
              <Typography variant="body1">
                More than just a musical note — each singing bowl creates
                powerful frequencies that help release stress, deepen focus, and
                invite inner peace into your daily life.
              </Typography>
            </Box>
          </Stack>
        </Container>
        <Box className="serviceCategorySliderOuter">
          <Stack
            direction="column"
            spacing={4}
            className="serviceCategoryComponent"
          >
            <Box className="serviceCategorySliderInner">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={false}
                loop={false}
                speed={1000}
                autoHeight={false}
                navigation={{
                  nextEl:
                    "#singing-bowl-1 .ComSliderNavigation .swiper-button-next",
                  prevEl:
                    "#singing-bowl-1 .ComSliderNavigation .swiper-button-prev",
                }}
                autoplay={{ delay: 1500, disableOnInteraction: true }}
                breakpoints={SWIPER_BREAKPOINTS}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  syncNavState(swiper);
                }}
                onSlideChange={syncNavState}
                onSlideChangeTransitionEnd={syncNavState}
                onBreakpoint={(swiper) => swiper.navigation?.update()}
                className="serviceCategorySwiper"
              >
                {SLIDES_SECTION_1.map((slide, index) => (
                  <SwiperSlide key={`${slide.title}-${index}`}>
                    <ProductSlideCard
                      image={slide.image}
                      title={slide.title}
                      meta={slide.meta}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Container className="serviceCategorySliderFooterContainer">
              <Box
                className="serviceCategorySliderFooterData"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: 5,
                }}
              >
                <Box className="ComSliderNavigation">
                  <Box className="swiper-button-prev"></Box>
                  <Box className="swiper-button-next"></Box>
                </Box>
                <Box className="actionButton">
                  <Button
                    variant="contained"
                    color="primary"
                    className="gradientButton"
                  >
                    EXPLORE MORE
                    <Icon
                      name="ButtonArrow"
                      width={35}
                      height={35}
                      className="buttonArrowIcon"
                    />
                  </Button>
                </Box>
              </Box>
            </Container>
          </Stack>
        </Box>
      </Box>
      {/* <Box component="section" className="serviceCategoryWrapper" id="singing-bowl-2" sx={{ backgroundColor: "#FFE5DE" }}>

                <Box className="serviceCategorySliderOuter">
                    <Stack direction="column" spacing={4} className="serviceCategoryComponent">
                        <Box className="serviceCategorySliderInner">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination={false}
                                loop={false}
                                speed={1000}
                                autoHeight={false}
                                navigation={{
                                    nextEl: "#singing-bowl-2 .ComSliderNavigation .swiper-button-next",
                                    prevEl: "#singing-bowl-2 .ComSliderNavigation .swiper-button-prev",
                                }}
                                autoplay={{ delay: 1600, disableOnInteraction: true }}
                                breakpoints={SWIPER_BREAKPOINTS}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                    syncNavState(swiper);
                                }}
                                onSlideChange={syncNavState}
                                onSlideChangeTransitionEnd={syncNavState}
                                onBreakpoint={(swiper) => swiper.navigation?.update()}
                                className="serviceCategorySwiper"
                            >
                                {SLIDES_SECTION_1.map((slide, index) => (
                                    <SwiperSlide key={`section2-${slide.title}-${index}`}>
                                        <ProductSlideCard image={slide.image} title={slide.title} meta={slide.meta} />
                                    </SwiperSlide>
                                ))}
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
            <Box component="section" className="serviceCategoryWrapper" id="singing-bowl-3" sx={{ backgroundColor: "#F2E2E1" }}>

                <Box className="serviceCategorySliderOuter">
                    <Stack direction="column" spacing={4} className="serviceCategoryComponent">
                        <Box className="serviceCategorySliderInner">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination={false}
                                loop={false}
                                speed={1000}
                                autoHeight={false}
                                navigation={{
                                    nextEl: "#singing-bowl-3 .ComSliderNavigation .swiper-button-next",
                                    prevEl: "#singing-bowl-3 .ComSliderNavigation .swiper-button-prev",
                                }}
                                autoplay={{ delay: 1400, disableOnInteraction: true }}
                                breakpoints={SWIPER_BREAKPOINTS}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                    syncNavState(swiper);
                                }}
                                onSlideChange={syncNavState}
                                onSlideChangeTransitionEnd={syncNavState}
                                onBreakpoint={(swiper) => swiper.navigation?.update()}
                                className="serviceCategorySwiper"
                            >
                                {SLIDES_SECTION_1.map((slide, index) => (
                                    <SwiperSlide key={`section3-${slide.title}-${index}`}>
                                        <ProductSlideCard image={slide.image} title={slide.title} meta={slide.meta} />
                                    </SwiperSlide>
                                ))}
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
            </Box> */}
    </>
  );
}
