import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AllProductsListing from "../categories/[slug]/AllProductsListing";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OurCollectionPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  // Fetch products marked for "Our Collection"
  const products = await (prisma as any).product.findMany({
    where: {
      isOurCollection: true,
      isActive: true
    },
    include: { variants: true },
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" }
  });

  const totalProducts = await (prisma as any).product.count({
    where: {
      isOurCollection: true,
      isActive: true
    }
  });

  // Fetch all categories for sidebar
  const allCategories = await (prisma as any).category.findMany({
    where: { parentId: null, isActive: true },
    include: {
      children: {
        where: { isActive: true },
        include: {
          children: {
            where: { isActive: true }
          }
        }
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Create a mock category object for the listing component
  const mockCategory = {
    name: "Our Collection",
    slug: "our-collection",
    description: "Handpicked premium products from our artisans.",
  };

  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedAllCategories = JSON.parse(JSON.stringify(allCategories));

  return (
    <AllProductsListing 
      category={mockCategory} 
      products={serializedProducts} 
      allCategories={serializedAllCategories}
      currentPage={page}
      totalPages={Math.ceil(totalProducts / pageSize)}
    />
  );
}
