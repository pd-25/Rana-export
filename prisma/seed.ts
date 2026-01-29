const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Admin User
  const email = "admin@mail.com";
  const password = "12345678";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("Admin seeded:", admin.email);

  // 2. Seed Categories
  const cat1 = await prisma.category.upsert({
    where: { slug: "singing-bowls" },
    update: {},
    create: {
      name: "Singing Bowls",
      slug: "singing-bowls",
      image: "https://placehold.co/400x400?text=Singing+Bowls",
    },
  });

  const cat2 = await prisma.category.upsert({
    where: { slug: "handicrafts" },
    update: {},
    create: {
      name: "Handicrafts",
      slug: "handicrafts",
      image: "https://placehold.co/400x400?text=Handicrafts",
    },
  });

  console.log("Categories seeded");

  // 3. Seed Variant Groups
  const group1 = await prisma.variantGroup.upsert({
    where: { name: "Bowl Standard Sizes" },
    update: {
      fields: ["Weight (gm)", "Size (cm)", "Total Weight"],
    },
    create: {
      name: "Bowl Standard Sizes",
      fields: ["Weight (gm)", "Size (cm)", "Total Weight"],
      items: {
        create: [
          { data: { "Weight (gm)": "425-475", "Size (cm)": "±12", "Total Weight": "±450" } },
          { data: { "Weight (gm)": "650-750", "Size (cm)": "±15", "Total Weight": "±700" } },
        ],
      },
    },
  });

  console.log("Variant Groups seeded");

  // 4. Seed Products
  const p1 = await prisma.product.upsert({
    where: { slug: "hand-hammered-singing-bowl" },
    update: {},
    create: {
      name: "Hand Hammered Singing Bowl",
      slug: "hand-hammered-singing-bowl",
      sku: "SB-001",
      modelNo: "MOD-HAMMER",
      ean: "1234567890123",
      description: "High quality hand hammered singing bowl made from 7 metals.",
      categoryId: cat1.id,
      material: "7 Metals Alloy",
      packaging: "Box Packaging",
      origin: "Nepal",
      shippingDetails: "Standard international shipping.",
      isActive: true,
      mainImage: "https://placehold.co/800x600?text=Main+Bowl+Image",
      gallery: {
        create: [
          { url: "https://placehold.co/600x400?text=Box+Image" },
          { url: "https://placehold.co/600x400?text=Action+Image" },
        ],
      },
      variants: {
        create: [
          { data: { "Weight (gm)": "425-475", "Size (cm)": "±12", "Total Weight": "±450" } },
          { data: { "Weight (gm)": "650-750", "Size (cm)": "±15", "Total Weight": "±700" } },
        ],
      },
    },
  });

  const p2 = await prisma.product.upsert({
    where: { slug: "wooden-buddha-statue" },
    update: {},
    create: {
      name: "Wooden Buddha Statue",
      slug: "wooden-buddha-statue",
      sku: "STAT-001",
      modelNo: "MOD-WOOD",
      description: "Beautifully carved wooden statue of Buddha.",
      categoryId: cat2.id,
      material: "Solid Wood",
      isActive: true,
      mainImage: "https://placehold.co/800x600?text=Buddha+Statue",
      variants: {
        create: [
          { data: { "Height": "10 inch", "Weight": "500gm" } },
        ],
      },
    },
  });

  console.log("Products seeded:", p1.name, ",", p2.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
