import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryListing from "@/app/product-varient/[slug]/CategoryListing";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryListingPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the product with its variants and category
  const product = await (prisma as any).product.findUnique({
    where: { slug },
    include: {
      variants: true,
      category: {
        include: {
          parent: true,
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Fetch all top-level categories for the sidebar
  const allCategories = await (prisma as any).category.findMany({
    where: { parentId: null, isActive: true },
    include: {
      children: {
        where: { isActive: true },
        include: {
          children: {
            where: { isActive: true },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Serialize the data for the client component
  const serializedProduct = JSON.parse(JSON.stringify(product));
  const serializedAllCategories = JSON.parse(JSON.stringify(allCategories));

  return (
    <CategoryListing
      product={serializedProduct}
      allCategories={serializedAllCategories}
    />
  );
}
