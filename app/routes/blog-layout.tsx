import { Link, Outlet, useLocation } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function BlogLayout() {
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  const [activeSection, setActiveSection] = useState("");

  const titles: Record<string, string> = {
    "mdx-showcase": "mdx showcase",
  };

  const dates: Record<string, string> = {
    "mdx-showcase": "January 28, 2026",
  };

  const title = slug ? titles[slug] : "";
  const date = slug ? dates[slug] : "";
  const nameLetters = Array.from("giuliano");
  const nameEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const nameContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const nameLetter = {
    hidden: { opacity: 0, y: 4, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: nameEasing },
    },
  };

  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const headingData = elements.map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: el.textContent || "",
    }));

    elements.forEach((el, index) => {
      if (!el.id) {
        el.id = headingData[index].id;
      }
    });

    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-mono">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start pointer-events-none w-full">
        <div className="pt-6 h-full flex items-center px-6 space-x-3 pointer-events-auto w-full pb-4 backdrop-blur-md bg-black/40">
          <Link
            to="/"
            state={{ fromBlog: true }}
            className="group flex items-center gap-2"
          >
            <motion.span
              aria-label="giuliano"
              variants={nameContainer}
              initial="hidden"
              animate="show"
              className="text-xs text-cyan-200 font-bold shimmer-text inline-flex"
            >
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  variants={nameLetter}
                  aria-hidden="true"
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </Link>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="absolute bottom-0 left-0 h-px bg-neutral-800"
          />
        </div>
      </header>

      <div className="max-w-6xl mx-auto pt-32 px-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
        <aside className="hidden lg:block sticky top-32 self-start space-y-8">
          <div className="space-y-4 text-xs text-neutral-500">
            {headings.length > 0 &&
              headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={clsx(
                    "flex items-center space-x-2 transition-colors duration-200",
                    activeSection === heading.id
                      ? "text-white"
                      : "hover:text-neutral-300",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(heading.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div
                    className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      activeSection === heading.id
                        ? "bg-white"
                        : "border border-neutral-700",
                    )}
                  ></div>
                  <span>{heading.text.toLowerCase()}</span>
                </a>
              ))}
          </div>
        </aside>

        <main className="max-w-2xl">
          <div className="mb-12">
            {slug && (
              <motion.h1
                layoutId={`post-title-${slug}`}
                layout
                transition={{
                  layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  fontSize: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  fontWeight: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                }}
                className="text-white mb-4 leading-tight"
                style={{ fontSize: "2.25rem", fontWeight: 700 }}
              >
                {title}
              </motion.h1>
            )}
            {date ? <p className="text-neutral-500 text-sm">{date}</p> : null}
          </div>

          <div className="prose prose-invert prose-neutral prose-p:text-neutral-300 prose-headings:text-white prose-a:text-white hover:prose-a:underline prose-pre:bg-neutral-900/50 prose-pre:border prose-pre:border-neutral-800">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
