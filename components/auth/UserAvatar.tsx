"use client";

import type { User } from "firebase/auth";
import { cn } from "@/lib/cn";

function initialsFromUser(user: User): string {
  const name = user.displayName?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  const email = user.email?.trim();
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "?";
}

type UserAvatarProps = {
  user: User;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function UserAvatar({ user, className, size = "md" }: UserAvatarProps) {
  const sizeCls =
    size === "sm"
      ? "h-8 w-8 text-[11px]"
      : size === "lg"
        ? "h-10 w-10 text-sm sm:h-11 sm:w-11"
        : "h-9 w-9 text-sm";
  const initial = initialsFromUser(user);

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt=""
        className={cn("rounded-full object-cover ring-2 ring-white/15", sizeCls, className)}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-teal-600/25 font-semibold text-teal-50 ring-2 ring-white/15",
        sizeCls,
        className,
      )}
      aria-hidden
    >
      {initial}
    </span>
  );
}
