import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { useMessages } from "../i18n/localeStore";
import { CONTACT_API_URL } from "../config";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Cualquier letra Unicode: "José", "Muñoz" o "Zoë" deben pasar la validación.
const LETTERS_AND_SPACES = /^[\p{L}\s]+$/u;

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const t = useMessages().modal;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return t.errors.nameRequired;
        if (!LETTERS_AND_SPACES.test(value)) return t.errors.nameLetters;
        if (value.length > 20) return t.errors.nameMax;
        break;

      case "email":
        if (!value.trim()) return t.errors.emailRequired;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t.errors.emailInvalid;
        break;

      case "subject":
        if (!value.trim()) return t.errors.subjectRequired;
        if (!LETTERS_AND_SPACES.test(value)) return t.errors.subjectLetters;
        if (value.length > 40) return t.errors.subjectMax;
        break;

      case "message":
        if (!value.trim()) return t.errors.messageRequired;
        if (value.length > 200) return t.errors.messageMax;
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");

        setTimeout(() => {
          setFormData({ name: "", email: "", subject: "", message: "" });
          setErrors({});
          setSubmitStatus(null);
          onClose();
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold">{t.title}</h3>
          <button onClick={onClose} aria-label={t.close} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg focus:outline-none transition-colors text-white ${
                  errors.name ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-amber-500"
                }`}
                placeholder={t.namePlaceholder}
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg focus:outline-none transition-colors text-white ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-amber-500"
                }`}
                placeholder={t.emailPlaceholder}
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
              {t.subject}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-800 border rounded-lg focus:outline-none transition-colors text-white ${
                errors.subject ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-amber-500"
              }`}
              placeholder={t.subjectPlaceholder}
            />
            {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              {t.message} ({formData.message.length}/200)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 bg-slate-800 border rounded-lg focus:outline-none transition-colors text-white resize-none ${
                errors.message ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-amber-500"
              }`}
              placeholder={t.messagePlaceholder}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
          </div>

          {submitStatus === "success" && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400 text-center">
              {t.success}
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400 text-center">
              {t.failure}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                {t.sending}
              </>
            ) : (
              <>
                <Send size={20} />
                {t.submit}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
