import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export const metadata = {
  title: "Login | Rana Export",
  description: "Login to your Rana Export account",
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
