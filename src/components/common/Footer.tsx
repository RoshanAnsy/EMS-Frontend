import React from "react";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react"; // Importing social icons
import FullLogo from "../../../public/KH-Full-Logo-H-Light.svg"

const Footer = () => {
  return (
    <Card className=" w-full  py-8 px-6 bg-custom   text-neutral-50">
      <div className=" flex flex-row justify-between gap-8 max-w-6xl mx-auto p-8">
        {/* Brand Section */}
        <div className="flex flex-col items-start mx-4 gap-4 p-8">
          <Image src={FullLogo} alt="Knowledge Hub Logo"   />
          <div className="flex space-x-4">
            <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-500" />
            <Twitter className="w-6 h-6 cursor-pointer hover:text-blue-400" />
            <Linkedin className="w-6 h-6 cursor-pointer hover:text-blue-600" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>support@knowledgehub.com</span>
          </p>
          <p className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>+91 98765 43210</span>
          </p>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">About Us</h2>
          <p className="cursor-pointer hover:underline">Our Mission</p>
          <p className="cursor-pointer hover:underline">Our Team</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
        © 2025 Knowledge Base. All rights reserved.
      </div>
    </Card>
  );
};

export default Footer;

