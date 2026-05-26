import Link from "next/link";

import Logo from "@/components/parts/logo/Logo";
import app from "@/config/app";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Sign In", href: "/auth/sign-in" },
  { label: "Sign Up", href: "/auth/sign-up" },
];

const FooterHomepage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container-layout px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 typography-small text-muted-foreground">
              {app.description}
            </p>
          </div>

          <div>
            <p className="mb-3 typography-small font-medium uppercase tracking-wide">
              Quick Links
            </p>

            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="typography-small text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-layout py-3">
          <p className="typography-small text-muted-foreground">
            &copy; {currentYear} {app.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterHomepage;
