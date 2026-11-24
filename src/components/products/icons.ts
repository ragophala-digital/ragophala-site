import { Briefcase, Bot, CircleCheck, Clock, Compass, Factory, FlaskConical, GraduationCap, Hammer, ServerCog, ShoppingBag, TrendingUp, type LucideIcon } from "lucide-react";
import type { IconKey, ProductStatus } from "@/lib/products/types";

export const ICONS: Readonly<Record<IconKey, LucideIcon>> = {
  briefcase: Briefcase,
  bot: Bot,
  factory: Factory,
  "shopping-bag": ShoppingBag,
  "graduation-cap": GraduationCap,
  "server-cog": ServerCog,
  "trending-up": TrendingUp,
};

/** Each status has its own shape as well as its own colour, so state is never communicated by colour alone. */
export const STATUS_ICONS: Readonly<Record<ProductStatus, LucideIcon>> = {
  live: CircleCheck,
  beta: FlaskConical,
  "in-development": Hammer,
  "coming-soon": Clock,
  planned: Compass,
};
