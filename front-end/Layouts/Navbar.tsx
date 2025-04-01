"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

interface FilterOptions {
  priceRange: { min: number; max: number | null };
  location: string;
  propertyType: string;
  bedrooms: number | null;
  bathrooms: number | null;
}

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: { min: 250000, max: null },
    location: "",
    propertyType: "",
    bedrooms: null,
    bathrooms: null,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navigation
      isScrolled={isScrolled}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
