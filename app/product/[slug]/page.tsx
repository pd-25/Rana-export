import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Single from "./Single";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SinglePage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch the product with all its relations
  const product = await (prisma as any).product.findUnique({
    where: { slug },
    include: {
      category: {
        include: {
          parent: true,
          products: {
            where: {
              isActive: true,
              NOT: { slug: slug },
            },
            take: 10,
            include: { variants: true },
          },
        },
      },
      gallery: true,
      variants: true,
      documents: true,
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
    <Single
      product={serializedProduct}
      allCategories={serializedAllCategories}
    />
  );
}
