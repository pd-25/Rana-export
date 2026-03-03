import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ColletionLisitng from "./ColletionLisitng";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionListingPage({ params }: PageProps) {
  const { slug } = await params;

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

  if (!category) {
    notFound();
  }

  // Serialize the data for the client component
  const serializedCategory = JSON.parse(JSON.stringify(category));

  return <ColletionLisitng category={serializedCategory} />;
}
