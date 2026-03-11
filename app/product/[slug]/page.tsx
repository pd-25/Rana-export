import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Single from "./Single";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SinglePage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the product with all its relations (no related products yet)
  const product = await (prisma as any).product.findUnique({
    where: { slug },
    include: {
      category: {
        include: { parent: true },
      },
      gallery: true,
      variants: true,
      documents: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Determine which category to pull related products from
  const relatedCatId = product.relatedCategoryId ?? product.categoryId;

  const relatedProducts = await (prisma as any).product.findMany({
    where: {
      categoryId: relatedCatId,
      isActive: true,
      NOT: { slug },
    },
    take: 10,
    include: { variants: true },
  });

  // Determine which category to pull "You Might Also Like" products from
  const youMightAlsoCatId =
    product.youMightAlsoCategoryId ?? product.categoryId;

  const youMightAlsoProducts = await (prisma as any).product.findMany({
    where: {
      categoryId: youMightAlsoCatId,
      isActive: true,
      NOT: { slug },
    },
    take: 10,
    include: { variants: true },
  });

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

  // Attach relatedProducts and youMightAlsoProducts to the product object
  const serializedProduct = JSON.parse(
    JSON.stringify({ ...product, relatedProducts, youMightAlsoProducts }),
  );
  const serializedAllCategories = JSON.parse(JSON.stringify(allCategories));

  return (
    <Single
      product={serializedProduct}
      allCategories={serializedAllCategories}
    />
  );
}
