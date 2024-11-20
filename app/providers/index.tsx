"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@wits/next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
