import Link from "next/link";
import Image from "next/image";

import logoImage from "@/public/images/logo.png";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeConfig = {
    sm: { imageClass: "h-8 w-auto", markClass: "h-8 w-auto" },
    md: { imageClass: "h-11 w-auto", markClass: "h-11 w-auto" },
    lg: { imageClass: "h-14 w-auto", markClass: "h-14 w-auto" },
  };

  const config = sizeConfig[size];

  return (
    <Link href="/" className={`group flex items-center gap-3 transition-all hover:scale-[1.01] ${className}`}>
      <Image
        src={logoImage}
        alt="SMA logo"
        priority
        className={`${config.imageClass} object-contain`}
      />

      {/* Logo Text */}
      <div>
        <p className="text-base font-bold tracking-tight text-slate-950">SMA</p>
        <p className="text-xs text-slate-500">Enterprise Solutions</p>
      </div>
    </Link>
  );
}

export function LogoMark() {
  return (
    <Image src={logoImage} alt="SMA logo" priority className="h-11 w-auto object-contain" />
  );
}
