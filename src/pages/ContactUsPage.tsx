import React, { useState } from "react";
import SEOHead from "../components/seo/SEOHead";
// import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <>
      <SEOHead
        title="Contact Us - Veintiuno.lat"
        description="Get in touch with Veintiuno.lat. Complete the form below so we can chat about Bitcoin cards, communities, and more."
        keywords={["contacto", "veintiuno", "bitcoin", "tarjetas", "comunidad", "soporte"]}
        url="/contact"
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16">
          <div className="flex justify-center">
            <div style={{ width: '90vw' }} className="px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
              {/* Contact Form - Left Side */}
              <div className="flex-1 max-w-2xl mx-auto">
                <div className="mb-8" data-aos='fade-up' data-aos-delay='100'>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
                    CONTACT US
                  </h1>
                  <p className="text-lg text-gray-700 font-body">
                    Por favor completa la siguiente información para que podamos chatear.
                  </p>
                </div>

                {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2" data-aos='fade-up' data-aos-delay='200'>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-custom-border rounded-lg focus:ring-2 focus:ring-bitcoin focus:border-bitcoin"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2" data-aos='fade-up' data-aos-delay='300'>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-custom-border rounded-lg focus:ring-2 focus:ring-bitcoin focus:border-bitcoin"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2" data-aos='fade-up' data-aos-delay='400'>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-900">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-custom-border rounded-lg focus:ring-2 focus:ring-bitcoin focus:border-bitcoin resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-bitcoin hover:bg-bitcoin text-white font-semibold py-6 px-6 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    data-aos='fade-up'
                    data-aos-delay='500'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <span className="inline-block h-5 w-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Submit Message"
                    )}
                  </Button>
                </form>
                ) : (
                  <div className="space-y-4 p-6 rounded-xl border border-custom-border bg-gray-50" data-aos='fade-up'>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-heading">¡Gracias por contactarnos!</h2>
                    <p className="text-gray-700 font-body">Recibimos tu mensaje y te responderemos lo antes posible.</p>
                    <p className="text-sm text-custom-gray font-body">Si necesitas enviar otro mensaje, actualiza la página.</p>
                  </div>
                )}
              </div>

              {/* Promotional Image - Right Side */}
              <div className="flex-1 max-w-2xl mx-auto" data-aos='fade-up'>
                <div className="relative">
                  <img
                    src="/images/layout-images/contact.png"
                    alt="Veintiuno.lat Cards Collection"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUsPage;
