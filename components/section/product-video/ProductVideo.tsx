
import { Box, Stack, Typography, Container, Button, Grid } from "@mui/material";
import Image from "next/image"
import bgPattern1 from "@/public/home/product-video-pattern-01.png"
import bgPattern2 from "@/public/home/product-video-pattern-02.png"
import trustedServiceImage1 from "@/public/home/trusted-pic-01.png"
import trustedServiceImage2 from "@/public/home/trusted-pic-02.png"
import trustedServiceImage3 from "@/public/home/trusted-pic-03.png"
import trustedServiceImage4 from "@/public/home/trusted-pic-04.png"



export default function ProductVideo({ data }: { data?: any }) {
    const content = data?.content || {};
    const title = data?.title || "OUR PRODUCTS VIDEO";
    const videos = content.videos || [
        "https://www.youtube.com/embed/9xwazD5SyVg?si=mXs7VupnrUZwz-IF",
        "https://www.youtube.com/embed/9xwazD5SyVg?si=mXs7VupnrUZwz-IF",
        "https://www.youtube.com/embed/9xwazD5SyVg?si=mXs7VupnrUZwz-IF"
    ];

    return (
        <Box component="section" className="productVideoWrapper">
            <Box className="bgPattern">
                <Image src={bgPattern1} alt="bg pattern" />
                <Image src={bgPattern2} alt="bg pattern" />
            </Box>
            <Container>
                <Box className="sectionHeading" textAlign="center">
                    <Typography variant="h2" component="h2" >
                        {title}
                    </Typography>
                </Box>
                <Grid container spacing={{ xs: 2, sm: 6, md: 6 }}>
                    {videos.map((video: string, idx: number) => (
                        <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box
                                className="productVideoCard"
                                sx={{
                                    textAlign: "center"
                                }}
                            >
                                <iframe width="100%" height="100%" src={video} title={`YouTube video player ${idx}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}