import React, { useRef, FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { useContactStore } from "../store/contactStore";
import emailjs from "@emailjs/browser";

const ContactModal: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, isSuccess, isLoading, closeModal, setSuccess, setLoading } = useContactStore();
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const form = formRef.current;

    if (!form) return false;

    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const message = form.message.value.trim();

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!validateForm()) return;

    setLoading(true);
    try {
      await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current, "YOUR_PUBLIC_KEY");
      setSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={closeModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed md:left-3/10 md:top-1/4 left-0.5/10 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-[500px] max-h-[90vh] 
                     bg-gray-800 rounded-lg shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Contact Me</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.name ? "border-red-500" : "border-gray-600"
                      }`}
                      onChange={() => {
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.email ? "border-red-500" : "border-gray-600"
                      }`}
                      onChange={() => {
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.message ? "border-red-500" : "border-gray-600"
                      }`}
                      onChange={() => {
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
