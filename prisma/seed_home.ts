const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding home sections...");

  const sections = [
    {
      section: "hero",
      title: "Explore mindfulness through sacred sound",
      subtitle: "with Silent Mind Singing Bowls",
      content: {
        buttonText: "explore the silence",
        buttonLink: "/",
        backgroundImage: "/home/home-banner-pic.png",
        sliderImages: [
          "/home/banner-image-01.png",
          "/home/banner-image-02.png",
          "/home/banner-image-03.png",
          "/home/banner-image-04.png",
        ],
        bottomInfo: [
          {
            title: "Wholesale B2B Business",
            description: "Unveil tradition and serenity With Handmade Singing Bowls We're your premier B2B source for authentic, handcrafted singing bowls, With wholesale prices and global shipping, expenence the essence of West Bengal artisanal mastery.",
            icon: "/home/home-banner-info-icon-01.svg"
          },
          {
            title: "Shipping Worldwide",
            description: "Experience the essence of Indian culture with Singing Bowls, As a top wholesaler and exporter, we provide competitive wholesale prices for all types of singng bowls & Accessories. Please note that shipping costs may vary based on distance. Explore now",
            icon: "/home/home-banner-info-icon-02.svg"
          },
          {
            title: "PDF Catalog Available",
            description: "Discover the harmomous world of Handmade Singing Bowls' Check out our PDF With a vanety of sizes, weight, price and colors to your preferences Elevate your senses with our Indiantreasures",
            icon: "/home/home-banner-info-icon-03.svg"
          }
        ],
        features: [
          { title: "Mindful", subtitle: "Mindful", icon: "/home/home-banner-features-info-icon-01.svg" },
          { title: "7 Chakra", subtitle: "Healing", icon: "/home/home-banner-features-info-icon-02.svg" },
          { title: "Inner", subtitle: "Peace", icon: "/home/home-banner-features-info-icon-03.svg" }
        ]
      },
      order: 1
    },
    {
        section: "discover",
        title: "DISCOVER YOUR Singing Bowls & So Much More",
        content: {},
        order: 2
    },
    {
      section: "csr_awards",
      content: {
        csr: {
          title: "CORPORATE SOCIAL RESPOSIBILITIES",
          description: "Health is wealth. Through our CSR efforts, we conducted a blood donation camp and health check-up, empowering individuals to care for their well-being while saving lives.",
          image: "/home/csr-pic.png",
          buttonText: "KNOW MORE",
          note: "Free Health checkup-Blood Donation Camp for poor, Organised by Rana Export Trading House, West Bengal, India."
        },
        awards: {
          title: "Awards and Recognition",
          description: "We’re honored to be recognized for preserving ancient craftsmanship. Our award-winning singing bowls celebrate tradition, sound healing, and the skilled artisans who make each piece a soulful masterpiece.",
          image: "/home/awards-pic.png",
          trophyImage: "/home/trophy-image.png",
          buttonText: "KNOW MORE",
          note: "Certificates & Memento received from West Bengal Government for best Hand Made singing Bowl around the world as a star ExportHouse of India."
        }
      },
      order: 4
    },
    {
      section: "trusted_service",
      title: "OUR SINGING BOWLS ARE TRUSTED WORLDWIDE BY",
      content: {
        items: [
          { text: "Sound Therapy & Healing Experts", image: "/home/trusted-pic-01.png" },
          { text: "Reiki Healers & Energy Workers", image: "/home/trusted-pic-02.png" },
          { text: "Yoga Instructors & Enthusiasts", image: "/home/trusted-pic-03.png" },
          { text: "Meditation Coaches & Practitioners", image: "/home/trusted-pic-04.png" }
        ],
        backgroundImage: "/home/trusted-bg-pattern.png"
      },
      order: 5
    },
    {
      section: "product_video",
      title: "OUR PRODUCTS VIDEO",
      content: {
        videos: [
          "https://www.youtube.com/embed/9xwazD5SyVg?si=mXs7VupnrUZwz-IF",
          "https://www.youtube.com/embed/9xwazD5SyVg?si=mXs7VupnrUZwz-IF",
          "https://www.youtube.com/embed/9xwazD5SyVg?si=mXs7VupnrUZwz-IF"
        ]
      },
      order: 7
    },
    {
      section: "testimonial",
      title: "Trusted by People Who Value Quality",
      content: {
        testimonials: [
          {
            name: "Supriya Pramanik",
            role: "Business Owner",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel",
            avatar: "/home/client-avatar-01.png"
          },
          {
            name: "Sunita Jain",
            role: "Business Owner",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel",
            avatar: "/home/client-avatar-02.png"
          },
          {
            name: "Supriya Pramanik",
            role: "Business Owner",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel",
            avatar: "/home/client-avatar-01.png"
          },
          {
            name: "Sunita Jain",
            role: "Business Owner",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel",
            avatar: "/home/client-avatar-02.png"
          }
        ]
      },
      order: 6
    }
  ];

  for (const s of sections) {
    await prisma.homeSection.upsert({
      where: { section: s.section },
      update: s,
      create: s,
    });
  }

  console.log("Home sections seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
