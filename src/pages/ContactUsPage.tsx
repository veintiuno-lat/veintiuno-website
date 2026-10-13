import React, { useState } from "react";
import SEOHead from "../components/seo/SEOHead";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "../components/motion";

const labelClass = "text-xs font-semibold uppercase tracking-[0.18em] text-gray-400";
const fieldClass = "h-12 px-4 text-base";

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
        title="Contacto · Veintiuno"
        description="Hablemos. Escribinos para sumarte a la cruzada bitcoiner, proponer una comunidad o coordinar un meetup en Latinoamérica."
        keywords={["contacto", "veintiuno", "bitcoin", "tarjetas", "comunidad", "soporte"]}
        url="/contact"
        type="website"
      />

      <section className="relative isolate overflow-hidden px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
        <div aria-hidden="true" className="absolute -top-40 left-1/4 -z-10 h-[32rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.12),transparent)]" />
        <div
          aria-hidden="true"
          className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,black,transparent_75%)]"
        />

        <div className="mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact form */}
          <div>
            <Reveal>
              <div className="eyebrow mb-6">Contacto</div>
              <h1 className="display text-6xl text-white md:text-8xl">
                <span className="text-gradient">Hablemos</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">
                Por favor completá la siguiente información para que podamos chatear.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="surface mt-10 p-6 md:p-8">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={labelClass}>Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={fieldClass}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className={labelClass}>E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="ejemplo@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={fieldClass}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className={labelClass}>Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Contanos en qué andás"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`${fieldClass} h-auto resize-none py-3`}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-md btn-primary w-full !text-ink-950" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-ink-950/70 border-t-transparent" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4" role="status">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bitcoin/30 bg-bitcoin/10 text-bitcoin">
                      <Check className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white md:text-3xl">¡Gracias por contactarnos!</h2>
                    <p className="text-gray-300">Recibimos tu mensaje y te responderemos lo antes posible.</p>
                    <p className="text-sm text-gray-500">Si necesitás enviar otro mensaje, actualizá la página.</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Promotional image */}
          <Reveal direction="left" delay={0.2}>
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.2),transparent)]" />
              <img
                src="/images/layout-images/contact.png"
                alt="Veintiuno.lat Cards Collection"
                decoding="async"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;
