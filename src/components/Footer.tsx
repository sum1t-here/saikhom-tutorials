import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              SAIKHOM TUTORS is Faculty team of IITians and NITians and other
              highly experienced teachers. The story of our success begins from
              the year 2012, from a very humble beginning to be among the top
              Coaching center in Guwahati for Medical and Engineering Entrance
              exam preparations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-200">
                  T&C
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Study Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Fee Payment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  MOST
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Motion Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  I-MMP
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Amrit Course
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Coaching Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-bold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Study Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Fee Payment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  MOST
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Motion Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  I-MMP
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Amrit Course
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-200">
                  Coaching Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-10 h-5 mt-1" />
                <p>
                  AbhoyArchade, GNBRoad,Chandmari, Gauhati,Assam,
                  IndiaPin-781003
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <p>7002658011</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <p>8761901591</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <p>saikhomtutors@gmail.com</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Follow us on –</h4>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-blue-200">
                  <FiFacebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  <FiTwitter className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  <FiYoutube className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-800 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} All right reserved</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-blue-200">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-200">
                Refund Rules
              </Link>
              <Link href="#" className="hover:text-blue-200">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
