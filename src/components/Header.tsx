// src/components/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Вспомогательный компонент для элементов выпадающего списка
// Эта версия использует next/link для быстрой навигации без перезагрузки
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


export function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLocaleChange = () => {
    const newLocale = locale === "kk" ? "ru" : "kk";
    
    return newLocale;
  };
  const aboutComponents = [
    { title: t('about_concept'), href: `/${locale}/about/concept`, description: "Наша философия и подход к озеленению."},
    { title: t('about_info'), href: `/${locale}/about`, description: "История, команда и достижения компании."},
    { title: t('about_social'), href: `/${locale}/about/social-life`, description: "Наш вклад в жизнь города и общества."},
  ];
  const isHomePage = pathname === `/${locale}`;
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out",
        isScrolled ? "bg-green-700/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={`/${locale}`} className={cn("font-bold text-xl", isHomePage ? "text-white" : "text-gray-900", isScrolled && "text-white")}>
          {t('name')}
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu>
            
            <NavigationMenuList>
              <LanguageSwitcher />
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('about')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {aboutComponents.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

             
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={`/${locale}/procurement`}>{t('procurement')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={`/${locale}/services`}>{t('services')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={`/${locale}/anti-corruption`}>{t('compliance')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={`/${locale}/news`}>{t('news')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={`/${locale}/contacts`}>{t('contacts')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}