
import { Box, Stack, Typography, Container, Button } from "@mui/material";
import Image from "next/image"
import bgPattern from "@/public/home/trusted-bg-pattern.png"
import trustedServiceImage1 from "@/public/home/trusted-pic-01.png"
import trustedServiceImage2 from "@/public/home/trusted-pic-02.png"
import trustedServiceImage3 from "@/public/home/trusted-pic-03.png"
import trustedServiceImage4 from "@/public/home/trusted-pic-04.png"



export default function TrustedService() {
    return (
        <Box component="section" className="trustedServiceWrapper">
            <Box className="bgPattern">
                <Image src={bgPattern} alt="bg pattern" />
            </Box>
            <Container>
                <Box className="sectionHeading" textAlign="center">
                    <Typography variant="h2" component="h2" >
                        OUR SINGING BOWLS ARE TRUSTED WORLDWIDE BY
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    spacing={4}
                    flexWrap="wrap"
                    sx={{ mt: 4 }}
                    className="trustedServiceRow"
                >
                    <Box
                        className="trustedServiceItem"
                        sx={{
                            flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", md: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 24px)" },
                            minWidth: 0, textAlign: "center"
                        }}
                    >
                        <Image src={trustedServiceImage1} alt="trusted service" />
                        <Typography variant="body1">
                            Sound Therapy & Healing Experts
                        </Typography>
                    </Box>
                    <Box
                        className="trustedServiceItem"
                        sx={{
                            flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", md: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 24px)" },
                            minWidth: 0, textAlign: "center"
                        }}
                    >
                        <Image src={trustedServiceImage2} alt="trusted service" />
                        <Typography variant="body1">
                            Reiki Healers & Energy Workers
                        </Typography>
                    </Box>
                    <Box
                        className="trustedServiceItem"
                        sx={{
                            flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", md: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 24px)" },
                            minWidth: 0, textAlign: "center"
                        }}
                    >
                        <Image src={trustedServiceImage3} alt="trusted service" />
                        <Typography variant="body1">
                            Yoga Instructors & Enthusiasts
                        </Typography>
                    </Box>
                    <Box
                        className="trustedServiceItem"
                        sx={{
                            flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", md: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 24px)" },
                            minWidth: 0, textAlign: "center"
                        }}
                    >
                        <Image src={trustedServiceImage4} alt="trusted service" />
                        <Typography variant="body1">
                            Meditation Coaches & Practitioners
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}