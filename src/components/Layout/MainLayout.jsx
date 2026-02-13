// components/Layout/MainLayout.jsx
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}