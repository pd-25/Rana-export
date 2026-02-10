'use client'
import React from "react";
import Image from "next/image";
import { Box, Container, Typography, Stack, Button, Grid, IconButton } from "@mui/material";
import Icon from "@/components/ui/icon/Icon"
import BannerPic from "@/public/collection/collection-lisitng-banner.png";
import Separator from "@/public/collection/collection-listing-heading-separator.svg";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";
import ProductImage from "@/public/collection/singing-bowl-pic.png";
import BackgroundPattern from "@/public/collection/background-pattern.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function ColletionLisitng() {
    const prevRef = React.useRef<any>(null);
    const nextRef = React.useRef<any>(null);
    const [readMoreOpen, setReadMoreOpen] = React.useState(false);
    const toggleReadMoreParent = () => setReadMoreOpen((prev) => !prev);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const toggleSideBar = () => setSidebarOpen((prev) => !prev);
    return (
        <>
            <Box component="section" className="collectionListingWrapper">
                <Box className="bannerPic">
                    <Image src={BannerPic} alt="banner pic" />
                </Box>
                {/* <Container>
                    <Box className="collectionListingContent">
                        <Typography variant="h1" className="collectionListingTitle">
                            <span>SOUND</span> THAT GROUNDS <br />
                            <span>VIBRATION</span> THAT HEALS
                        </Typography>
                    </Box>
                </Container> */}
            </Box>
            <Box
                component="section"
                className="collectionListingProductWrapper"
                sx={{
                    backgroundImage: `url(${BackgroundPattern.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "80px 0"
                }}
            >
                <Container>

                    <Stack direction="row" className="listingProductRow" spacing={2} flexWrap="wrap">
                        <Box component="aside"
                            className={`sidebar ${sidebarOpen ? "sidebarToggled" : ""}`}
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(25% - 32px)", lg: "1 1 calc(25% - 24px)" },
                                minWidth: 0,
                            }}
                        >
                            <Box className="sidebarContent">
                                <Typography variant="h3" className="sidebarTitle" onClick={toggleSideBar}>
                                    Categories
                                    <Icon name="filter" width={24} height={24} style={{ marginBottom: "0" }} />
                                </Typography>
                                <Box className="siderBarListHolder">
                                    <IconButton className="closeButton" onClick={() => setSidebarOpen(false)}>
                                        <Icon name="close" width={35} height={35} style={{ marginBottom: "0" }} />
                                    </IconButton>
                                    <Box className="sideBarCategoryOuter">
                                        <Box className="sideBarCategoryInner">
                                            <Typography variant="body1" className="categoryName">Singing Bowl</Typography>
                                            <Box className="categoryLinkList">
                                                <Button className="categoryLinkItem">
                                                    Handmade Singing Bowl
                                                    <Icon name="ButtonArrow" width={14} height={14} style={{ marginBottom: "0" }} />
                                                </Button>
                                                <Button className="categoryLinkItem">
                                                    Custing Bowl
                                                    <Icon name="ButtonArrow" width={14} height={14} style={{ marginBottom: "0" }} />
                                                </Button>
                                                <Button className="categoryLinkItem">
                                                    Antique Old Bowl
                                                    <Icon name="ButtonArrow" width={14} height={14} style={{ marginBottom: "0" }} />
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box className="sideBarCategoryInner">
                                            <Typography variant="body1" className="categoryName">Stick</Typography>
                                            <Box className="categoryLinkList">
                                                <Button className="categoryLinkItem">
                                                    Wooden
                                                    <Icon name="ButtonArrow" width={14} height={14} style={{ marginBottom: "0" }} />
                                                </Button>
                                                <Button className="categoryLinkItem">
                                                    Leather
                                                    <Icon name="ButtonArrow" width={14} height={14} style={{ marginBottom: "0" }} />
                                                </Button>
                                                <Button className="categoryLinkItem">
                                                    Drum
                                                    <Icon name="ButtonArrow" width={14} height={14} style={{ marginBottom: "0" }} />
                                                </Button>
                                                <Button className="categoryLinkItem">
                                                    SP Stick
                                                    <Icon name="ButtonArrow" width={14} height={14} style={{ marginBottom: "0" }} />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="additionalCategoryOuter">
                                        <Box className="additionalCategoryIcon">
                                            <Image src={AdditionalCategoryIcon} alt="additional category icon" />
                                        </Box>
                                        <Box className="additionalCategoryInner">
                                            <Button className="additionalCategoryItem">
                                                New Products
                                            </Button>
                                            <Button className="additionalCategoryItem">
                                                Best Sellers
                                            </Button>
                                            <Button className="additionalCategoryItem">
                                                Special Ofers
                                            </Button>
                                            <Button className="additionalCategoryItem">
                                                Warehouse clearance
                                            </Button>
                                            <Button className="additionalCategoryItem">
                                                Discontinued Products
                                            </Button>
                                            <Button className="additionalCategoryItem">
                                                Offers of the Month
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            className="mainContent"
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(75% - 32px)", lg: "1 1 calc(75% - 24px)" },
                                minWidth: 0,
                            }}
                        >
                            <Box className="categoryHeading">
                                <Typography variant="h2" className="collectionListingTitle">Singing Bowl </Typography>
                                <Box className="separator">
                                    <Image src={Separator} alt="separator" />
                                </Box>
                            </Box>
                            <Box className="productResultOuter">
                                <Stack direction="row" className="productResultHeader" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between" mb="35px">
                                    <Box className="productResultHeaderTitle">
                                        <Typography variant="h3">Handmade Singing Bowl</Typography>
                                    </Box>
                                    <Box className="productResultHeaderAction" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 2, md: 6, lg: 10 } }}>
                                        <Box className="ComSliderNavigation" sx={{ marginTop: "0" }}>
                                            <IconButton color="primary" sx={{ background: "#F4D4CE !important", padding: "0", width: "45px", height: "45px", }}>
                                                <Icon name="chevronLeft" width={10} height={17} />
                                            </IconButton>
                                            <IconButton color="primary" sx={{ background: "#F4D4CE !important", padding: "0", width: "45px", height: "45px", }}>
                                                <Icon name="chevronRight" width={10} height={17} />
                                            </IconButton>
                                        </Box>
                                        <Button variant="outlined" className="outlineButton viewCompleteRangeButton">
                                            View Complete Range
                                            <Icon className="icon" name="OutlineButtonArrow" width={36} height={36} style={{ marginBottom: "0" }} />
                                        </Button>
                                    </Box>
                                </Stack>
                                <Box className="productCardListOuter">
                                    <Grid container spacing={2} className="productCardList">
                                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} className="productCard">
                                            <Box className="productCardInner">
                                                <Box className="productCardImage">
                                                    <Image src={ProductImage} alt="product image" />
                                                </Box>
                                                <Box className="productCardContent" sx={{ backgroundColor: "#FEF0EC" }}>
                                                    <Typography variant="h3" className="productCardTitle">Jam/Bengali Bowl</Typography>
                                                    <Typography variant="body1" className="productCardMeta" >(200 gm - 35 kg)</Typography>
                                                    <IconButton >
                                                        <Icon name="ViewProduct" width={40} height={40} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} className="productCard">
                                            <Box className="productCardInner">
                                                <Box className="productCardImage">
                                                    <Image src={ProductImage} alt="product image" />
                                                </Box>
                                                <Box className="productCardContent" sx={{ backgroundColor: "#FEF0EC" }}>
                                                    <Typography variant="h3" className="productCardTitle">Jam/Bengali Bowl</Typography>
                                                    <Typography variant="body1" className="productCardMeta" >(200 gm - 35 kg)</Typography>
                                                    <IconButton >
                                                        <Icon name="ViewProduct" width={40} height={40} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} className="productCard">
                                            <Box className="productCardInner">
                                                <Box className="productCardImage">
                                                    <Image src={ProductImage} alt="product image" />
                                                </Box>
                                                <Box className="productCardContent" sx={{ backgroundColor: "#FEF0EC" }}>
                                                    <Typography variant="h3" className="productCardTitle">Jam/Bengali Bowl</Typography>
                                                    <Typography variant="body1" className="productCardMeta" >(200 gm - 35 kg)</Typography>
                                                    <IconButton >
                                                        <Icon name="ViewProduct" width={40} height={40} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className="productPagination" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, marginTop: "40px" }}>
                                    <Button variant="outlined" className="outlineButton viewCompleteRangeButton">
                                        View Complete Range
                                        <Icon className="icon" name="OutlineButtonArrow" width={36} height={36} style={{ marginBottom: "0" }} />
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box >
            <Box
                component="section"
                className="collectionListingProductWrapper categorySubListingProductWrapper"
                sx={{
                    backgroundColor: "#fbf3e0",
                    padding: "40px 0"
                }}
            >
                <Container>

                    <Stack direction="row" className="listingProductRow" spacing={2} flexWrap="wrap">
                        <Box
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(25% - 32px)", lg: "1 1 calc(25% - 24px)" },
                                minWidth: 0,
                            }}
                        >
                        </Box>
                        <Box
                            className="mainContent"
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(75% - 32px)", lg: "1 1 calc(75% - 24px)" },
                                minWidth: 0,
                            }}
                        >
                            <Box className="productResultOuter">
                                <Stack direction="row" className="productResultHeader" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between" mb="35px">
                                    <Box className="productResultHeaderTitle">
                                        <Typography variant="h3">Custing Bowl
                                            <span style={{ margin: "0 10px" }}>
                                                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.23517e-08 -2.98023e-07L14.075 8.125L2.23517e-08 16.25V-2.98023e-07Z" fill="#995C69" />
                                                </svg>

                                            </span>
                                            Brass Made
                                        </Typography>
                                    </Box>
                                    <Box className="productResultHeaderAction" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 2, md: 6, lg: 10 } }}>
                                        <Box className="ComSliderNavigation" sx={{ marginTop: "0" }}>
                                            <Box className="swiper-button-prev" ref={prevRef} sx={{ background: "#fff !important" }}>
                                                <Icon name="chevronLeft" width={10} height={17} />
                                            </Box>
                                            <Box className="swiper-button-next" ref={nextRef} sx={{ background: "#fff !important" }}>
                                                <Icon name="chevronRight" width={10} height={17} />
                                            </Box>
                                        </Box>
                                        <Button variant="outlined" className="outlineButton viewCompleteRangeButton">
                                            View Complete Range
                                            <Icon className="icon" name="OutlineButtonArrow" width={36} height={36} style={{ marginBottom: "0" }} />
                                        </Button>
                                    </Box>
                                </Stack>
                                <Box className="productCardListOuter">
                                    <Box className="productCardList">
                                        <Swiper
                                            modules={[Navigation]}
                                            spaceBetween={16}
                                            slidesPerView={3}
                                            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                                            onBeforeInit={(swiper: any) => {
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }}
                                            breakpoints={{
                                                0: { slidesPerView: 1 },
                                                600: { slidesPerView: 2 },
                                                900: { slidesPerView: 3 },
                                            }}
                                            className="collectionListingSlider"
                                        >
                                            {[...Array(6)].map((_, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <Box className="productCard">
                                                        <Box className="productCardInner">
                                                            <Box className="productCardImage">
                                                                <Image src={ProductImage} alt={`product ${idx}`} />
                                                            </Box>
                                                            <Box className="productCardContent" sx={{ backgroundColor: "#FBE8D0" }}>
                                                                <Typography variant="h3" className="productCardTitle">Jam/Bengali Bowl</Typography>
                                                                <Typography variant="body1" className="productCardMeta">(200 gm - 35 kg)</Typography>
                                                                <IconButton>
                                                                    <Icon name="ViewProduct" width={40} height={40} />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="productResultOuter" sx={{ marginTop: "70px" }}>
                                <Stack direction="row" className="productResultHeader" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between" mb="35px">
                                    <Box className="productResultHeaderTitle">
                                        <Typography variant="h3">Custing Bowl
                                            <span style={{ margin: "0 10px" }}>
                                                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.23517e-08 -2.98023e-07L14.075 8.125L2.23517e-08 16.25V-2.98023e-07Z" fill="#995C69" />
                                                </svg>

                                            </span>
                                            Brass Made
                                        </Typography>
                                    </Box>
                                    <Box className="productResultHeaderAction" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 2, md: 6, lg: 10 } }}>
                                        <Box className="ComSliderNavigation" sx={{ marginTop: "0" }}>
                                            <Box className="swiper-button-prev" ref={prevRef} sx={{ background: "#fff !important" }}>
                                                <Icon name="chevronLeft" width={10} height={17} />
                                            </Box>
                                            <Box className="swiper-button-next" ref={nextRef} sx={{ background: "#fff !important" }}>
                                                <Icon name="chevronRight" width={10} height={17} />
                                            </Box>
                                        </Box>
                                        <Button variant="outlined" className="outlineButton viewCompleteRangeButton">
                                            View Complete Range
                                            <Icon className="icon" name="OutlineButtonArrow" width={36} height={36} style={{ marginBottom: "0" }} />
                                        </Button>
                                    </Box>
                                </Stack>
                                <Box className="productCardListOuter">
                                    <Box className="productCardList">
                                        <Swiper
                                            modules={[Navigation]}
                                            spaceBetween={16}
                                            slidesPerView={3}
                                            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                                            onBeforeInit={(swiper: any) => {
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }}
                                            breakpoints={{
                                                0: { slidesPerView: 1 },
                                                600: { slidesPerView: 2 },
                                                900: { slidesPerView: 3 },
                                            }}
                                            className="collectionListingSlider"
                                        >
                                            {[...Array(6)].map((_, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <Box className="productCard">
                                                        <Box className="productCardInner">
                                                            <Box className="productCardImage">
                                                                <Image src={ProductImage} alt={`product ${idx}`} />
                                                            </Box>
                                                            <Box className="productCardContent" sx={{ backgroundColor: "#FBE8D0" }}>
                                                                <Typography variant="h3" className="productCardTitle">Jam/Bengali Bowl</Typography>
                                                                <Typography variant="body1" className="productCardMeta">(200 gm - 35 kg)</Typography>
                                                                <IconButton>
                                                                    <Icon name="ViewProduct" width={40} height={40} />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box >
            <Box
                component="section"
                className="collectionListingProductWrapper categorySubListingProductWrapper"
                sx={{
                    backgroundColor: "#fdfcf8",
                    padding: "40px 0"
                }}
            >
                <Container>

                    <Stack direction="row" className="listingProductRow" spacing={2} flexWrap="wrap">
                        <Box
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(25% - 32px)", lg: "1 1 calc(25% - 24px)" },
                                minWidth: 0,
                            }}
                        >
                        </Box>
                        <Box
                            className="mainContent"
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(75% - 32px)", lg: "1 1 calc(75% - 24px)" },
                                minWidth: 0,
                            }}
                        >
                            <Box className="productResultOuter">
                                <Stack direction="row" className="productResultHeader" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between" mb="35px">
                                    <Box className="productResultHeaderTitle">
                                        <Typography variant="h3">Custing Bowl
                                            <span style={{ margin: "0 10px" }}>
                                                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.23517e-08 -2.98023e-07L14.075 8.125L2.23517e-08 16.25V-2.98023e-07Z" fill="#995C69" />
                                                </svg>

                                            </span>
                                            Brass Made
                                        </Typography>
                                    </Box>
                                    <Box className="productResultHeaderAction" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 2, md: 6, lg: 10 } }}>
                                        <Box className="ComSliderNavigation" sx={{ marginTop: "0" }}>
                                            <Box className="swiper-button-prev isLight" ref={prevRef} >
                                                <Icon name="chevronLeft" width={10} height={17} />
                                            </Box>
                                            <Box className="swiper-button-next isLight" ref={nextRef} >
                                                <Icon name="chevronRight" width={10} height={17} />
                                            </Box>
                                        </Box>
                                        <Button variant="outlined" className="outlineButton viewCompleteRangeButton">
                                            View Complete Range
                                            <Icon className="icon" name="OutlineButtonArrow" width={36} height={36} style={{ marginBottom: "0" }} />
                                        </Button>
                                    </Box>
                                </Stack>
                                <Box className="productCardListOuter">
                                    <Box className="productCardList">
                                        <Swiper
                                            modules={[Navigation]}
                                            spaceBetween={16}
                                            slidesPerView={3}
                                            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                                            onBeforeInit={(swiper: any) => {
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }}
                                            breakpoints={{
                                                0: { slidesPerView: 1 },
                                                600: { slidesPerView: 2 },
                                                900: { slidesPerView: 3 },
                                            }}
                                            className="collectionListingSlider"
                                        >
                                            {[...Array(6)].map((_, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <Box className="productCard">
                                                        <Box className="productCardInner">
                                                            <Box className="productCardImage">
                                                                <Image src={ProductImage} alt={`product ${idx}`} />
                                                            </Box>
                                                            <Box className="productCardContent" sx={{ backgroundColor: "#FEF0EC" }}>
                                                                <Typography variant="h3" className="productCardTitle">Jam/Bengali Bowl</Typography>
                                                                <Typography variant="body1" className="productCardMeta">(200 gm - 35 kg)</Typography>
                                                                <IconButton>
                                                                    <Icon name="ViewProduct" width={40} height={40} />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box >
            <Box component="section" className={readMoreOpen ? "collectionMoreInfoWrapper active" : "collectionMoreInfoWrapper"}>
                <Container>
                    <Box className="mainContent">
                        <Typography variant="h2" className="collectionListingTitle">Singing BOWL</Typography>
                    </Box>
                    <Box className="collectionMoreInfoContent">
                        <Box className="collectionMoreInfoTextOuter">
                            <Typography variant="body1" className="collectionMoreInfoText">
                                Singing bowl wholesaler in Europe. Online, you will fnd all kinds and sizes, from small singing bowls to large singing bowls weighing over 10kg. So, if you want to buy singing bowls, then Phoenix Import is your
                                supplier! Also in bulk, at attractive wholesale prices.
                            </Typography>
                            <Typography variant="body1" className="collectionMoreInfoText">
                                Read more below to fnd out about the diferent types, materials, sounds, beaters etc., and put together your own ideal singing bowls set. Singing bowl wholesaler in Europe. Online, you will fnd all kinds and
                                sizes, from small singing bowls to large singing bowls weighing over 10kg. So, if you want to buy singing bowls, then Phoenix Import is your supplier! Also in bulk, at attractive wholesale prices.
                            </Typography>
                            <Typography variant="body1" className="collectionMoreInfoText">
                                Read more below to fnd out about the diferent types, materials, sounds, beaters etc., and put together your own ideal singing bowls set Singing bowl wholesaler in Europe. Online, you will fnd all kinds and
                                sizes, from small singing bowls to large singing bowls weighing over 10kg. So, if you want to buy singing bowls, then Phoenix Import is your supplier! Also in bulk, at attractive wholesale prices.
                            </Typography>
                            <Typography variant="body1" className="collectionMoreInfoText">
                                Singing bowl wholesaler in Europe. Online, you will fnd all kinds and sizes, from small singing bowls to large singing bowls weighing over 10kg. So, if you want to buy singing bowls, then Phoenix Import is your
                                supplier! Also in bulk, at attractive wholesale prices.
                            </Typography>
                            <Typography variant="body1" className="collectionMoreInfoText">
                                Read more below to fnd out about the diferent types, materials, sounds, beaters etc., and put together your own ideal singing bowls set. Singing bowl wholesaler in Europe. Online, you will fnd all kinds and
                                sizes, from small singing bowls to large singing bowls weighing over 10kg. So, if you want to buy singing bowls, then Phoenix Import is your supplier! Also in bulk, at attractive wholesale prices.
                            </Typography>
                            <Typography variant="body1" className="collectionMoreInfoText">
                                Read more below to fnd out about the diferent types, materials, sounds, beaters etc., and put together your own ideal singing bowls set Singing bowl wholesaler in Europe. Online, you will fnd all kinds and
                                sizes, from small singing bowls to large singing bowls weighing over 10kg. So, if you want to buy singing bowls, then Phoenix Import is your supplier! Also in bulk, at attractive wholesale prices.
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", marginTop: "50px" }}>
                            <Button
                                variant="outlined"
                                className="readMoreButton"
                                color="primary"
                                onClick={toggleReadMoreParent}
                            >
                                READ MORE
                                <Icon className="icon" name="chevronRight" width={16} height={16} style={{ marginBottom: "0" }} />
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}