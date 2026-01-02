import emailjs from "@emailjs/browser";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(payload: ContactPayload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS env vars are missing.");
  }

  // Map to your EmailJS template variables
  const templateParams = {
    from_name: payload.name,
    reply_to: payload.email,
    message: payload.message,
  };

  await emailjs.send(serviceId, templateId, templateParams, { publicKey });
}
