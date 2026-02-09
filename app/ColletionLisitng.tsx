'use client'
import Image from "next/image";
import { Box, Container, Typography, Stack, Button, Grid, IconButton } from "@mui/material";
import Icon from "@/components/ui/icon/Icon"
import BannerPic from "@/public/collection/collection-lisitng-banner.png";
import Separator from "@/public/collection/collection-listing-heading-separator.svg";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";
import ProductImage from "@/public/collection/singing-bowl-pic.png";
import BackgroundPattern from "@/public/collection/background-pattern.png";


export default function ColletionLisitng() {
    return (
        <>
            <Box component="section" className="collectionListingWrapper">
                <Box className="bannerPic">
                    <Image src={BannerPic} alt="banner pic" />
                </Box>
                <Container>
                    <Box className="collectionListingContent">
                        <Typography variant="h1" className="collectionListingTitle">
                            <span>SOUND</span> THAT GROUNDS <br />
                            <span>VIBRATION</span> THAT HEALS
                        </Typography>
                    </Box>
                </Container>
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
                            className="sidebar"
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(100% - 0px)", md: "1 1 calc(25% - 32px)", lg: "1 1 calc(25% - 24px)" },
                                minWidth: 0,
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
                                <Stack direction="row" className="productResultHeader" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between">
                                    <Box className="productResultHeaderTitle">
                                        <Typography variant="h3">Handmade Singing Bowl</Typography>
                                    </Box>
                                    <Box className="productResultHeaderAction" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 2, md: 6, lg: 10 } }}>
                                        <Box className="ComSliderNavigation" sx={{ marginTop: "0" }}>
                                            <Box className="swiper-button-prev"></Box>
                                            <Box className="swiper-button-next"></Box>
                                        </Box>
                                        <Button variant="outlined" className="outlineButton">
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
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box >
        </>
    )
}