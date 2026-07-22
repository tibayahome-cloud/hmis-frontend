"use client";

import { motion } from "framer-motion";
import Icon from "@/components/Icon";

type UnderConstructionProps = {
  title: string;
  description?: string;
  icon?: string;
};

export default function UnderConstruction({
  title,
  description = "This feature is coming soon.",
  icon = "construction",
}: UnderConstructionProps) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-75 text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4"
      >
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light-primary"
          style={{ width: 80, height: 80 }}
        >
          <Icon name={icon} size={40} />
        </div>
      </motion.div>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-muted mb-4"
        style={{ maxWidth: "420px", lineHeight: 1.6 }}
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="d-flex align-items-center gap-2 text-muted small">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span>Preparing this workspace…</span>
        </div>
      </motion.div>
    </div>
  );
}
