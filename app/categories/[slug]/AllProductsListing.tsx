"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
  Pagination,
} from "@mui/material";
import Icon from "@/components/ui/icon/Icon";
import BannerPic from "@/public/category/category-listing-banner.png";
import Separator from "@/public/collection/collection-listing-heading-separator.svg";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";
import ProductImagePlaceholder from "@/public/collection/singing-bowl-pic.png";
import BackgroundPattern from "@/public/collection/background-pattern.png";
import SidebarAdditionalCategories from "@/components/ui/SidebarAdditionalCategories";


const getWeightRange = (variants: any[]) => {
  if (!variants || variants.length === 0) return "";
  const weights = variants
    .map((v) => {
      const data = v.data || {};
      const weight = data["Weight (gm)"] || data["Weight"] || data["weight"];
      return weight ? parseFloat(weight) : null;
    })
    .filter((w) => w !== null) as number[];

  if (weights.length === 0) return "";
  const min = Math.min(...weights);
  const max = Math.max(...weights);

  const formatWeight = (w: number) => {
    if (w >= 1000) return `${(w / 1000).toFixed(1)} kg`;
    return `${w} gm`;
  };

  if (min === max) return `(${formatWeight(min)})`;
  return `(${formatWeight(min)} - ${formatWeight(max)})`;
};

const ProductCard = ({ product }: { product: any }) => (
  <Box className="productCardInner">
    <Link href={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
      <Box className="productCardImage">
        <Image
          src={product.mainImage || ProductImagePlaceholder}
          alt={product.name}
          width={400}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Link>
    <Box className="productCardContent" sx={{ backgroundColor: "#ffffff" }}>
      <Link
        href={`/product/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="h3" className="productCardTitle">
          {product.name.length > 30
            ? `${product.name.substring(0, 30)}...`
            : product.name}
        </Typography>
      </Link>
      <Typography variant="body1" className="productCardMeta">
        {getWeightRange(product.variants)}
      </Typography>
      <Link href={`/product-varient/${product.slug}`} passHref legacyBehavior>
        <IconButton component="a">
          <Icon name="ViewProduct" width={40} height={40} />
        </IconButton>
      </Link>
    </Box>
  </Box>
);

export default function AllProductsListing({
  category,
  products,
  allCategories,
  currentPage,
  totalPages,
}: {
  category: any;
  products: any[];
  allCategories: any[];
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`${pathname}?page=${value}`);
  };

  return (
    <>
      <Box component="section" className="collectionListingWrapper ">
        <Box className="bannerPic">
          <Image src={BannerPic} alt="banner pic" />
        </Box>
        <Container>
          <Box className="collectionListingContent">
            <Typography variant="h1" className="collectionListingTitle">
              <span>{category.name}</span>
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
                  {allCategories.map((cat) => (
                    <Box className="sideBarCategoryInner" key={cat.id}>
                      <Typography variant="body1" className="categoryName">
                        <Link
                          href={`/category/${cat.slug}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {cat.name}
                        </Link>
                      </Typography>
                      {cat.children && cat.children.length > 0 && (
                        <Box className="categoryLinkList">
                          {cat.children.map((child: any) => (
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
                <SidebarAdditionalCategories />
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
                  {category.name} Complete Range
                </Typography>
                <Box className="separator">
                  <Image src={Separator} alt="separator" />
                </Box>
              </Box>
              <Box className="productResultOuter">
                <Box className="productCardListOuter">
                  {products.length > 0 ? (
                    <Grid container spacing={2} className="productCardList">
                      {products.map((product) => (
                        <Grid
                          key={product.id}
                          size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                          className="productCard"
                        >
                          <ProductCard product={product} />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="h5" sx={{ py: 4, textAlign: "center" }}>
                      No products found.
                    </Typography>
                  )}
                </Box>
                {totalPages > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
