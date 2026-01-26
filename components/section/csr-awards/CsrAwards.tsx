import { Box, Stack, Typography, Container, Button } from "@mui/material";
import Icon from "@/components/ui/icon/Icon"
import Image from "next/image"
import csrImage from "@/public/home/csr-pic.png"
import AwardsImage from "@/public/home/awards-pic.png"
import TrophyImage from "@/public/home/trophy-image.png"
export default function CsrAwards() {
    return (
        <Box component="section" className="csrAwardsWrapper">
            <Stack direction="row" spacing={4} flexWrap={{ xs: "wrap", md: "nowrap", lg: "nowrap" }}>
                <Box className="csrCard" sx={{ width: { xs: "100%", md: "50%", lg: "50%" }, backgroundColor: "#FFE5DB" }}>
                    <Stack direction="row" spacing={4} flexWrap={{ xs: "wrap", md: "nowrap", lg: "nowrap" }}>
                        <Box className="sectionHeading isLeft" sx={{ width: { xs: "100%", md: "50%", lg: "50%" } }}>
                            <Typography variant="h2" component="h2" sx={{ display: "flex", alignItems: "end", justifyContent: "start", gap: 2 }}>
                                CORPORATE SOCIAL
                                RESPOSIBILITIES
                                <Icon name="headingIcon" width={27} height={27} style={{ marginBottom: "0" }} />
                            </Typography>
                            <Typography variant="body1">
                                Health is wealth. Through our CSR efforts, we
                                conducted a blood donation camp and health
                                check-up, empowering individuals to care for their
                                well-being while saving lives.
                            </Typography>
                            <Button variant="contained" color="primary" className="gradientButtonAlt">
                                KNOW MORE
                                <Icon name="ButtonArrowAlt" width={20} height={20} />
                            </Button>
                        </Box>
                        <Box className="csrImage" sx={{ width: { xs: "100%", md: "50%", lg: "50%" } }}>
                            <Image src={csrImage} alt="CSR Awards" />
                            <Typography variant="body1">
                                Free Health checkup-Blood Donation Camp for poor, Organised by
                                Rana Export Trading House, West Bengal, India.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box className="csrCard" sx={{ width: { xs: "100%", md: "50%", lg: "50%" }, backgroundColor: "#F4DFE5" }}>
                    <Stack direction="row" spacing={4} flexWrap={{ xs: "wrap", md: "nowrap", lg: "nowrap" }}>
                        <Box className="sectionHeading isLeft" sx={{ width: { xs: "100%", md: "50%", lg: "50%" } }}>
                            <Typography variant="h2" component="h2" sx={{ display: "flex", alignItems: "end", justifyContent: "start", gap: 2 }}>
                                Awards and
                                Recognition
                                <Icon name="headingIcon" width={27} height={27} style={{ marginBottom: "0" }} />
                            </Typography>
                            <Typography variant="body1">
                                We’re honored to be recognized for preserving
                                ancient craftsmanship. Our award-winning
                                singing bowls celebrate tradition, sound
                                healing, and the skilled artisans who make
                                each piece a soulful masterpiece.
                            </Typography>
                            <Button variant="contained" color="primary" className="gradientButtonAlt">
                                KNOW MORE
                                <Icon name="ButtonArrowAlt" width={20} height={20} />
                            </Button>
                        </Box>
                        <Box className="csrImage" sx={{ width: { xs: "100%", md: "50%", lg: "50%" } }}>
                            <Image src={AwardsImage} alt="Awards" />
                            <Box className="awardsImage">
                                <Image src={TrophyImage} alt="Awards" />
                            </Box>
                            <Typography variant="body1">
                                Certificates & Memento received from West Bengal Government
                                for best Hand Made singing Bowl around the world as a star
                                ExportHouse of India.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}