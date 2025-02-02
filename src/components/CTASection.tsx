"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiCheckCircle, FiFolder, FiList, FiLayout } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="py-20 px-4 md:px-[5vw]">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-[60%_40%] gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Ready to Elevate Your Project Management?
          </motion.h1>

          <p className="text-lg text-gray-600 lg:pr-20">
            Join thousands of professionals using ProjectHubify to streamline
            their workflow. Get started in just a few clicks!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/signup"
              className="bg-rose-600 border-2 border-rose-600 transition-all transform hover:scale-105 outline-none py-2 px-5 font-bold rounded text-white flex items-center gap-2 max-w-max "
            >
              Sign Up Now
            </Link>
            <button className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-lg font-semibold hover:bg-rose-50 transition-all transform hover:scale-105">
              Start Managing Projects
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mx-auto lg:mx-0"
        >
          <Image
            src="/mobile.png"
            height={3000}
            width={3000}
            alt="mobile"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
