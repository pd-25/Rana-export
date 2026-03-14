import { prisma } from "@/lib/prisma";
import ColletionLisitng from "./[slug]/ColletionLisitng";

export const metadata = {
  title: "All Collections | Rana Export",
};

export default async function AllCollectionsPage() {
  // Fetch all top-level categories with their children and products
  const categories = await (prisma as any).category.findMany({
    where: { parentId: null, isActive: true },
    include: {
      children: {
        where: { isActive: true },
        include: {
          products: {
            where: { isActive: true },
            include: { variants: true },
          },
          children: {
            where: { isActive: true },
            include: {
              products: {
                where: { isActive: true },
                include: { variants: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      products: {
        where: { isActive: true },
        include: { variants: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Fetch all top-level categories for the sidebar
  const allCategories = await (prisma as any).category.findMany({
    where: { parentId: null, isActive: true },
    include: {
      children: {
        where: { isActive: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Create a virtual "All Collections" category to reuse the layout
  const virtualCategory = {
    id: 0,
    name: "Our Collections",
    slug: "all",
    description:
      "Explore our complete range of singing bowls and handcrafted products.",
    image: null,
    products: [],
    children: categories, // This will make each main category a section in the layout
  };

  return (
    <ColletionLisitng
      category={JSON.parse(JSON.stringify(virtualCategory))}
      allCategories={JSON.parse(JSON.stringify(allCategories))}
    />
  );
}
