import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const WhatsAppIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.032-5.396 12.035-12.031a11.77 11.77 0 00-3.517-8.482"/>
  </svg>
);

const XIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { href: "https://alvo.chat/63dY", icon: WhatsAppIcon, color: "hover:text-green-600" },
    { href: "https://www.linkedin.com/in/nishant-nishant-835225366/", icon: Linkedin, color: "hover:text-blue-700" },
    { href: "https://www.facebook.com/nishant.nishant.953210", icon: Facebook, color: "hover:text-blue-600" },
    { href: "https://x.com/NishantKan71771?t=dHbxtNx4AvYfofiOr5xv8A&s=09", icon: XIcon, color: "hover:text-slate-900 dark:hover:text-white" },
    { href: "https://www.instagram.com/itz__nishant_kannaujiya143/", icon: Instagram, color: "hover:text-pink-600" },
    { href: "https://www.youtube.com/@Sarkari_Defence/", icon: Youtube, color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://storage.googleapis.com/firebasestorage.googleapis.com/v0/b/gen-lang-client-0275911971.firebasestorage.app/o/logo.png?alt=media" 
                alt="Rankify Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/rankify-logo/48/48";
                }}
              />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Empowering students to master their exams with confidence through high-quality mock tests and real-time analytics.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.href} className={`text-slate-400 ${link.color} transition-colors`}>
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/test-series" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">Test Series</Link></li>
              <li><Link to="/mock-tests" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">Mock Tests</Link></li>
              <li><Link to="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">supportrankify@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">+91 7309902473</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400 text-sm"> Mehdawal Sant Kabir Nagar Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © 2026 Rankify . All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-4">
              <a href="https://alvo.chat/63dY" className="text-slate-400 hover:text-green-600 transition-colors"><WhatsAppIcon className="w-5 h-5" /></a>
              <a href="https://x.com/NishantKan71771?t=dHbxtNx4AvYfofiOr5xv8A&s=09" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><XIcon className="w-5 h-5" /></a>
            </div>
            <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium flex items-center space-x-2">
              <span>Get App on Play Store</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
