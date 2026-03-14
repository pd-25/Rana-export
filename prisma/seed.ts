const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up current database...");

  // Delete in order to respect constraints
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productDocument.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.variantGroupItem.deleteMany({});
  await prisma.variantGroup.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.customer.deleteMany({});

  console.log("Database cleaned.");

  // 1. Seed Admin User
  const email = "admin@mail.com";
  const password = "12345678";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("Admin seeded:", admin.email);

  // Helper functions for naming and slugs
  const slugify = (text: string) => text.toLowerCase().replace(/[\s\/]+/g, '-').replace(/[^\w-]+/g, '');

  // --- SINGING BOWL ---
  const catSingingBowl = await prisma.category.create({
    data: {
      name: "SINGING BOWL",
      slug: "singing-bowl",
      image: "https://placehold.co/600x400?text=SINGING+BOWL",
      isActive: true,
    },
  });

  const subHandMade = await prisma.category.create({
    data: {
      name: "Hand Made Singing Bowl",
      slug: "hand-made-singing-bowl",
      parentId: catSingingBowl.id,
      isActive: true,
    },
  });

  const subCastingBowl = await prisma.category.create({
    data: {
      name: "Casting Bowl",
      slug: "casting-bowl",
      parentId: catSingingBowl.id,
      isActive: true,
    },
  });

  const subAntiqueOldBowl = await prisma.category.create({
    data: {
      name: "Antique Old Bowl",
      slug: "antique-old-bowl",
      parentId: catSingingBowl.id,
      isActive: true,
    },
  });

  // Hand Made Singing Bowl Products
  const handMadeProducts = [
    "Jam/Bengali Bowl", "Jhumka Bowl", "Therapy/Mat Bowl", "Nari/Lingam Bowl",
    "Raw Bowl", "Tiger Eye", "Black & Golden", "Golden Bowl", "Kubre Bowl",
    "Ultra/Rangoli Bowl", "Deb Jam (D.J) Bowl", "Gul Bowl", "Engraving & Caring",
    "Full Moon (SP Quality)", "Chakra Bowl", "Other Bowl"
  ];

  for (const pName of handMadeProducts) {
    await prisma.product.create({
      data: {
        name: pName,
        slug: slugify(pName),
        categoryId: subHandMade.id,
        description: `${pName} - High quality hand made singing bowl.`,
        isActive: true,
        mainImage: `https://placehold.co/800x600?text=${encodeURIComponent(pName)}`,
        variants: {
          create: [1, 2, 3, 4, 5, 6].map(i => ({
            data: { "Type": `Type-${i}`, "Weight": "Approx weight (gm) & Size (cm)" }
          }))
        }
      }
    });
  }

  // Casting Bowl Products
  const castingProducts = ["Brass Made", "Bronze Made"];
  for (const pName of castingProducts) {
    await prisma.product.create({
      data: {
        name: pName,
        slug: `casting-${slugify(pName)}`,
        categoryId: subCastingBowl.id,
        isActive: true,
        mainImage: `https://placehold.co/800x600?text=${encodeURIComponent(pName)}`,
        variants: {
          create: [1, 2, 3, 4, 5, 6].map(i => ({
            data: { "Type": `Type-${i}`, "Weight": "Approx weight (gm) & Size (cm)" }
          }))
        }
      }
    });
  }

  // Antique Old Bowl
  await prisma.product.create({
    data: {
      name: "Antique Old Bowl Set",
      slug: "antique-old-bowl-set",
      categoryId: subAntiqueOldBowl.id,
      isActive: true,
      mainImage: `https://placehold.co/800x600?text=Antique+Old+Bowl`,
      variants: {
        create: [1, 2, 3].map(i => ({
          data: { "Type": `Type-${i}`, "Weight": "Approx weight (gm) & Size (cm)" }
        }))
      }
    }
  });


  // --- STICK ---
  const catStick = await prisma.category.create({
    data: {
      name: "STICK",
      slug: "stick",
      image: "https://placehold.co/600x400?text=STICK",
      isActive: true,
    },
  });

  const stickSubCats = ["Wooden", "Leather", "Drum Stick", "SP Stick"];
  for (const scName of stickSubCats) {
    const sc = await prisma.category.create({
      data: {
        name: scName,
        slug: slugify(scName),
        parentId: catStick.id,
        isActive: true,
      },
    });

    if (scName === "Drum Stick") {
      const drumTypes = ["Hard", "Soft", "Feather Stick"];
      for (const dType of drumTypes) {
        await prisma.product.create({
          data: {
            name: `${dType} Stick`,
            slug: slugify(`${scName}-${dType}`),
            categoryId: sc.id,
            isActive: true,
            mainImage: `https://placehold.co/800x600?text=${encodeURIComponent(dType)}+Stick`,
            variants: {
              create: [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
                data: { "Type": `Type-${i}`, "Weight": "Approx size & Weight" }
              }))
            }
          }
        });
      }
    } else {
      await prisma.product.create({
        data: {
          name: `${scName} Products`,
          slug: `stick-${slugify(scName)}`,
          categoryId: sc.id,
          isActive: true,
          mainImage: `https://placehold.co/800x600?text=${encodeURIComponent(scName)}`,
          variants: {
            create: [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
              data: { "Type": `Type-${i}`, "Weight": "Approx size & Weight" }
            }))
          }
        }
      });
    }
  }


  // --- TINGSHA ---
  const catTingsha = await prisma.category.create({
    data: {
      name: "TINGSHA",
      slug: "tingsha",
      image: "https://placehold.co/600x400?text=TINGSHA",
      isActive: true,
    },
  });

  const tingshaSubItems = ["Brass Made (Normal Quality)", "Sanai Quality", "Bronze (SP)", "Special Quality", "Tingsha Cover"];
  for (const tName of tingshaSubItems) {
    const tSub = await prisma.category.create({
      data: {
        name: tName,
        slug: slugify(tName),
        parentId: catTingsha.id,
        isActive: true,
      },
    });

    await prisma.product.create({
      data: {
        name: tName,
        slug: `tingsha-${slugify(tName)}`,
        categoryId: tSub.id,
        isActive: true,
        mainImage: `https://placehold.co/800x600?text=${encodeURIComponent(tName)}`,
        variants: {
          create: [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
            data: { "Type": `Type-${i}`, "Weight": "Approx size & Weight" }
          }))
        }
      }
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
