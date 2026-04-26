'use client'
import { Box, Stack, Typography, Container, Button } from "@mui/material";
import Icon from "@/components/ui/icon/Icon"
import Image from "next/image"
import csrImage from "@/public/home/csr-pic.png"
import AwardsImage from "@/public/home/awards-pic.png"
import TrophyImage from "@/public/home/trophy-image.png"

export default function CsrAwards({ data }: { data?: any }) {
    const content = data?.content || {};
    const csr = content.csr || {
        title: "CORPORATE SOCIAL RESPOSIBILITIES",
        description: "Health is wealth. Through our CSR efforts, we conducted a blood donation camp and health check-up, empowering individuals to care for their well-being while saving lives.",
        image: csrImage,
        buttonText: "KNOW MORE",
        note: "Free Health checkup-Blood Donation Camp for poor, Organised by Rana Export Trading House, West Bengal, India."
    };
    const awards = content.awards || {
        title: "Awards and Recognition",
        description: "We’re honored to be recognized for preserving ancient craftsmanship. Our award-winning singing bowls celebrate tradition, sound healing, and the skilled artisans who make each piece a soulful masterpiece.",
        image: AwardsImage,
        trophyImage: TrophyImage,
        buttonText: "KNOW MORE",
        note: "Certificates & Memento received from West Bengal Government for best Hand Made singing Bowl around the world as a star ExportHouse of India."
    };

    return (
        <Box component="section" className="csrAwardsWrapper">
            <Stack direction="row" spacing={4} flexWrap={{ xs: "wrap", md: "nowrap", lg: "nowrap" }}>
                <Box className="csrCard" sx={{ width: { xs: "100%", md: "50%", lg: "50%" }, backgroundColor: "#FFE5DB" }}>
                    <Stack direction="row" spacing={4} flexWrap={{ xs: "wrap-reverse", md: "wrap-reverse", lg: "nowrap" }}>
                        <Box className="sectionHeading isLeft" sx={{ width: { xs: "100%", md: "100%", lg: "50%" } }}>
                            <Typography variant="h2" component="h2" sx={{ display: "flex", alignItems: "end", justifyContent: "start", gap: 2 }}>
                                {csr.title}
                                <Icon name="headingIcon" width={27} height={27} style={{ marginBottom: "0" }} />
                            </Typography>
                            <Typography variant="body1">
                                {csr.description}
                            </Typography>
                            <Button variant="contained" color="primary" className="gradientButtonAlt">
                                {csr.buttonText}
                                <Icon name="ButtonArrowAlt" width={20} height={20} />
                            </Button>
                        </Box>
                        <Box className="csrImage" sx={{ width: { xs: "100%", md: "100%", lg: "50%" } }}>
                            <Image src={csr.image} alt={csr.title} width={600} height={400} />
                            <Typography variant="body1">
                                {csr.note}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box className="csrCard" sx={{ width: { xs: "100%", md: "50%", lg: "50%" }, backgroundColor: "#F4DFE5" }}>
                    <Stack direction="row" spacing={4} flexWrap={{ xs: "wrap-reverse", md: "wrap-reverse", lg: "nowrap" }}>
                        <Box className="sectionHeading isLeft" sx={{ width: { xs: "100%", md: "100%", lg: "50%" } }}>
                            <Typography variant="h2" component="h2" sx={{ display: "flex", alignItems: "end", justifyContent: "start", gap: 2 }}>
                                {awards.title}
                                <Icon name="headingIcon" width={27} height={27} style={{ marginBottom: "0" }} />
                            </Typography>
                            <Typography variant="body1">
                                {awards.description}
                            </Typography>
                            <Button variant="contained" color="primary" className="gradientButtonAlt">
                                {awards.buttonText}
                                <Icon name="ButtonArrowAlt" width={20} height={20} />
                            </Button>
                        </Box>
                        <Box className="csrImage" sx={{ width: { xs: "100%", md: "100%", lg: "50%" } }}>
                            <Image src={awards.image} alt={awards.title} width={600} height={400} />
                            <Box className="awardsImage">
                                <Image src={awards.trophyImage || TrophyImage} alt="Awards Trophy" width={150} height={150} />
                            </Box>
                            <Typography variant="body1">
                                {awards.note}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}