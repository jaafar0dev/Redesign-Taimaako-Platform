import React from "react";
import logo from "../assets/logo.png";

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({
  className = "h-8 w-auto",
  alt = "Taimaako",
}: LogoProps) {
  return <img src={logo} alt={alt} className={className} />;
}
