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
import React, { useState, useEffect } from "react";
import {
  toggleWishlist,
  getWishlistedIds,
} from "@/app/actions/wishlistActions";
import { addToCart } from "@/app/actions/cartActions";
import {
  notifyCartUpdated,
  notifyWishlistUpdated,
  useCartWishlist,
} from "@/context/CartWishlistContext";
import { Snackbar, Alert } from "@mui/material";

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

function VariantCard({
  variant,
  productName,
  productSlug,
  onNotify,
}: {
  variant: ProductVariant;
  productName: string;
  productSlug: string;
  onNotify: (msg: string, severity: "success" | "error") => void;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const { openAuthModal } = useCartWishlist();

  useEffect(() => {
    const checkWishlist = async () => {
      const ids = await getWishlistedIds([variant.productId]);
      if (ids.includes(variant.productId)) {
        setWishlisted(true);
      }
    };
    checkWishlist();
  }, [variant.productId]);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await toggleWishlist(variant.productId);
    if (res?.error) {
      openAuthModal();
    } else if (res?.success) {
      setWishlisted(res.action === "added");
      onNotify(res.success, "success");
      notifyWishlistUpdated();
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await addToCart(variant.productId, variant.id, 1);
    if (res?.error) {
      openAuthModal();
    } else {
      onNotify("Added to cart!", "success");
      notifyCartUpdated();
    }
  };

  return (
    <Box className="productCardInner">
      <Box className="productCardImage" sx={{ position: "relative" }}>
        <Link href={`/product/${productSlug}`}>
          <Image
            src={variant.data.variantImage || ProductImage}
            alt={productName}
            width={300}
            height={340}
            style={{ objectFit: "cover" }}
          />
        </Link>
        <IconButton
          color="primary"
          onClick={handleWishlist}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            background: wishlisted
              ? "rgba(192,113,122,0.12)"
              : "rgba(255,255,255,0.85)",
            "&:hover": { background: "rgba(192,113,122,0.18)" },
            transition: "background 0.2s, transform 0.2s",
            "&:active": { transform: "scale(0.88)" },
          }}
        >
          <Icon
            name={wishlisted ? "wishListFilled" : "wishList"}
            width={20}
            height={20}
            style={{
              transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              transform: wishlisted ? "scale(1.15)" : "scale(1)",
            }}
          />
        </IconButton>
      </Box>
      <Box className="productCardContent" sx={{ backgroundColor: "#ffffff" }}>
        <Typography variant="body1" className="productCardSku">
          SKU: {variant.data.SKU}
        </Typography>
        <Typography variant="h3" className="productCardTitle">
          <Link
            href={`/product/${productSlug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {productName}
          </Link>
        </Typography>
        {Object.entries(variant.data)
          .filter(
            ([key]) =>
              !["EAN", "SKU", "Model No", "variantImage"].includes(key),
          )
          .slice(0, 2)
          .map(([key, value]) => (
            <Typography key={key} variant="body1" className="productCardMeta">
              {key} : {String(value)}
            </Typography>
          ))}
        <IconButton color="primary" onClick={handleAddToCart}>
          <Icon name="AddToCart" width={20} height={20} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function CategoryListing({
  product,
  allCategories,
}: CategoryListingProps) {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleNotify = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <>
      <Box component="section" className="collectionListingWrapper ">
        {/* ... banner content ... */}
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
            {/* ... sidebar content ... */}
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
                    {product.variants.map((variant) => (
                      <Grid
                        key={variant.id}
                        size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
                        className="productCard"
                      >
                        <VariantCard
                          variant={variant}
                          productName={product.name}
                          productSlug={product.slug}
                          onNotify={handleNotify}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
