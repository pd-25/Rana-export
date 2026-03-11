"use client";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import Icon from "@/components/ui/icon/Icon";
import BannerPic from "@/public/category/category-listing-banner.png";
import Separator from "@/public/collection/collection-listing-heading-separator.svg";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";
import ProductImage from "@/public/home/singing-bowl-pic-03.png";
import BackgroundPattern from "@/public/collection/background-pattern.png";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
}

interface ProductVariant {
  id: number;
  data: any;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  mainImage: string | null;
  variantImage: string | null;
  category: {
    name: string;
    slug: string;
  };
  variants: ProductVariant[];
}

interface CategoryListingProps {
  product: Product;
  allCategories: Category[];
}

export default function CategoryListing({
  product,
  allCategories,
}: CategoryListingProps) {
  return (
    <>
      <Box component="section" className="collectionListingWrapper ">
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
        className="collectionListingProductWrapper categoryListingProductWrapper"
        sx={{
          backgroundImage: `url(${BackgroundPattern.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 0",
        }}
      >
        <Container>
          <Stack
            direction="row"
            className="listingProductRow"
            spacing={2}
            flexWrap="wrap"
          >
            <Box
              component="aside"
              className="sidebar"
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(100% - 0px)",
                  md: "1 1 calc(25% - 32px)",
                  lg: "1 1 calc(25% - 24px)",
                },
                minWidth: 0,
              }}
            >
              <Box className="sidebarContent">
                <Typography variant="h3" className="sidebarTitle">
                  Categories
                </Typography>
                <Box className="sideBarCategoryOuter">
                  {allCategories.map((category) => (
                    <Box className="sideBarCategoryInner" key={category.id}>
                      <Typography variant="body1" className="categoryName">
                        <Link
                          href={`/category/${category.slug}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {category.name}
                        </Link>
                      </Typography>
                      {category.children && category.children.length > 0 && (
                        <Box className="categoryLinkList">
                          {category.children.map((child) => (
                            <Button
                              className="categoryLinkItem"
                              key={child.id}
                              component={Link}
                              href={`/category/${child.slug}`}
                            >
                              {child.name}
                              <Icon
                                name="ButtonArrow"
                                width={14}
                                height={14}
                                style={{ marginBottom: "0" }}
                              />
                            </Button>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
                <Box className="additionalCategoryOuter">
                  <Box className="additionalCategoryIcon">
                    <Image
                      src={AdditionalCategoryIcon}
                      alt="additional category icon"
                    />
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
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(100% - 0px)",
                  md: "1 1 calc(75% - 32px)",
                  lg: "1 1 calc(75% - 24px)",
                },
                minWidth: 0,
              }}
            >
              <Box className="categoryHeading">
                <Typography variant="h2" className="collectionListingTitle">
                  {product.category.name}
                </Typography>
                <Box className="separator">
                  <Image src={Separator} alt="separator" />
                </Box>
              </Box>
              <Box className="productResultOuter">
                <Stack
                  direction="row"
                  className="productResultHeader"
                  spacing={2}
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box className="productResultHeaderTitle">
                    <Typography variant="h3">
                      {product.name} (200 gm - 35 kg)
                    </Typography>
                  </Box>
                </Stack>
                <Box className="productCardListOuter">
                  <Grid container spacing={2} className="productCardList">
                    {product.variants.map((variant) => {
                      console.log("variant.data:", variant.data.variantImage);
                      return (
                        <Grid
                          key={variant.id}
                          size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
                          className="productCard"
                        >
                          <Box className="productCardInner">
                            <Box className="productCardImage">
                              <Image
                                src={
                                  variant.data.variantImage
                                    ? `${variant.data.variantImage}`
                                    : ProductImage
                                }
                                alt={product.name}
                                width={300}
                                height={340}
                                style={{ objectFit: "cover" }}
                              />
                              <IconButton color="primary">
                                <Icon name="wishList" width={20} height={40} />
                              </IconButton>
                            </Box>
                            <Box
                              className="productCardContent"
                              sx={{ backgroundColor: "#ffffff" }}
                            >
                              <Typography
                                variant="body1"
                                className="productCardSku"
                              >
                                SKU: {variant.data.SKU}
                              </Typography>
                              <Typography
                                variant="h3"
                                className="productCardTitle"
                              >
                                {product.name}
                              </Typography>
                              {Object.entries(variant.data)
                                .filter(
                                  ([key]) =>
                                    ![
                                      "EAN",
                                      "SKU",
                                      "Model No",
                                      "variantImage",
                                    ].includes(key),
                                )
                                .map(([key, value]) => (
                                  <Typography
                                    key={key}
                                    variant="body1"
                                    className="productCardMeta"
                                  >
                                    {key} : {String(value)}
                                  </Typography>
                                ))}
                              <IconButton color="primary">
                                <Icon name="AddToCart" width={20} height={20} />
                              </IconButton>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
