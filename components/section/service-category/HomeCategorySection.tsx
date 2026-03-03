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
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

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
  alt = "product",
  slug,
}: {
  image: string;
  title: string;
  meta: string[];
  alt?: string;
  slug: string;
}) {
  return (
    <Box className="serviceCategorySliderItem">
      <Box className="imageHolder">
        <Image
          src={image}
          alt={alt}
          width={400}
          height={480}
          style={{ objectFit: "contain" }}
        />
        <IconButton
          sx={{ backgroundColor: "#F4F4F4" }}
          aria-label="Add to wishlist"
        >
          <Icon name="wishList" width={24} height={24} />
        </IconButton>
      </Box>
      <Box className="contentHolder">
        <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
          <Typography variant="h3">{title}</Typography>
        </Link>
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

interface HomeCategorySectionProps {
  id: string;
  title: string;
  subHeading?: string;
  description?: string;
  backgroundColor: string;
  products: any[];
  categorySlug: string;
  autoplayDelay?: number;
}

export default function HomeCategorySection({
  id,
  title,
  subHeading,
  description,
  backgroundColor,
  products,
  categorySlug,
  autoplayDelay = 1500,
}: HomeCategorySectionProps) {
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

  if (!products || products.length === 0) return null;

  return (
    <Box
      component="section"
      className="serviceCategoryWrapper"
      id={id}
      sx={{ backgroundColor: backgroundColor }}
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
                textTransform: "uppercase",
              }}
            >
              {title}
              <Icon
                name="headingIcon"
                width={48}
                height={48}
                style={{ marginBottom: "0" }}
              />
            </Typography>
            {subHeading && <Typography component="h3">{subHeading}</Typography>}
            {description && (
              <Typography variant="body1">{description}</Typography>
            )}
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
              loop={products.length > 4}
              speed={1000}
              autoHeight={false}
              navigation={{
                nextEl: `#${id} .ComSliderNavigation .swiper-button-next`,
                prevEl: `#${id} .ComSliderNavigation .swiper-button-prev`,
              }}
              autoplay={{ delay: autoplayDelay, disableOnInteraction: true }}
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
              {products.map((product, index) => {
                // Determine meta data strings
                const meta = [];
                if (product.material) meta.push(product.material);
                // Extract some data from variants if possible, or use general info
                if (product.variants?.[0]?.data) {
                  const data = product.variants[0].data as any;
                  if (data["Weight (gm)"])
                    meta.push(`${data["Weight (gm)"]} gm`);
                  if (data["Size (cm)"]) meta.push(`${data["Size (cm)"]} cm`);
                  if (data["Weight"]) meta.push(`${data["Weight"]}`);
                  if (data["Size"]) meta.push(`${data["Size"]}`);
                  if (data["Liter"]) meta.push(`${data["Liter"]} L`);
                }

                return (
                  <SwiperSlide key={`${product.id}-${index}`}>
                    <ProductSlideCard
                      image={product.mainImage || "/placeholder.png"}
                      title={product.name}
                      meta={meta.slice(0, 2)}
                      slug={product.slug}
                    />
                  </SwiperSlide>
                );
              })}
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
                <Link href={`/category/${categorySlug}`} passHref>
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
                </Link>
              </Box>
            </Box>
          </Container>
        </Stack>
      </Box>
    </Box>
  );
}
