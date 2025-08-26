import { CustomButton } from "@/components/custom-button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
        Find Your Perfect Property
      </h1>
      <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl">
        Discover a wide range of properties for rent, sale, or lease. Connect
        with verified landlords and make informed decisions.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="#" passHref>
          <CustomButton size="lg">Start Searching</CustomButton>
        </Link>
        <Link href="/signup" passHref>
          <CustomButton variant="outline" size="lg">
            Create Account
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}
