import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-12 px-4 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Reach Us At –</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-800 mt-1" />
                <p className="text-lg">
                  Abhoy Archade, GNB Road, Chandmari, Guwahati, Assam, India
                  <br />
                  Pin - 781003
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-800" />
                <p className="text-lg">7002658011</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-800" />
                <p className="text-lg">8761901591</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-800" />
                <p className="text-lg">saikhomtutors@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.3979256524053!2d91.77126701092791!3d26.18373077699357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59a2aa6d5e5f%3A0x997ac1c9cce3c79d!2sSaikhom%20Tutors!5e0!3m2!1sen!2sin!4v1735054904517!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
