import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { HTML, CSS } from "@contents/Data";

// Icons
import { IoIosArrowDown, IoMdClose } from "react-icons/io";

// Types
import { LinksProps, NavbarTechProps } from "./index.types";

export default function Navbar_Tech({
  isNavbar,
  setIsNavbar,
}: NavbarTechProps) {
  return (
    <nav
      className={`fixed md:sticky top-0 left-0 w-full md:w-[220px] overflow-auto px-2 py-3 border-r-2 border-white-low-opacity h-screen bg-background-clr/50 backdrop-blur-lg md:translate-x-0 duration-200 z-50 ${
        isNavbar ? "translate-y-0" : "-translate-y-full md:-translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between gap-8">
        <div>
          <Link
            href={"/"}
            onClick={() => setIsNavbar(false)}
            className="text-lg font-black text-font-clr-1"
          >
            AniLearn.dev
          </Link>
          <p className="text-xs">
            Learning something with animation doesn&apos;t get easier than this
          </p>
        </div>
        <motion.div
          className={`p-2 text-xl rounded-full md:hidden bg-red-700 duration-200 z-50`}
          onClick={() => setIsNavbar(false)}
        >
          <IoMdClose />
        </motion.div>
      </div>
      <ul className="mt-4">
        <Links techName="HTML" tech={HTML} />
        <Links techName="CSS" tech={CSS} />
      </ul>
    </nav>
  );
}

export const Links = ({ tech, techName }: LinksProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const router = useRouter();

  return (
    <li className="mt-2">
      <button
        className={`w-full flex items-center justify-between gap-1 px-2 py-1 rounded mb-2 text-font-clr-1 cursor-pointer ${
          open && "bg-white-low-opacity"
        }`}
        onClick={() => setOpen(!open)}
      >
        <span>{techName}</span>
        <IoIosArrowDown
          className={`duration-200 ${open ? "rotate-0" : "-rotate-90"} `}
        />
      </button>
      <div className="px-2">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col overflow-hidden font-light"
              role="links"
            >
              {tech
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((t) => (
                  <Link
                    key={t.id}
                    href={t.link}
                    className={`relative w-full inline-block py-1 px-3 hover:text-font-clr-1 border-l-2 border-white-low-opacity focus:outline-none focus:text-font-clr-1 ${
                      router.asPath == t.link && "text-font-clr-1"
                    }`}
                  >
                    {t.name}
                    {router.asPath == t.link && (
                      <motion.div
                        layoutId="link"
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 left-0 w-[2px] h-full bg-black dark:bg-white"
                      />
                    )}
                  </Link>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};
