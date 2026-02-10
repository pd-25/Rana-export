"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.set("admin_token", "", {
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  redirect("/admin/login");
}
