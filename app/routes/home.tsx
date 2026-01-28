import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";

const projects = [
  {
    name: "lawcore",
    description: "AI that helps lawyers in Brazil streamline their workflow.",
    url: "https://lawcore.com.br",
    icon: "⚖️",
  },
  {
    name: "website",
    description: "personal website and blog built with react router, mdx, and recharts.",
    url: "https://github.com/giulianoo0/website",
    icon: "🖥️",
  },
];

const posts = [
  {
    slug: "mdx-showcase",
    title: "mdx showcase",
    date: "January 28, 2026",
  },
];

export function meta() {
  return [
    { title: "giuliano" },
    { name: "description", content: "giuliano's personal website" },
  ];
}

export default function Home() {
  const location = useLocation();
  const fromBlog = Boolean(location.state?.fromBlog);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-8 relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-24 relative z-10">
        <div className="flex flex-col space-y-12">
          <div className="block h-[1.2em]">
            <motion.span
              initial={fromBlog ? { opacity: 0, filter: "blur(8px)" } : false}
              animate={fromBlog ? { opacity: 1, filter: "blur(0px)" } : false}
              transition={
                fromBlog
                  ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  : undefined
              }
              className="text-cyan-200 font-bold shimmer-text"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
            >
              giuliano
            </motion.span>
          </div>

          <div>
            <div className="flex space-x-4 text-sm text-neutral-500 font-medium mb-12 mt-4">
              <a
                href="https://x.com/giulian0x6f"
                className="hover:text-white transition-colors"
              >
                X
              </a>
              <a
                href="https://github.com/giulianoo0"
                className="hover:text-white transition-colors"
              >
                github
              </a>
            </div>

            <div className="space-y-8">
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block group"
                >
                  <div className="flex items-baseline space-x-3">
                    <span className="text-xl">{project.icon}</span>
                    <div>
                      <h3 className="text-white font-medium flex items-center text-lg">
                        {project.name}
                        <span className="ml-1 text-neutral-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          ↗
                        </span>
                      </h3>
                      <p className="text-neutral-500 text-sm mt-1 max-w-md leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="hidden md:block space-y-2 text-sm text-neutral-600 border-t border-neutral-900 pt-8 mt-12">
              <p className="text-neutral-500">from Recife, Pernambuco, Brazil 🇧🇷</p>
              <p>
                contact me at{" "}
                <a
                  href="mailto:giuliano@netc.fr"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  giuliano@netc.fr
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-12 space-y-8">
          <h2 className="text-neutral-600 text-sm font-medium mb-6">writing</h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="space-y-1">
                  <motion.h3
                    layoutId={`post-title-${post.slug}`}
                    layout
                    transition={{
                      layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                      fontSize: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                      fontWeight: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    }}
                    className="text-neutral-300 font-medium group-hover:text-cyan-200 transition-colors"
                    style={{ fontSize: "1rem", fontWeight: 500 }}
                  >
                    {post.title}
                  </motion.h3>
                  <p className="text-neutral-600 text-xs">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="md:hidden space-y-2 text-sm text-neutral-600 border-t border-neutral-900 pt-6">
            <p className="text-neutral-500">from Recife, Pernambuco, Brazil 🇧🇷</p>
            <p>
              contact me at{" "}
              <a
                href="mailto:giuliano@netc.fr"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                giuliano@netc.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
