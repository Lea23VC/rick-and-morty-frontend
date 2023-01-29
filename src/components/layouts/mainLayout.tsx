import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { AnimatePresence } from "framer-motion";
import MainTitle from "../home/mainTitle";

const Header = dynamic(() => import("../header/header"), {
  suspense: true,
});

type layoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: layoutProps) {
  const router = useRouter();
  return (
    <Box className="bg-main bg-contain">
      <Header />

      <main className="min-h-screen max-w-screen-lg m-auto">
        <Box className="py-32">
          <MainTitle />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.route}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      </main>
    </Box>
  );
}
