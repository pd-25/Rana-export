import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AllProductsListing from "./AllProductsListing";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoriesPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  // Fetch category
  const categoryWithChildren = await (prisma as any).category.findUnique({
    where: { slug },
    include: {
      children: {
        where: { isActive: true },
        include: {
          children: {
            where: { isActive: true }
          }
        }
      }
    }
  });

  if (!categoryWithChildren) {
    notFound();
  }

  // Get all category IDs including children and grandchildren
  const categoryIds = [categoryWithChildren.id];
  categoryWithChildren.children.forEach((child: any) => {
    categoryIds.push(child.id);
    if (child.children) {
      child.children.forEach((subChild: any) => {
        categoryIds.push(subChild.id);
      });
    }
  });

  const products = await (prisma as any).product.findMany({
    where: {
      categoryId: { in: categoryIds },
      isActive: true
    },
    include: { variants: true },
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" }
  });

  const totalProducts = await (prisma as any).product.count({
    where: {
      categoryId: { in: categoryIds },
      isActive: true
    }
  });

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

  const serializedCategory = JSON.parse(JSON.stringify(categoryWithChildren));
  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedAllCategories = JSON.parse(JSON.stringify(allCategories));

  return (
    <AllProductsListing 
      category={serializedCategory} 
      products={serializedProducts} 
      allCategories={serializedAllCategories}
      currentPage={page}
      totalPages={Math.ceil(totalProducts / pageSize)}
    />
  );
}
