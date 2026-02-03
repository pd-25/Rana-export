"use client"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import Image from "next/image"
import DiscoverOverlayShape from "@/public/home/home-discover-watermark.svg"

const CATEGORY_SECTIONS: { label: string; sectionId: string }[] = [
    { label: "SINGING BOWL", sectionId: "singing-bowl-1" },
    { label: "STICK", sectionId: "stick-1" },
    { label: "TINGSHA", sectionId: "tingsha-1" },
    { label: "GONG", sectionId: "gong-1" },
    { label: "Bell & Dorjee", sectionId: "bell-dorjee-1" },
    { label: "CUSHION", sectionId: "cushion-1" },
    { label: "OTHERS PRODUCT", sectionId: "other-product-1" },
]

export default function Discover() {
    const scrollToSection = (sectionId: string) => {
        const el = document.getElementById(sectionId)
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

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
                    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" className="serviceCategoryButtons">
                        {CATEGORY_SECTIONS.map(({ label, sectionId }) => (
                            <Button
                                key={sectionId}
                                variant="contained"
                                color="primary"
                                onClick={() => scrollToSection(sectionId)}
                            >
                                {label}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}