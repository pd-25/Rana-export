"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
import BannerPic from "@/public/collection/collection-lisitng-banner.png";
import Separator from "@/public/collection/collection-listing-heading-separator.svg";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";
import ProductImagePlaceholder from "@/public/collection/singing-bowl-pic.png";
import BackgroundPattern from "@/public/collection/background-pattern.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  children: Category[];
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  slug: string;
  mainImage?: string;
  variants: any[];
}

const getWeightRange = (variants: any[]) => {
  if (!variants || variants.length === 0) return "";
  const weights = variants
    .map((v) => {
      // Trying to find weight in the Json data
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

const ProductCard = ({
  product,
  cardBg,
}: {
  product: Product;
  cardBg: string;
}) => (
  <Box className="productCardInner">
    <Box className="productCardImage">
      <Image
        src={product.mainImage || ProductImagePlaceholder}
        alt={product.name}
        width={400}
        height={400}
        style={{ objectFit: "contain" }}
      />
    </Box>
    <Box className="productCardContent" sx={{ backgroundColor: cardBg }}>
      <Typography variant="h3" className="productCardTitle">
        {product.name}
      </Typography>
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

const ProductListSection = ({
  title,
  products,
  isGrid,
  cardBg,
  isLightNav,
  categorySlug,
}: {
  title: string | React.ReactNode;
  products: Product[];
  isGrid?: boolean;
  cardBg: string;
  isLightNav?: boolean;
  categorySlug: string;
}) => {
  const prevRef = React.useRef<any>(null);
  const nextRef = React.useRef<any>(null);

  if (!products || products.length === 0) return null;

  return (
    <Box
      className="productResultOuter"
      sx={{ mt: isGrid ? 0 : "70px", "&:first-of-type": { mt: 0 } }}
    >
      <Stack
        direction="row"
        className="productResultHeader"
        spacing={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        mb="35px"
      >
        <Box className="productResultHeaderTitle">
          <Typography variant="h3">{title}</Typography>
        </Box>
        <Box
          className="productResultHeaderAction"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2, md: 6, lg: 10 },
          }}
        >
          {!isGrid && (
            <Box className="ComSliderNavigation" sx={{ marginTop: "0" }}>
              <IconButton
                ref={prevRef}
                className={`swiper-button-prev ${isLightNav ? "isLight" : ""}`}
                sx={{
                  background: isLightNav ? "transparent" : "#fff !important",
                  padding: "0",
                  width: "45px",
                  height: "45px",
                  position: "static",
                  "&::after": { display: "none" },
                }}
              >
                <Icon name="chevronLeft" width={10} height={17} />
              </IconButton>
              <IconButton
                ref={nextRef}
                className={`swiper-button-next ${isLightNav ? "isLight" : ""}`}
                sx={{
                  background: isLightNav ? "transparent" : "#fff !important",
                  padding: "0",
                  width: "45px",
                  height: "45px",
                  position: "static",
                  "&::after": { display: "none" },
                }}
              >
                <Icon name="chevronRight" width={10} height={17} />
              </IconButton>
            </Box>
          )}
          <Link href={`/category/${categorySlug}`} passHref legacyBehavior>
            <Button
              variant="outlined"
              className="outlineButton viewCompleteRangeButton"
              component="a"
            >
              View Complete Range
              <Icon
                className="icon"
                name="OutlineButtonArrow"
                width={36}
                height={36}
                style={{ marginBottom: "0" }}
              />
            </Button>
          </Link>
        </Box>
      </Stack>

      <Box className="productCardListOuter">
        {isGrid ? (
          <Grid container spacing={2} className="productCardList">
            {products.slice(0, 3).map((product) => (
              <Grid
                key={product.id}
                size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                className="productCard"
              >
                <ProductCard product={product} cardBg={cardBg} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box className="productCardList">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={3}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
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
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <Box className="productCard">
                    <ProductCard product={product} cardBg={cardBg} />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
      </Box>

      {isGrid && (
        <Box
          className="productPagination"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            marginTop: "40px",
          }}
        >
          <Link href={`/category/${categorySlug}`} passHref legacyBehavior>
            <Button
              variant="outlined"
              className="outlineButton viewCompleteRangeButton"
              component="a"
            >
              View Complete Range
              <Icon
                className="icon"
                name="OutlineButtonArrow"
                width={36}
                height={36}
                style={{ marginBottom: "0" }}
              />
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default function ColletionLisitng({
  category,
  allCategories,
}: {
  category: Category;
  allCategories: Category[];
}) {
  const [readMoreOpen, setReadMoreOpen] = React.useState(false);
  const toggleReadMoreParent = () => setReadMoreOpen((prev) => !prev);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSideBar = () => setSidebarOpen((prev) => !prev);

  const backgrounds = [
    { pattern: true, cardBg: "#FEF0EC", isLightNav: false },
    { color: "#fbf3e0", cardBg: "#FBE8D0", isLightNav: false },
  ];

  // Consolidate content into visible sections
  const sections: any[] = [];

  // 1. Add Parent products if they exist
  if (category.products && category.products.length > 0) {
    sections.push({
      id: `parent-${category.id}`,
      title: category.name,
      products: category.products,
      slug: category.slug,
      isParent: true,
    });
  }

  // 2. Add Child products
  (category.children || []).forEach((child) => {
    const hasProducts = child.products && child.products.length > 0;
    const hasSubChildren =
      child.children &&
      child.children.some((sub) => sub.products && sub.products.length > 0);

    if (hasProducts || hasSubChildren) {
      sections.push({
        id: `child-${child.id}`,
        title: child.name,
        products: child.products,
        slug: child.slug,
        children: child.children || [],
        isParent: false,
      });
    }
  });

  return (
    <>
      <Box component="section" className="collectionListingWrapper">
        <Box className="bannerPic">
          <Image
            src={category.image || BannerPic}
            alt={category.name}
            width={1920}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>

      {sections.length > 0 ? (
        sections.map((section, index) => {
          const bgIndex = index % backgrounds.length;
          const bg = backgrounds[bgIndex];
          const isGrouped = section.children && section.children.length > 0;

          return (
            <Box
              key={section.id}
              component="section"
              className={`collectionListingProductWrapper ${
                index > 0 ? "categorySubListingProductWrapper" : ""
              }`}
              sx={{
                backgroundImage: bg.pattern
                  ? `url(${BackgroundPattern.src})`
                  : "none",
                backgroundColor: bg.color || "transparent",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: index === 0 ? "80px 0" : "40px 0",
              }}
            >
              <Container>
                <Stack
                  direction="row"
                  className="listingProductRow"
                  spacing={2}
                  flexWrap="wrap"
                >
                  {/* Sidebar only on the first section */}
                  {index === 0 ? (
                    <Box
                      component="aside"
                      className={`sidebar ${
                        sidebarOpen ? "sidebarToggled" : ""
                      }`}
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
                        <Typography
                          variant="h3"
                          className="sidebarTitle"
                          onClick={toggleSideBar}
                        >
                          Categories
                          <Icon
                            name="filter"
                            width={24}
                            height={24}
                            style={{ marginBottom: "0" }}
                          />
                        </Typography>
                        <Box className="siderBarListHolder">
                          <IconButton
                            className="closeButton"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <Icon
                              name="close"
                              width={35}
                              height={35}
                              style={{ marginBottom: "0" }}
                            />
                          </IconButton>
                          <Box className="sideBarCategoryOuter">
                            {allCategories.map((cat) => (
                              <Box
                                key={cat.id}
                                className="sideBarCategoryInner"
                              >
                                <Typography
                                  variant="body1"
                                  className="categoryName"
                                >
                                  {cat.name}
                                </Typography>
                                <Box className="categoryLinkList">
                                  {(cat.children || []).map((sub) => (
                                    <Link
                                      key={sub.id}
                                      href={`/category/${sub.slug}`}
                                      passHref
                                      legacyBehavior
                                    >
                                      <Button
                                        className="categoryLinkItem"
                                        component="a"
                                      >
                                        {sub.name}
                                        <Icon
                                          name="ButtonArrow"
                                          width={14}
                                          height={14}
                                          style={{ marginBottom: "0" }}
                                        />
                                      </Button>
                                    </Link>
                                  ))}
                                </Box>
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
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        flex: {
                          xs: "1 1 100%",
                          sm: "1 1 calc(100% - 0px)",
                          md: "1 1 calc(25% - 32px)",
                          lg: "1 1 calc(25% - 24px)",
                        },
                        minWidth: 0,
                      }}
                    />
                  )}

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
                    {/* Show Main Title only once in the first section */}
                    {index === 0 && (
                      <Box className="categoryHeading">
                        <Typography
                          variant="h2"
                          className="collectionListingTitle"
                        >
                          {category.name}
                        </Typography>
                        <Box className="separator">
                          <Image src={Separator} alt="separator" />
                        </Box>
                      </Box>
                    )}

                    {isGrouped ? (
                      <>
                        {/* If child has products directly, show them first */}
                        {section.products && section.products.length > 0 && (
                          <ProductListSection
                            categorySlug={section.slug}
                            title={section.title}
                            products={section.products}
                            cardBg={bg.cardBg}
                            isLightNav={bg.isLightNav}
                          />
                        )}
                        {/* Then show its sub-categories */}
                        {(section.children || []).map((subChild: any) => (
                          <ProductListSection
                            key={subChild.id}
                            categorySlug={subChild.slug}
                            title={
                              <>
                                {section.title}
                                <span style={{ margin: "0 10px" }}>
                                  <svg
                                    width="15"
                                    height="17"
                                    viewBox="0 0 15 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2.23517e-08 -2.98023e-07L14.075 8.125L2.23517e-08 16.25V-2.98023e-07Z"
                                      fill="#995C69"
                                    />
                                  </svg>
                                </span>
                                {subChild.name}
                              </>
                            }
                            products={subChild.products}
                            cardBg={bg.cardBg}
                            isLightNav={bg.isLightNav}
                          />
                        ))}
                      </>
                    ) : (
                      <ProductListSection
                        title={section.title}
                        categorySlug={section.slug}
                        products={section.products}
                        isGrid={index === 0} // First block uses grid
                        cardBg={bg.cardBg}
                        isLightNav={bg.isLightNav}
                      />
                    )}
                  </Box>
                </Stack>
              </Container>
            </Box>
          );
        })
      ) : (
        /* Empty State */
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Container>
            <Typography variant="h5" color="textSecondary">
              No products found in this category.
            </Typography>
          </Container>
        </Box>
      )}

      {category.description && (
        <Box
          component="section"
          className={
            readMoreOpen
              ? "collectionMoreInfoWrapper active"
              : "collectionMoreInfoWrapper"
          }
        >
          <Container>
            <Box className="mainContent">
              <Typography variant="h2" className="collectionListingTitle">
                {category.name}
              </Typography>
            </Box>
            <Box className="collectionMoreInfoContent">
              <Box className="collectionMoreInfoTextOuter">
                <Typography
                  variant="body1"
                  className="collectionMoreInfoText"
                  dangerouslySetInnerHTML={{ __html: category.description }}
                />
              </Box>
              <Box sx={{ textAlign: "center", marginTop: "50px" }}>
                <Button
                  variant="outlined"
                  className="readMoreButton"
                  color="primary"
                  onClick={toggleReadMoreParent}
                >
                  {readMoreOpen ? "READ LESS" : "READ MORE"}
                  <Icon
                    className="icon"
                    name={readMoreOpen ? "chevronLeft" : "chevronRight"}
                    width={16}
                    height={16}
                    style={{ marginBottom: "0" }}
                  />
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}
