import { prisma } from "@/lib/prisma";
import Banner from "@/components/section/hero/Hero";
import Discover from "@/components/section/service-category/Discover";
import HomeCategorySection from "@/components/section/service-category/HomeCategorySection";
import CsrAwards from "@/components/section/csr-awards/CsrAwards";
import TrustedService from "@/components/section/trusted-service/TrustedService";
import Testimonial from "@/components/section/testimonial/Testimonial";
import ProductVideo from "@/components/section/product-video/ProductVideo";

export default async function Home() {
  const homeSections = await (prisma as any).homeSection.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const getSectionData = (sectionName: string) => {
    return homeSections.find((s: any) => s.section === sectionName);
  };

  const homeCategories = await (prisma as any).category.findMany({
    where: {
      showOnHome: true,
      isActive: true,
      parentId: null, // Only parent categories marked for home
    },
    include: {
      products: {
        where: { showOnHome: true, isActive: true },
        include: { variants: true },
      },
      children: {
        where: { isActive: true },
        include: {
          products: {
            where: { showOnHome: true, isActive: true },
            include: { variants: true },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const getBackgroundColor = (index: number) => {
    if (index === 0) return "#EFCFCE";
    return index % 2 === 1 ? "#FEEBD6" : "#FFE5DB";
  };

  // Build the list of categories that have products (will actually be shown)
  const discoverCategories = homeCategories
    .filter((category: any) => {
      const allProducts = [
        ...(category.products || []),
        ...(category.children?.flatMap((child: any) => child.products) || []),
      ];
      const uniqueProducts = Array.from(
        new Map(allProducts.map((p: any) => [p.id, p])).values(),
      );
      return uniqueProducts.length > 0;
    })
    .map((category: any) => ({
      id: category.id,
      name: category.name,
    }));

  const heroData = getSectionData("hero");
  const discoverData = getSectionData("discover");
  const csrAwardsData = getSectionData("csr_awards");
  const trustedServiceData = getSectionData("trusted_service");
  const testimonialData = getSectionData("testimonial");
  const productVideoData = getSectionData("product_video");

  return (
    <>
      <Banner data={heroData} />
      <Discover categories={discoverCategories} title={discoverData?.title} />

      {homeCategories.map((category: any, index: number) => {
        // Combine products from main category and its subcategories
        const allProducts = [
          ...(category.products || []),
          ...(category.children?.flatMap((child: any) => child.products) || []),
        ];

        // Unique products by ID
        const uniqueProducts = Array.from(
          new Map(allProducts.map((p) => [p.id, p])).values(),
        );

        if (uniqueProducts.length === 0) return null;

        return (
          <HomeCategorySection
            key={category.id}
            id={`category-section-${category.id}`}
            title={category.name}
            subHeading={category.subHeading || undefined}
            description={category.description || undefined}
            backgroundColor={getBackgroundColor(index)}
            products={uniqueProducts}
            categorySlug={category.slug}
            autoplayDelay={1500 + index * 100}
          />
        );
      })}

      <CsrAwards data={csrAwardsData} />
      <TrustedService data={trustedServiceData} />
      <Testimonial data={testimonialData} />
      <ProductVideo data={productVideoData} />
    </>
  );
}
