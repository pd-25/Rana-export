import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ColletionLisitng from "./ColletionLisitng";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionListingPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the current category with its children and products
  const category = await (prisma as any).category.findUnique({
    where: { slug },
    include: {
      children: {
        where: { isActive: true },
        include: {
          products: {
            where: { isActive: true },
            include: { variants: true },
          },
          // Fetch grandchildren (sub-subcategories)
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

  if (!category) {
    notFound();
  }

  // Serialize the data for the client component
  const serializedCategory = JSON.parse(JSON.stringify(category));
  const serializedAllCategories = JSON.parse(JSON.stringify(allCategories));

  return (
    <ColletionLisitng
      category={serializedCategory}
      allCategories={serializedAllCategories}
    />
  );
}
