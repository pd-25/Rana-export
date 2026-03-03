"use client";
import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DiscoverOverlayShape from "@/public/home/home-discover-watermark.svg";

interface DiscoverCategory {
  id: string;
  name: string;
}

interface DiscoverProps {
  categories?: DiscoverCategory[];
}

export default function Discover({ categories = [] }: DiscoverProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const scrollToSection = (categoryId: string) => {
    setActiveId(categoryId);
    const el = document.getElementById(`category-section-${categoryId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box component="section" className="discoverWrapper">
      <Box className="overlayShape">
        <Image src={DiscoverOverlayShape} alt="discover overlay shape" />
        <Image src={DiscoverOverlayShape} alt="discover overlay shape" />
      </Box>
      <Container>
        <Stack direction="column" spacing={8}>
          <Box className="sectionHeading" sx={{ textAlign: "center" }}>
            <Typography variant="h2" component="h2">
              DISCOVER YOUR Singing Bowls & So Much More
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            className="serviceCategoryButtons"
          >
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant="contained"
                color="primary"
                className={activeId === cat.id ? "active" : ""}
                onClick={() => scrollToSection(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
