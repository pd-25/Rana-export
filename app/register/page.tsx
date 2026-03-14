import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

export const metadata = {
  title: "Register | Rana Export",
  description: "Create a new account at Rana Export",
};

export default function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}
