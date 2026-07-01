"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const DocsToc = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: use pathname
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]"),
    );

    const tocItems: TocItem[] = headings.map((el) => ({
      id: el.id,
      text: el.innerText.split("\n")[0].trim() ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));

    setItems(tocItems);
    if (tocItems.length > 0) setActiveId(tocItems[0].id);
  }, [pathname]);

  // Highlight active heading on scroll via IntersectionObserver
  useEffect(() => {
    if (items.length === 0) return;

    observerRef.current?.disconnect();

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-(--safe-scroll-margin) w-56 px-5 hidden md:block self-start typography-small">
      <p className="text-foreground mb-3 font-semibold">On this page</p>

      <nav aria-label="Table of contents">
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                title={item.text}
                className={cn(
                  "block transition-colors duration-150 line-clamp-1",
                  item.level === 3 && "pl-3.5",
                  activeId === item.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DocsToc;
