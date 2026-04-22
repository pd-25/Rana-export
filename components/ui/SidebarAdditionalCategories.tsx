"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import AdditionalCategoryIcon from "@/public/collection/additinoal-category-icon.png";

const ADDITIONAL_ITEMS = [
  { text: "New Products", slug: "new-products" },
  { text: "Best Sellers", slug: "best-sellers" },
  { text: "Special Offers", slug: "special-offers" },
  { text: "Warehouse Clearance", slug: "warehouse-clearance" },
  { text: "Discontinued Products", slug: "discontinued-products" },
  { text: "Offers of the Month", slug: "offers-of-the-month" },
];

export default function SidebarAdditionalCategories() {
  return (
    <Box className="additionalCategoryOuter">
      <Box className="additionalCategoryIcon">
        <Image
          src={AdditionalCategoryIcon}
          alt="additional category icon"
        />
      </Box>
      <Box className="additionalCategoryInner">
        {ADDITIONAL_ITEMS.map((item) => (
          <Link key={item.slug} href={`/collection/${item.slug}`} passHref legacyBehavior>
            <Button component="a" className="additionalCategoryItem">
              {item.text}
            </Button>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
