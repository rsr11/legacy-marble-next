import React from "react";
import Logo from "./Logo";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black font-nippo text-gray-300 px-6 md:px-16 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo + About */}
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-6">
            We provide high-quality products and services with a focus on user
            experience and performance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer"><Link  href={"/"}>Home</Link></li>
            <li className="hover:text-white cursor-pointer"><Link href={"/products/diya"} >Products</Link></li>
            <li className="hover:text-white cursor-pointer"><Link href={"#team-section"}>Team</Link></li>
            <li className="hover:text-white cursor-pointer"><Link href="/">Sitemap</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Legal
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
            <Link href={'/privacy-policy'} className="hover:text-white cursor-pointer">
              Privacy Policy
            </Link>
            </li>
            <li>
            <Link href={'/terms-condition'} className="hover:text-white cursor-pointer">
              Terms & Conditions
            </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Contact Us
          </h3>
          <p className="text-sm">Email: Legacymarble3@gmail.com</p>
          <p className="text-sm">Phone: +91 8949241616</p>
          <address className="text-sm" > Address : Ward No 7, byPass Road, Makrana, Rajasthan, 341505, India </address>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://www.instagram.com/legacy_marble/" target="_blank"><FaInstagram className="hover:text-white cursor-pointer" /></a>
            <a href="https://wa.me/918949241616" target="_blank"><FaWhatsapp className="hover:text-white cursor-pointer" /></a>
            <a href=""><BiLogoGmail className="hover:text-white cursor-pointer" /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom */}
      <div className="text-center text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
  