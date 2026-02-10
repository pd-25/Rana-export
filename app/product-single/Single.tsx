
'use client'
import Image from "next/image";
import { Box, Container, Typography, Stack, Button, Grid, IconButton, FormControl, Select, MenuItem, Table, TableBody, TableRow, TableCell } from "@mui/material";
import Icon from "@/components/ui/icon/Icon"
import BannerPic from "@/public/category/category-listing-banner.png";
import Separator from "@/public/collection/collection-listing-heading-separator.svg";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";
import ProductImage from "@/public/home/singing-bowl-pic-03.png";
import BackgroundPattern from "@/public/collection/background-pattern.png";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules"





export default function Single() {
    const [readMoreOpen, setReadMoreOpen] = React.useState(false);
    const toggleReadMoreParent = () => setReadMoreOpen((prev) => !prev);
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);
    const prevRef1 = React.useRef<any>(null);
    const nextRef1 = React.useRef<any>(null);
    const prevRef2 = React.useRef<any>(null);
    const nextRef2 = React.useRef<any>(null);
    const [quantity, setQuantity] = React.useState<number>(1);
    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => Math.max(1, q - 1));
    const [galleryActiveIndex, setGalleryActiveIndex] = React.useState(0);
    const galleryImages = [
        ProductImage,
        ProductImage,
        ProductImage,
        ProductImage,
        ProductImage,
        ProductImage,
    ];
    return (
        <>

            <Box
                component="section"
                className="collectionListingProductWrapper categoryListingProductWrapper"
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
                            className="sidebar"
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(25% - 32px)", lg: "1 1 calc(20% - 24px)" },
                                minWidth: 0, marginTop: "0 !important"
                            }}
                        >
                            <Box className="sidebarContent">
                                <Typography variant="h3" className="sidebarTitle">
                                    Categories
                                </Typography>
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
                        <Box
                            className="mainContent"
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(75% - 32px)", lg: "1 1 calc(80% - 24px)" },
                                minWidth: 0,
                            }}
                        >
                            <Grid container spacing={2} className="productSingleContentRow">
                                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 7, xl: 7 }} className="productSingleGalleryOuter">
                                    <Box className="productSingleGalleryInner">

                                        <Box className="productSingleGalleryMainImageBox">
                                            <Box className="actionBtn">
                                                <IconButton color="primary">
                                                    <Icon name="wishListGray" width={30} height={30} />
                                                </IconButton>
                                                <IconButton color="primary">
                                                    <Icon name="share" width={30} height={30} />
                                                </IconButton>
                                            </Box>
                                            {/* Main slider */}
                                            <Swiper
                                                modules={[Navigation, Thumbs, Autoplay, Pagination]}
                                                navigation
                                                pagination={{ clickable: true }}
                                                thumbs={{ swiper: thumbsSwiper }}
                                                loop={true}
                                                speed={1000}
                                                autoplay={{
                                                    delay: 3000,
                                                    disableOnInteraction: false,
                                                }}
                                                onSlideChange={(swiper) => setGalleryActiveIndex(swiper.realIndex)}
                                                onSwiper={(swiper) => setGalleryActiveIndex(swiper.realIndex)}
                                                className="productSingleGalleryMainSlider"
                                            >
                                                {galleryImages.map((img, idx) => (
                                                    <SwiperSlide key={idx} className="productSingleGalleryCard">
                                                        <Box className="productSingleGalleryCardImageBox">
                                                            <Image src={img} alt={`product image ${idx}`} />

                                                        </Box>
                                                    </SwiperSlide>

                                                ))}
                                            </Swiper>
                                            <Typography component="span" className="productSingleGallerySlideCount">
                                                {galleryActiveIndex + 1} / {galleryImages.length}
                                            </Typography>
                                        </Box>
                                        <Box className="productSingleGalleryThumbsImageBox">
                                            {/* Thumbnails */}
                                            <Swiper
                                                onSwiper={setThumbsSwiper}
                                                spaceBetween={10}
                                                slidesPerView={4}
                                                watchSlidesProgress
                                                className="productSingleGalleryThumbsSlider"
                                            >
                                                {galleryImages.map((img, idx) => (
                                                    <SwiperSlide key={`thumb-${idx}`} className="productSingleGalleryThumbImage">
                                                        <Image src={img} alt={`thumb ${idx}`} />
                                                        <Icon className="checkIcon" name="check" width={23} height={17} />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </Box>

                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 5 }} className="productSingleContentInfo">
                                    <Typography variant="h3" className="productSingleTitle">Handmade Singing Bowl</Typography>
                                    <Typography variant="body1" className="sku">SKU: HSB19363</Typography>
                                    <Stack direction="row" className="productSingleLoginInfo" spacing={1}>
                                        <Box className="productSingleLoginInfoItem" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Button variant="outlined" color="primary" className="productSingleLoginInfoItemButton">Login/Signup</Button>
                                            <Typography variant="body1" className="productSingleLoginInfoItemTitle"> for dedicated support and special pricing</Typography>

                                        </Box>
                                        <Box className="productSingleLoginRightBtn">
                                            <IconButton color="primary">

                                                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M25.1525 8.14258H1.0625" stroke="#A0A0A0" strokeWidth="2.1255" strokeMiterlimit="133.333" strokeLinecap="round" />
                                                    <path d="M12.4025 15.2324H1.0625" stroke="#A0A0A0" strokeWidth="2.1255" strokeMiterlimit="133.333" strokeLinecap="round" />
                                                    <path d="M16.6523 18.0625L21.6123 13.8125L26.5723 18.0625" stroke="#A0A0A0" strokeWidth="2.1255" strokeMiterlimit="133.333" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M1.07227 1.0625H15.9523M25.1523 1.0625H21.9623" stroke="#A0A0A0" strokeWidth="2.1255" strokeMiterlimit="133.333" strokeLinecap="round" />
                                                </svg>

                                            </IconButton>
                                        </Box>

                                    </Stack>
                                    <Stack direction="row" className="productSingleWeightInfo" spacing={1} alignItems="center">
                                        <Typography variant="body1" className="productSingleWeightInfoItemTitle">Weight Grams</Typography>

                                        <Box className="productSingleWeightInfoItem">
                                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                                <Select
                                                    defaultValue=""
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Weight Grams' }}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <em>Select</em>
                                                    </MenuItem>
                                                    <MenuItem value={100}>425-475</MenuItem>
                                                    <MenuItem value={250}>500-550</MenuItem>
                                                    <MenuItem value={500}>575-625</MenuItem>
                                                    <MenuItem value={750}>650-700</MenuItem>
                                                    <MenuItem value={1000}>725-775</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Stack>
                                    <Box className={readMoreOpen ? "productSingleMoreInfo active" : "productSingleMoreInfo"}>
                                        <Box className='productSingleMoreInfoContent'>
                                            <Typography variant="body1" className="productSingleMoreInfoText">
                                                Silver-plated, ornate singing bowl, with engraved images of Buddha Shakyamuni and the five Dhyani Buddhas. The bowl is further decorated with auspicious symbols such as the double dorje, lotus and knot of infinity, as well as the mantra of Silver-plated, ornate singing bowl, with engraved images of  Buddha.
                                            </Typography>
                                            <Typography variant="body1" className="productSingleMoreInfoText">
                                                Buddha Shakyamuni and the five Dhyani Buddhas. The bowl is further decorated with auspicious symbols such as the double dorje, lotus and knot of infinity, as well as the mantra of Indian Culture. Silver-plated, ornate singing bowl, with engraved images of Buddha Shakyamuni and the five Dhyani Buddhas. The bowl is further decorated with auspicious symbols such as the double dorje, lotus and knot of infinity, as well as the mantra of Silver-plated, ornate singing bowl, with engraved images of  Buddha.
                                            </Typography>
                                            <Typography variant="body1" className="productSingleMoreInfoText">

                                                Silver-plated, ornate singing bowl, with engraved images of Buddha Shakyamuni and the five Dhyani Buddhas. The bowl is further decorated with auspicious symbols such as the double dorje, lotus and knot of infinity, as well as the mantra of Silver-plated, ornate singing bowl, with engraved images of  Buddha.
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: "center", marginTop: "0" }}>
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
                                    <Stack direction="row" className="productSingleQuantityInfo" spacing={1} alignItems="center">
                                        <Box className="productSingleQuantityInfoItem">
                                            <Box
                                                className="productSingleQuantitySelector"
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    background: '#FFE5DB',
                                                    borderRadius: '8px',
                                                    padding: '8px 8px',
                                                    gap: 1,
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={decrement}
                                                    aria-label="decrease quantity"
                                                    sx={{ width: 32, height: 32 }}
                                                >
                                                    <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>-</Typography>
                                                </IconButton>

                                                <Typography
                                                    className="productQuantityValue"
                                                    sx={{ minWidth: 28, textAlign: 'center', fontWeight: 600 }}
                                                >
                                                    {quantity}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    onClick={increment}
                                                    aria-label="increase quantity"
                                                    sx={{ width: 32, height: 32 }}
                                                >
                                                    <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>+</Typography>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box sx={{ marginLeft: "auto", flex: 1 }}>
                                            <Button variant="outlined" color="primary" className="productSingleAddToCartButton" sx={{ width: "100%" }}>Add to Cart</Button>
                                        </Box>

                                    </Stack>
                                    <Box className="productSingleMetaInfo">
                                        <Typography variant="body1" className="productSingleMetaInfoItemTitle">Product Specification</Typography>
                                        <Box>
                                            <Table sx={{ minWidth: 300 }}>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Product</TableCell>
                                                        <TableCell sx={{ border: 0 }}>NE0265/111</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>EAN</TableCell>
                                                        <TableCell sx={{ border: 0 }}>8719075393741</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Weight </TableCell>
                                                        <TableCell sx={{ border: 0 }}> ±425-475</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Size (cm)</TableCell>
                                                        <TableCell sx={{ border: 0 }}>±12</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Material</TableCell>
                                                        <TableCell sx={{ border: 0 }}>Bronze</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Total Weight (grams)</TableCell>
                                                        <TableCell sx={{ border: 0 }}>±450</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Packaging</TableCell>
                                                        <TableCell sx={{ border: 0 }}>Textile pouch</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Box>

                                    </Box>
                                    <Box className="productSingleMetaInfo">
                                        <Typography variant="body1" className="productSingleMetaInfoItemTitle">MORE INFORMATION</Typography>
                                        <Box>
                                            <Table sx={{ minWidth: 300 }}>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Country of Origin</TableCell>
                                                        <TableCell sx={{ border: 0 }}>India</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, border: 0, pl: 0 }}>Shipping Details</TableCell>
                                                        <TableCell sx={{ border: 0 }}>677, New Garia, Kolkata-79</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Box>

                                    </Box>
                                    <Box className="productSingleImportantInfo">
                                        <Typography variant="body1" className="productSingleMetaInfoItemTitle">Important Documents</Typography>
                                        <IconButton color="primary">
                                            <Icon name="download" width={21} height={21} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box className="relatedProductsOuter productResultOuter" sx={{ backgroundColor: "#FFEBEB" }}>
                                <Box className="productResultHeader">
                                    <Box className="productResultHeaderTitle">
                                        <Typography variant="h3">You Might Also Like</Typography>
                                    </Box>
                                    <Box className="ComSliderNavigation">
                                        <Box className="swiper-button-prev" ref={prevRef1}></Box>
                                        <Box className="swiper-button-next" ref={nextRef1}></Box>
                                    </Box>
                                </Box>
                                <Box className="productCardListOuter">
                                    <Box className="productCardList">
                                        <Swiper
                                            modules={[Navigation, Autoplay, Pagination]}
                                            spaceBetween={16}
                                            slidesPerView={4}
                                            navigation={{ prevEl: prevRef1.current, nextEl: nextRef1.current }}
                                            onBeforeInit={(swiper: any) => {
                                                swiper.params.navigation.prevEl = prevRef1.current;
                                                swiper.params.navigation.nextEl = nextRef1.current;
                                            }}
                                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                                            speed={1000}
                                            loop={false}
                                            breakpoints={{
                                                0: { slidesPerView: 1 },
                                                600: { slidesPerView: 2 },
                                                900: { slidesPerView: 3 },
                                                1200: { slidesPerView: 4 },
                                            }}
                                            className="relatedProductsSlider"
                                        >
                                            {[...Array(6)].map((_, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <Box className="productCard">
                                                        <Box className="productCardInner">
                                                            <Box className="productCardImage">
                                                                <Image src={ProductImage} alt={`related product ${idx}`} />
                                                                <IconButton color="primary">
                                                                    <Icon name="wishList" width={20} height={40} />
                                                                </IconButton>
                                                            </Box>
                                                            <Box className="productCardContent" sx={{ backgroundColor: "#ffffff" }}>
                                                                <Typography variant="body1" className="productCardSku">SKU: HMSB00{idx + 1}</Typography>
                                                                <Typography variant="h3" className="productCardTitle">Indian Hand Made Singing Bowl</Typography>
                                                                <Typography variant="body1" className="productCardMeta">Weight (Grams) : ±1019</Typography>
                                                                <Typography variant="body1" className="productCardMeta">Size (Cm) : ±20</Typography>
                                                                <IconButton color="primary">
                                                                    <Icon name="AddToCart" width={20} height={20} />
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
                            <Box className="relatedProductsOuter productResultOuter" sx={{ backgroundColor: "#F6EDD9" }}>
                                <Box className="productResultHeader">
                                    <Box className="productResultHeaderTitle">
                                        <Typography variant="h3">See Related Items</Typography>
                                    </Box>
                                    <Box className="ComSliderNavigation">
                                        <Box className="swiper-button-prev" ref={prevRef2}></Box>
                                        <Box className="swiper-button-next" ref={nextRef2}></Box>
                                    </Box>
                                </Box>
                                <Box className="productCardListOuter">
                                    <Box className="productCardList">
                                        <Swiper
                                            modules={[Navigation, Autoplay, Pagination]}
                                            spaceBetween={16}
                                            slidesPerView={4}
                                            navigation={{ prevEl: prevRef2.current, nextEl: nextRef2.current }}
                                            onBeforeInit={(swiper: any) => {
                                                swiper.params.navigation.prevEl = prevRef2.current;
                                                swiper.params.navigation.nextEl = nextRef2.current;
                                            }}
                                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                                            speed={1000}
                                            loop={false}
                                            breakpoints={{
                                                0: { slidesPerView: 1 },
                                                600: { slidesPerView: 2 },
                                                900: { slidesPerView: 3 },
                                                1200: { slidesPerView: 4 },
                                            }}
                                            className="relatedProductsSlider"
                                        >
                                            {[...Array(6)].map((_, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <Box className="productCard">
                                                        <Box className="productCardInner">
                                                            <Box className="productCardImage">
                                                                <Image src={ProductImage} alt={`related product ${idx}`} />
                                                                <IconButton color="primary">
                                                                    <Icon name="wishList" width={20} height={40} />
                                                                </IconButton>
                                                            </Box>
                                                            <Box className="productCardContent" sx={{ backgroundColor: "#ffffff" }}>
                                                                <Typography variant="body1" className="productCardSku">SKU: HMSB00{idx + 1}</Typography>
                                                                <Typography variant="h3" className="productCardTitle">Indian Hand Made Singing Bowl</Typography>
                                                                <Typography variant="body1" className="productCardMeta">Weight (Grams) : ±1019</Typography>
                                                                <Typography variant="body1" className="productCardMeta">Size (Cm) : ±20</Typography>
                                                                <IconButton color="primary">
                                                                    <Icon name="AddToCart" width={20} height={20} />
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
        </>
    )
}