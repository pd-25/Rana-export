
import { Box, Stack, Typography, Container, Button } from "@mui/material";
import Image from "next/image"
import bgPattern from "@/public/home/trusted-bg-pattern.png"
import trustedServiceImage1 from "@/public/home/trusted-pic-01.png"
import trustedServiceImage2 from "@/public/home/trusted-pic-02.png"
import trustedServiceImage3 from "@/public/home/trusted-pic-03.png"
import trustedServiceImage4 from "@/public/home/trusted-pic-04.png"



export default function TrustedService({ data }: { data?: any }) {
    const content = data?.content || {};
    const title = data?.title || "OUR SINGING BOWLS ARE TRUSTED WORLDWIDE BY";
    const bgImg = content.backgroundImage || bgPattern.src;
    const items = content.items || [
        { text: "Sound Therapy & Healing Experts", image: trustedServiceImage1 },
        { text: "Reiki Healers & Energy Workers", image: trustedServiceImage2 },
        { text: "Yoga Instructors & Enthusiasts", image: trustedServiceImage3 },
        { text: "Meditation Coaches & Practitioners", image: trustedServiceImage4 }
    ];

    return (
        <Box component="section" className="trustedServiceWrapper">
            <Box className="bgPattern" sx={{ backgroundImage: `url(${bgImg})` }}>
                <Image src={bgImg} alt="bg pattern" width={1920} height={400} />
            </Box>
            <Container>
                <Box className="sectionHeading" textAlign="center">
                    <Typography variant="h2" component="h2" >
                        {title}
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    spacing={4}
                    flexWrap="wrap"
                    sx={{ mt: 4 }}
                    className="trustedServiceRow"
                >
                    {items.map((item: any, idx: number) => (
                        <Box
                            key={idx}
                            className="trustedServiceItem"
                            sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", md: "1 1 calc(50% - 32px)", lg: "1 1 calc(25% - 24px)" },
                                minWidth: 0, textAlign: "center"
                            }}
                        >
                            <Image src={item.image} alt={item.text} width={100} height={100} />
                            <Typography variant="body1">
                                {item.text}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    )
}