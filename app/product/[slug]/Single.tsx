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
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Snackbar,
  Alert,
} from "@mui/material";
import Icon from "@/components/ui/icon/Icon";
import BannerPic from "@/public/category/category-listing-banner.png";
import Separator from "@/public/collection/collection-listing-heading-separator.svg";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";
import ProductImage from "@/public/home/singing-bowl-pic-03.png";
import BackgroundPattern from "@/public/collection/background-pattern.png";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import Link from "next/link";
import {
  getWishlistedIds,
  toggleWishlist,
} from "@/app/actions/wishlistActions";
import { addToCart } from "@/app/actions/cartActions";
import {
  notifyCartUpdated,
  notifyWishlistUpdated,
  useCartWishlist,
} from "@/context/CartWishlistContext";

interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
}

interface ProductImage {
  id: number;
  url: string;
}

interface ProductVariant {
  id: number;
  data: any;
}

interface ProductDocument {
  id: number;
  name: string;
  url: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  mainImage: string | null;
  variantImage: string | null;
  variants: ProductVariant[];
}

interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  modelNo: string | null;
  ean: string | null;
  description: string | null;
  material: string | null;
  packaging: string | null;
  origin: string | null;
  shippingDetails: string | null;
  mainImage: string | null;
  variantImage: string | null;
  category: {
    name: string;
    slug: string;
    products: RelatedProduct[];
  };
  gallery: ProductImage[];
  variants: ProductVariant[];
  documents: ProductDocument[];
  relatedProducts: RelatedProduct[];
  youMightAlsoProducts: RelatedProduct[];
}

interface SingleProps {
  product: Product;
  allCategories: Category[];
}

// ── Shared card for "You Might Also Like" & "See Related Items" ──────────────
function RelatedProductCard({
  p,
  cardBg = "#ffffff",
  onNotify,
}: {
  p: RelatedProduct;
  cardBg?: string;
  onNotify: (msg: string, severity: "success" | "error") => void;
}) {
  const [wishlisted, setWishlisted] = React.useState(false);
  const { openAuthModal, isLoggedIn } = useCartWishlist();

  // Check initial wishlist state
  React.useEffect(() => {
    const checkWishlist = async () => {
      const ids = await getWishlistedIds([p.id]);
      if (ids.includes(p.id)) setWishlisted(true);
    };
    checkWishlist();
  }, [p.id]);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await toggleWishlist(p.id);
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
    e.stopPropagation();
    const res = await addToCart(p.id, null, 1);
    if (res?.error) {
      openAuthModal();
    } else {
      onNotify("Added to cart!", "success");
      notifyCartUpdated();
    }
  };

  return (
    <Box className="productCard">
      <Box className="productCardInner">
        <Box className="productCardImage" sx={{ position: "relative" }}>
          <Link href={`/product/${p.slug}`} style={{ display: "block" }}>
            <Image
              src={p.variantImage || p.mainImage || ProductImage}
              alt={p.name}
              width={300}
              height={300}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </Link>
          <IconButton
            color="primary"
            size="small"
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
        <Box className="productCardContent" sx={{ backgroundColor: cardBg }}>
          <Typography variant="body1" className="productCardSku">
            SKU: {p.sku || p.variants?.[0]?.data?.SKU || "N/A"}
          </Typography>
          <Typography variant="h3" className="productCardTitle">
            <Link
              href={`/product/${p.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {p.name}
            </Link>
          </Typography>
          {p.variants?.[0]?.data &&
            Object.entries(p.variants[0].data)
              .filter(
                ([key]) =>
                  !["EAN", "SKU", "Model No", "variantImage"].includes(key),
              )
              .slice(0, 2)
              .map(([key, value]) => (
                <Typography
                  key={key}
                  variant="body1"
                  className="productCardMeta"
                >
                  {key}: {String(value)}
                </Typography>
              ))}
          <IconButton
            color="primary"
            size="small"
            onClick={handleAddToCart}
            sx={{
              mt: 1,
              "&:hover": { background: "#fff3e0" },
              transition: "background 0.2s",
            }}
          >
            <Icon name="AddToCart" width={20} height={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default function Single({ product, allCategories }: SingleProps) {
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
  const [selectedVariant, setSelectedVariant] = React.useState<number | "">(
    product.variants.length > 0 ? product.variants[0].id : "",
  );
  const currentVariant = product.variants.find((v) => v.id === selectedVariant);
  const currentVariantData = currentVariant?.data || {};

  const { openAuthModal, isLoggedIn } = useCartWishlist();

  // Wishlist & Cart state
  const [wishlisted, setWishlisted] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Check initial wishlist state
  React.useEffect(() => {
    const checkWishlist = async () => {
      const ids = await getWishlistedIds([product.id]);
      if (ids.includes(product.id)) setWishlisted(true);
    };
    checkWishlist();
  }, [product.id]);

  const handleWishlist = async () => {
    const res = await toggleWishlist(product.id);
    if (res?.error) {
      openAuthModal();
    } else if (res?.success) {
      setWishlisted(res.action === "added");
      setSnackbar({ open: true, message: res.success, severity: "success" });
      notifyWishlistUpdated();
    }
  };

  const handleAddToCart = async () => {
    const variantId =
      typeof selectedVariant === "number" ? selectedVariant : null;
    const res = await addToCart(product.id, variantId, quantity);
    if (res?.error) {
      openAuthModal();
    } else {
      setSnackbar({
        open: true,
        message: `${quantity} item(s) added to cart!`,
        severity: "success",
      });
      notifyCartUpdated();
    }
  };

  const galleryImages = [
    currentVariantData.variantImage || product.mainImage || ProductImage,
    ...(product.gallery || []).map((img) => img.url),
  ].filter(Boolean) as (string | typeof ProductImage)[];
  return (
    <>
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
                  lg: "1 1 calc(20% - 24px)",
                },
                minWidth: 0,
                marginTop: "0 !important",
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
                  lg: "1 1 calc(80% - 24px)",
                },
                minWidth: 0,
              }}
            >
              <Grid container spacing={2} className="productSingleContentRow">
                <Grid
                  size={{ xs: 12, sm: 6, md: 6, lg: 7, xl: 7 }}
                  className="productSingleGalleryOuter"
                >
                  <Box className="productSingleGalleryInner">
                    <Box className="productSingleGalleryMainImageBox">
                      <Box className="actionBtn">
                        <IconButton
                          color="primary"
                          onClick={handleWishlist}
                          sx={{
                            transition: "transform 0.2s",
                            "&:active": { transform: "scale(0.85)" },
                          }}
                        >
                          <Icon
                            name={
                              wishlisted ? "wishListGrayFilled" : "wishListGray"
                            }
                            width={30}
                            height={30}
                            style={{
                              transition:
                                "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                              transform: wishlisted ? "scale(1.2)" : "scale(1)",
                            }}
                          />
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
                        onSlideChange={(swiper) =>
                          setGalleryActiveIndex(swiper.realIndex)
                        }
                        onSwiper={(swiper) =>
                          setGalleryActiveIndex(swiper.realIndex)
                        }
                        className="productSingleGalleryMainSlider"
                      >
                        {galleryImages.map((img, idx) => (
                          <SwiperSlide
                            key={idx}
                            className="productSingleGalleryCard"
                          >
                            <Box className="productSingleGalleryCardImageBox">
                              <Image
                                src={img}
                                alt={`product image ${idx}`}
                                width={800}
                                height={800}
                                style={{ objectFit: "contain" }}
                              />
                            </Box>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <Typography
                        component="span"
                        className="productSingleGallerySlideCount"
                      >
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
                          <SwiperSlide
                            key={`thumb-${idx}`}
                            className="productSingleGalleryThumbImage"
                          >
                            <Image
                              src={img}
                              alt={`thumb ${idx}`}
                              width={150}
                              height={150}
                              style={{ objectFit: "cover" }}
                            />
                            <Icon
                              className="checkIcon"
                              name="check"
                              width={23}
                              height={17}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 5 }}
                  className="productSingleContentInfo"
                >
                  <Typography variant="h3" className="productSingleTitle">
                    {product.name}
                  </Typography>
                  <Typography variant="body1" className="sku">
                    SKU: {currentVariantData.SKU || product.sku || "N/A"}
                  </Typography>
                  <Stack
                    direction="row"
                    className="productSingleLoginInfo"
                    spacing={1}
                  >
                    <Box
                      className="productSingleLoginInfoItem"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        className="productSingleLoginInfoItemButton"
                        onClick={() => {
                          if (!isLoggedIn) {
                            openAuthModal("login");
                          } else {
                            window.location.href = "/profile";
                          }
                        }}
                      >
                        {isLoggedIn ? "Profile" : "Login/Signup"}
                      </Button>
                      <Typography
                        variant="body1"
                        className="productSingleLoginInfoItemTitle"
                      >
                        {" "}
                        for dedicated support and special pricing
                      </Typography>
                    </Box>
                    <Box className="productSingleLoginRightBtn">
                      <IconButton color="primary">
                        <svg
                          width="28"
                          height="20"
                          viewBox="0 0 28 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.1525 8.14258H1.0625"
                            stroke="#A0A0A0"
                            strokeWidth="2.1255"
                            strokeMiterlimit="133.333"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12.4025 15.2324H1.0625"
                            stroke="#A0A0A0"
                            strokeWidth="2.1255"
                            strokeMiterlimit="133.333"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.6523 18.0625L21.6123 13.8125L26.5723 18.0625"
                            stroke="#A0A0A0"
                            strokeWidth="2.1255"
                            strokeMiterlimit="133.333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.07227 1.0625H15.9523M25.1523 1.0625H21.9623"
                            stroke="#A0A0A0"
                            strokeWidth="2.1255"
                            strokeMiterlimit="133.333"
                            strokeLinecap="round"
                          />
                        </svg>
                      </IconButton>
                    </Box>
                  </Stack>
                  {product.variants.length > 0 && (
                    <Stack
                      direction="row"
                      className="productSingleWeightInfo"
                      spacing={1}
                      alignItems="center"
                    >
                      <Typography
                        variant="body1"
                        className="productSingleWeightInfoItemTitle"
                      >
                        Weight Grams
                      </Typography>

                      <Box className="productSingleWeightInfoItem">
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={selectedVariant}
                            onChange={(e) =>
                              setSelectedVariant(e.target.value as number)
                            }
                            displayEmpty
                            inputProps={{ "aria-label": "Weight Grams" }}
                          >
                            {product.variants.map((v) => (
                              <MenuItem key={v.id} value={v.id}>
                                {v.data["Weight (gm)"] ||
                                  v.data["Weight"] ||
                                  JSON.stringify(v.data)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>
                  )}
                  <Box
                    className={
                      readMoreOpen
                        ? "productSingleMoreInfo active"
                        : "productSingleMoreInfo"
                    }
                  >
                    <Box className="productSingleMoreInfoContent">
                      <div
                        className="productSingleMoreInfoText"
                        dangerouslySetInnerHTML={{
                          __html:
                            product.description || "No description available.",
                        }}
                      />
                    </Box>
                    {product.description &&
                      product.description.length > 200 && (
                        <Box sx={{ textAlign: "center", marginTop: "0" }}>
                          <Button
                            variant="outlined"
                            className="readMoreButton"
                            color="primary"
                            onClick={toggleReadMoreParent}
                          >
                            {readMoreOpen ? "READ LESS" : "READ MORE"}
                            <Icon
                              className="icon"
                              name="chevronRight"
                              width={16}
                              height={16}
                              style={{
                                marginBottom: "0",
                                transform: readMoreOpen
                                  ? "rotate(-90deg)"
                                  : "rotate(90deg)",
                              }}
                            />
                          </Button>
                        </Box>
                      )}
                  </Box>
                  <Stack
                    direction="row"
                    className="productSingleQuantityInfo"
                    spacing={1}
                    alignItems="center"
                  >
                    <Box className="productSingleQuantityInfoItem">
                      <Box
                        className="productSingleQuantitySelector"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: "#FFE5DB",
                          borderRadius: "8px",
                          padding: "8px 8px",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={decrement}
                          aria-label="decrease quantity"
                          sx={{ width: 32, height: 32 }}
                        >
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            -
                          </Typography>
                        </IconButton>

                        <Typography
                          className="productQuantityValue"
                          sx={{
                            minWidth: 28,
                            textAlign: "center",
                            fontWeight: 600,
                          }}
                        >
                          {quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={increment}
                          aria-label="increase quantity"
                          sx={{ width: 32, height: 32 }}
                        >
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            +
                          </Typography>
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: "auto", flex: 1 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="productSingleAddToCartButton"
                        sx={{ width: "100%" }}
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Stack>
                  <Box className="productSingleMetaInfo">
                    <Typography
                      variant="body1"
                      className="productSingleMetaInfoItemTitle"
                    >
                      Product Specification
                    </Typography>
                    <Box>
                      <Table sx={{ minWidth: 300 }}>
                        <TableBody>
                          {(currentVariantData["Model No"] ||
                            product.modelNo) && (
                            <TableRow>
                              <TableCell
                                sx={{ fontWeight: 600, border: 0, pl: 0 }}
                              >
                                {currentVariantData["Model No"]
                                  ? "Model No"
                                  : "Product"}
                              </TableCell>
                              <TableCell sx={{ border: 0 }}>
                                {currentVariantData["Model No"] ||
                                  product.modelNo}
                              </TableCell>
                            </TableRow>
                          )}
                          {(currentVariantData.EAN || product.ean) && (
                            <TableRow>
                              <TableCell
                                sx={{ fontWeight: 600, border: 0, pl: 0 }}
                              >
                                EAN
                              </TableCell>
                              <TableCell sx={{ border: 0 }}>
                                {currentVariantData.EAN || product.ean}
                              </TableCell>
                            </TableRow>
                          )}
                          {currentVariantData &&
                            Object.entries(currentVariantData)
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
                                <TableRow key={key}>
                                  <TableCell
                                    sx={{ fontWeight: 600, border: 0, pl: 0 }}
                                  >
                                    {key}
                                  </TableCell>
                                  <TableCell
                                    sx={{ border: 0, fontWeight: 400 }}
                                  >
                                    {String(value)}
                                  </TableCell>
                                </TableRow>
                              ))}
                          {product.material && (
                            <TableRow>
                              <TableCell
                                sx={{ fontWeight: 600, border: 0, pl: 0 }}
                              >
                                Material
                              </TableCell>
                              <TableCell sx={{ border: 0 }}>
                                {product.material}
                              </TableCell>
                            </TableRow>
                          )}
                          {product.packaging && (
                            <TableRow>
                              <TableCell
                                sx={{ fontWeight: 600, border: 0, pl: 0 }}
                              >
                                Packaging
                              </TableCell>
                              <TableCell sx={{ border: 0 }}>
                                {product.packaging}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Box>
                  </Box>
                  <Box className="productSingleMetaInfo">
                    <Typography
                      variant="body1"
                      className="productSingleMetaInfoItemTitle"
                    >
                      MORE INFORMATION
                    </Typography>
                    <Box>
                      <Table sx={{ minWidth: 300 }}>
                        <TableBody>
                          {product.origin && (
                            <TableRow>
                              <TableCell
                                sx={{ fontWeight: 600, border: 0, pl: 0 }}
                              >
                                Country of Origin
                              </TableCell>
                              <TableCell sx={{ border: 0 }}>
                                {product.origin}
                              </TableCell>
                            </TableRow>
                          )}
                          {product.shippingDetails && (
                            <TableRow>
                              <TableCell
                                sx={{ fontWeight: 600, border: 0, pl: 0 }}
                              >
                                Shipping Details
                              </TableCell>
                              <TableCell sx={{ border: 0 }}>
                                {product.shippingDetails}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Box>
                  </Box>
                  {product.documents && product.documents.length > 0 && (
                    <Box className="productSingleImportantInfo">
                      <Typography
                        variant="body1"
                        className="productSingleMetaInfoItemTitle"
                      >
                        Important Documents
                      </Typography>
                      {product.documents.map((doc) => (
                        <IconButton
                          key={doc.id}
                          color="primary"
                          component="a"
                          href={`/uploads/products/documents/${doc.url}`}
                          download={doc.name}
                        >
                          <Icon name="download" width={21} height={21} />
                        </IconButton>
                      ))}
                    </Box>
                  )}
                </Grid>
              </Grid>
              {product.youMightAlsoProducts &&
                product.youMightAlsoProducts.length > 0 && (
                  <>
                    <Box
                      className="relatedProductsOuter productResultOuter"
                      sx={{ backgroundColor: "#FFEBEB" }}
                    >
                      <Box className="productResultHeader">
                        <Box className="productResultHeaderTitle">
                          <Typography variant="h3">
                            You Might Also Like
                          </Typography>
                        </Box>
                        <Box className="ComSliderNavigation">
                          <Box
                            className="swiper-button-prev"
                            ref={prevRef1}
                          ></Box>
                          <Box
                            className="swiper-button-next"
                            ref={nextRef1}
                          ></Box>
                        </Box>
                      </Box>
                      <Box className="productCardListOuter">
                        <Box className="productCardList">
                          <Swiper
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={16}
                            slidesPerView={4}
                            navigation={{
                              prevEl: prevRef1.current,
                              nextEl: nextRef1.current,
                            }}
                            onBeforeInit={(swiper: any) => {
                              swiper.params.navigation.prevEl =
                                prevRef1.current;
                              swiper.params.navigation.nextEl =
                                nextRef1.current;
                            }}
                            autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                            }}
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
                            {product.youMightAlsoProducts.map((p) => (
                              <SwiperSlide key={p.id}>
                                <RelatedProductCard
                                  p={p}
                                  cardBg="#ffffff"
                                  onNotify={(msg, sev) =>
                                    setSnackbar({
                                      open: true,
                                      message: msg,
                                      severity: sev,
                                    })
                                  }
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              {product.relatedProducts &&
                product.relatedProducts.length > 0 && (
                  <Box
                    className="relatedProductsOuter productResultOuter"
                    sx={{ backgroundColor: "#F6EDD9" }}
                  >
                    <Box className="productResultHeader">
                      <Box className="productResultHeaderTitle">
                        <Typography variant="h3">See Related Items</Typography>
                      </Box>
                      <Box className="ComSliderNavigation">
                        <Box
                          className="swiper-button-prev"
                          ref={prevRef2}
                        ></Box>
                        <Box
                          className="swiper-button-next"
                          ref={nextRef2}
                        ></Box>
                      </Box>
                    </Box>
                    <Box className="productCardListOuter">
                      <Box className="productCardList">
                        <Swiper
                          modules={[Navigation, Autoplay, Pagination]}
                          spaceBetween={16}
                          slidesPerView={4}
                          navigation={{
                            prevEl: prevRef2.current,
                            nextEl: nextRef2.current,
                          }}
                          onBeforeInit={(swiper: any) => {
                            swiper.params.navigation.prevEl = prevRef2.current;
                            swiper.params.navigation.nextEl = nextRef2.current;
                          }}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
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
                          {[...product.relatedProducts].reverse().map((p) => (
                            <SwiperSlide key={p.id}>
                              <RelatedProductCard
                                p={p}
                                cardBg="#FDF6EE"
                                onNotify={(msg, sev) =>
                                  setSnackbar({
                                    open: true,
                                    message: msg,
                                    severity: sev,
                                  })
                                }
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </Box>
                    </Box>
                  </Box>
                )}
            </Box>
          </Stack>
        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
