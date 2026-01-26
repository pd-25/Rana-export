import { Box, Button, Container, Stack, Typography } from "@mui/material"
import Image from "next/image"
import DiscoverOverlayShape from "@/public/home/home-discover-watermark.svg"

export default function Discover() {
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
                        <Button variant="contained" color="primary">SINGING BOWL</Button>
                        <Button variant="contained" color="primary">STICK</Button>
                        <Button variant="contained" color="primary">TINGSHA</Button>
                        <Button variant="contained" color="primary">GONG</Button>
                        <Button variant="contained" color="primary">Bell & Dorjee</Button>
                        <Button variant="contained" color="primary">CUSHION</Button>
                        <Button variant="contained" color="primary">OTHERS PRODUCT</Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}