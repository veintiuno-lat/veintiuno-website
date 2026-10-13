import React from "react";
import PageHero from "@/components/layout/PageHero";

interface MissionHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  /** Kept for API compatibility; all variants now render the dark shader hero. */
  variant?: "warm" | "dark" | "sunrise" | "ember";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MissionHero: React.FC<MissionHeroProps> = ({ badge = "Misión", variant, ...rest }) => (
  <PageHero badge={badge} {...rest} />
);

export default MissionHero;
