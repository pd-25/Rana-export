import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AllProductsListing from "../../categories/[slug]/AllProductsListing";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SLUG_MAP: { [key: string]: string } = {
  "new-products": "New Products",
  "best-sellers": "Best Sellers",
  "special-offers": "Special Offers",
  "warehouse-clearance": "Warehouse Clearance",
  "discontinued-products": "Discontinued Products",
  "offers-of-the-month": "Offers of the Month",
};

export default async function CollectionSlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  if (!SLUG_MAP[slug]) {
    notFound();
  }

  const pageParam = resolvedSearchParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  // For now, since we don't have explicit flags for these in DB,
  // we fetch all active products and order by newest for 'new-products'
  // or just general desc for others.
  const products = await (prisma as any).product.findMany({
    where: {
      isActive: true,
    },
    include: { variants: true },
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" }
  });

  const totalProducts = await (prisma as any).product.count({
    where: {
      isActive: true,
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

  const mockCategory = {
    name: SLUG_MAP[slug],
    slug: slug,
    description: `Explore our selection of ${SLUG_MAP[slug]}.`,
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
