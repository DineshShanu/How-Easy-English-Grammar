import React, { useEffect, useState } from "react";
import { Button, Card, Input, SecondaryButton } from "../components/ui";
import { useAppState } from "../state/AppState";

export default function ContactUs() {
  const { language } = useAppState();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleEmailChange = (value: string) => {
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, message: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.message) {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="grid gap-6">
      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT SIDE - Photo & Contact Info */}
        <Card className="p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-white/10">
          <div className="grid gap-8">
            {/* Photo Section */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Gradient Ring Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-full blur-xl"></div>

                {/* Photo Container */}
                <div className="relative w-32 h-32 rounded-full border-4 border-white/40 overflow-hidden shadow-2xl shadow-black/30">
                  <img
                    src="/photos/Dp.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="grid gap-3 text-center">
              <h1 className="text-3xl font-black tracking-tight">
                {language === "en" ? "Have Any Questions?" : "कोई सवाल है?"}
              </h1>
              <p className="text-sm text-white/90">
                {language === "en"
                  ? "Send me a message and I'll respond as soon as possible."
                  : "मुझे एक संदेश भेजें और मैं जल्द ही जवाब दूंगा।"}
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid gap-4">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <p className="text-sm font-semibold text-white/90">
                    {language === "en" ? "Phone" : "फोन"}
                  </p>
                  <a
                    href="tel:7488326935"
                    className="text-base font-semibold text-white hover:text-white/80 transition"
                  >
                    7488326935
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="text-2xl">💬</div>
                <div>
                  <p className="text-sm font-semibold text-white/90">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/8686357347"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-white hover:text-white/80 transition"
                  >
                    8686357347
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <p className="text-sm font-semibold text-white/90">
                    {language === "en" ? "Email" : "ईमेल"}
                  </p>
                  <a
                    href="mailto:dineshkumar9890@gmail.com"
                    className="text-base font-semibold text-white hover:text-white/80 transition break-all"
                  >
                    dineshkumar9890@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* RIGHT SIDE - Contact Form */}
        <Card className="p-8">
          {submitted && (
            <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-400 rounded-lg text-emerald-900 dark:text-emerald-100 font-semibold text-sm">
              {language === "en"
                ? "✅ Thank you! Your message has been sent successfully."
                : "✅ धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।"}
            </div>
          )}

          <div className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
            {language === "en" ? "Send a Message" : "संदेश भेजें"}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input
              label={language === "en" ? "Name" : "नाम"}
              value={formData.name}
              onChange={handleNameChange}
              placeholder={language === "en" ? "John Doe" : "आपका नाम"}
            />

            <Input
              label={`${language === "en" ? "Email" : "ईमेल"} *`}
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder={
                language === "en" ? "your@email.com" : "आपका@ईमेल.कॉम"
              }
            />

            <Input
              label={language === "en" ? "Phone" : "फोन"}
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder={
                language === "en" ? "+91 9999999999" : "+91 9999999999"
              }
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {language === "en" ? "Message" : "संदेश"}{" "}
                <span className="text-rose-600">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={handleMessageChange}
                placeholder={
                  language === "en"
                    ? "Write your message here..."
                    : "अपना संदेश यहाँ लिखें..."
                }
                rows={6}
                className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-white/80 text-slate-900 dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="submit">
                {language === "en" ? "Send Message" : "संदेश भेजें"}
              </Button>
              <SecondaryButton type="button" onClick={handleClear}>
                {language === "en" ? "Clear" : "साफ़ करें"}
              </SecondaryButton>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
