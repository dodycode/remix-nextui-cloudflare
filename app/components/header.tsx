import React from "react";
import { Navbar, NavbarBrand, NavbarContent, Switch } from "@nextui-org/react";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { getTheme, toggleTheme } from "~/lib/theme-switcher";

const ThemeSwitcher = () => {
  const theme = getTheme();

  if (typeof document === "undefined") return null;

  return (
    <Switch
      defaultSelected={theme === "light"}
      onChange={() => toggleTheme()}
      aria-label="Toggle theme"
      size="lg"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
  );
};

export default function Header() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold">REMIX NEXTUI VITE</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
