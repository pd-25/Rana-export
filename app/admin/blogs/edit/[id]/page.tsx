import React from "react";
import { prisma } from "@/lib/prisma";
import BlogForm from "../../BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await (prisma as any).blog.findUnique({
    where: { id: parseInt(id) },
  });

  if (!blog) {
    notFound();
  }

  return <BlogForm initialData={blog} />;
}
