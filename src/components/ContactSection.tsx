import React from "react";
import { sendContactEmail } from "../lib/contactSender";

function buildMailto(params: { to: string; subject: string; body: string }) {
  const subject = encodeURIComponent(params.subject);
  const body = encodeURIComponent(params.body);
  return `mailto:${params.to}?subject=${subject}&body=${body}`;
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const CONTACT_EMAIL = "osomokare@yahoo.com";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  // Honeypot anti-spam: real users never fill this
  const [company, setCompany] = React.useState("");

  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const [touched, setTouched] = React.useState({
    name: false,
    email: false,
    message: false,
  });

  const nameOk = name.trim().length >= 2;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const messageOk = message.trim().length >= 10;
  const formOk = nameOk && emailOk && messageOk;

  const mailtoHref = buildMailto({
    to: CONTACT_EMAIL,
    subject: `Portfolio contact from ${name || "Someone"}`,
    body: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
  });

  function errorText(field: "name" | "email" | "message") {
    if (!touched[field]) return "";
    if (field === "name" && !nameOk)
      return "Please enter your name (2+ characters).";
    if (field === "email" && !emailOk)
      return "Please enter a valid email address.";
    if (field === "message" && !messageOk)
      return "Please write a short message (10+ characters).";
    return "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!formOk || status === "sending") return;

    // Honeypot: if filled, silently succeed (bots)
    if (company.trim()) {
      setStatus("sent");
      return;
    }

    try {
      setStatus("sending");
      setErrorMsg("");

      await sendContactEmail({ name, email, message });

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send message."
      );
    }
  }

  function clearForm() {
    setName("");
    setEmail("");
    setMessage("");
    setCompany("");
    setStatus("idle");
    setErrorMsg("");
    setTouched({ name: false, email: false, message: false });
  }

  return (
    <section id="contact" className="mt-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <p className="mt-2 max-w-2xl text-neutral-300">
              Want to discuss a role, collaboration, or feedback on my projects?
              Send a message here.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <a
              href={buildMailto({
                to: CONTACT_EMAIL,
                subject: "Hello from your portfolio",
                body: "Hi Osomokhare,\n\nI saw your portfolio and wanted to reach out about...\n",
              })}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Email me
            </a>
            <a
              href="#"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              LinkedIn (placeholder)
            </a>
            <a
              href="#"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              GitHub (placeholder)
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label>Company</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-sm text-neutral-200">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none ring-0 placeholder:text-neutral-500 focus:border-white/25"
              placeholder="Your name"
            />
            {errorText("name") ? (
              <p className="mt-2 text-xs text-red-200">{errorText("name")}</p>
            ) : null}
          </div>

          <div className="md:col-span-1">
            <label className="text-sm text-neutral-200">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none ring-0 placeholder:text-neutral-500 focus:border-white/25"
              placeholder="you@example.com"
            />
            {errorText("email") ? (
              <p className="mt-2 text-xs text-red-200">{errorText("email")}</p>
            ) : null}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-neutral-200">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              rows={6}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-neutral-500 focus:border-white/25"
              placeholder="Tell me what you're looking for…"
            />
            {errorText("message") ? (
              <p className="mt-2 text-xs text-red-200">
                {errorText("message")}
              </p>
            ) : (
              <p className="mt-2 text-xs text-neutral-400">
                Tip: mention role, company, and what caught your eye.
              </p>
            )}
          </div>

          {/* Status banners */}
          <div className="md:col-span-2">
            {status === "sent" ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white">
                ✅ Message sent. I’ll get back to you soon.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white">
                ❌ {errorMsg || "Something went wrong. Please try again."}{" "}
                <span className="text-neutral-300">
                  If this keeps failing, you can{" "}
                  <a className="underline" href={mailtoHref}>
                    email me directly
                  </a>
                  .
                </span>
              </div>
            ) : null}
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-400">
              {status === "sending"
                ? "Sending message…"
                : "Messages are sent directly (EmailJS). If it fails, use the Email link."}
            </p>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!formOk || status === "sending"}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  !formOk || status === "sending"
                    ? "bg-white/30 text-neutral-700 cursor-not-allowed"
                    : "bg-white text-neutral-900 hover:translate-y-[-1px]"
                }`}
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
