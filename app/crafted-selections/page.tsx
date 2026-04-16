import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AllProductsListing from "../categories/[slug]/AllProductsListing";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CraftedSelectionsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  // Fetch products marked for "Crafted Selections"
  const products = await (prisma as any).product.findMany({
    where: {
      isCraftedSelection: true,
      isActive: true
    },
    include: { variants: true },
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" }
  });

  const totalProducts = await (prisma as any).product.count({
    where: {
      isCraftedSelection: true,
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
    name: "Crafted Selections",
    slug: "crafted-selections",
    description: "Masterpieces selected for their exceptional quality and beauty.",
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
