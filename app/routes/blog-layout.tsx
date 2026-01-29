import { Link, Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

const titleEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const letterVariants = {
  hidden: { opacity: 0, y: 4, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: titleEasing },
  },
  exit: {
    opacity: 0,
    y: -4,
    filter: "blur(6px)",
    transition: { duration: 0.3, ease: titleEasing },
  },
};

const titleContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

export default function BlogLayout() {
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  const titles: Record<string, string> = {
    "mdx-showcase": "mdx showcase",
  };

  const dates: Record<string, string> = {
    "mdx-showcase": "January 28, 2026",
  };

  const title = slug ? titles[slug] : "";
  const titleLetters = Array.from(title);
  const date = slug ? dates[slug] : "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen bg-black font-mono text-neutral-200">
      <header className="group/header pointer-events-none fixed top-0 right-0 left-0 z-50 flex w-full items-start justify-between">
        <div className="pointer-events-auto flex h-12 w-full items-center space-x-3 bg-black/40 px-6 pt-4 pb-3 backdrop-blur-md">
          <Link
            to="/"
            state={{ fromBlog: true }}
            className="flex h-full items-center gap-2"
          >
            <span
              aria-label="giuliano"
              className="inline-flex text-xs font-bold text-cyan-200 group-hover/header:shimmer-text"
            >
              giuliano
            </span>
          </Link>

          <AnimatePresence mode="wait">
            {slug && isScrolled && (
              <motion.div
                key="header-title"
                variants={titleContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative z-60 flex h-full items-center overflow-hidden whitespace-nowrap text-neutral-500 cursor-pointer"
                style={{ fontSize: "0.75rem", fontWeight: 700 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="mr-1">/</span>
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    variants={letterVariants}
                    aria-hidden="true"
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-neutral-700/80" />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-32 lg:grid-cols-[200px_1fr]">
        <aside className="sticky top-32 hidden space-y-8 self-start lg:block">
          <div className="space-y-4 text-xs text-neutral-500">
            {headings.map((heading) => (
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
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
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
            <div className="mb-4 h-9 overflow-visible">
              <AnimatePresence mode="wait">
                {slug && !isScrolled && (
                  <motion.h1
                    key="main-title"
                    variants={titleContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="relative z-60 flex flex-wrap text-white leading-tight"
                    style={{ fontSize: "2.25rem", fontWeight: 700 }}
                  >
                    {titleLetters.map((letter, index) => (
                      <motion.span
                        key={`${letter}-${index}`}
                        variants={letterVariants}
                        aria-hidden="true"
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
            {slug && !isScrolled && (
              <noscript>
                <h1
                  className="relative z-60 flex flex-wrap text-white leading-tight"
                  style={{ fontSize: "2.25rem", fontWeight: 700 }}
                >
                  {title}
                </h1>
              </noscript>
            )}
            {date ? <p className="text-neutral-500 text-sm">{date}</p> : null}
          </div>

          <div className="prose prose-invert prose-neutral prose-p:text-neutral-300 prose-headings:text-white prose-a:text-white hover:prose-a:underline prose-pre:border prose-pre:border-neutral-800 prose-pre:bg-neutral-900/50">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
