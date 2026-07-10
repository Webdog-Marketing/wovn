"use client";

import { useState, type FormEvent } from "react";

const GARMENT_TYPES = [
  "Sports jersey",
  "Training kit",
  "Cotton tees",
  "Hoodies",
  "Other",
];

export default function EnquirePage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [selectedGarments, setSelectedGarments] = useState<string[]>([]);

  function toggleGarment(type: string) {
    setSelectedGarments((prev) =>
      prev.includes(type) ? prev.filter((g) => g !== type) : [...prev, type]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    const payload = {
      organisationName: form.get("organisationName"),
      organisationType: form.get("organisationType"),
      contactName: form.get("contactName"),
      email: form.get("email"),
      phone: form.get("phone"),
      country: form.get("country"),
      garmentTypes: selectedGarments,
      hasLogo: form.get("hasLogo"),
      styleNotes: form.get("styleNotes"),
      storyNotes: form.get("storyNotes"),
      timeline: form.get("timeline"),
      budgetRange: form.get("budgetRange"),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl uppercase tracking-wide text-ink">
          Thanks — we&apos;ve got it
        </h1>
        <p className="mt-4 text-muted">
          We&apos;ll be in touch about your project soon.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl uppercase tracking-wide text-ink">
        Start a project
      </h1>
      <p className="mt-4 text-muted">
        Tell us about your organisation and what you need. We&apos;ll come
        back with a bespoke proposal.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <fieldset className="space-y-4">
          <legend className="font-tag text-xs uppercase tracking-tag text-thread">
            Who you are
          </legend>
          <Field label="Organisation name" name="organisationName" required />
          <SelectField
            label="Organisation type"
            name="organisationType"
            required
            options={["Club", "Business", "Charity", "Federation"]}
          />
          <Field label="Contact name" name="contactName" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" />
          <Field label="Country" name="country" />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-tag text-xs uppercase tracking-tag text-thread">
            What you need
          </legend>

          <div>
            <p className="mb-2 text-sm text-muted">Garment types</p>
            <div className="flex flex-wrap gap-2">
              {GARMENT_TYPES.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => toggleGarment(type)}
                  className={`border px-3 py-1.5 text-sm ${
                    selectedGarments.includes(type)
                      ? "border-thread bg-thread text-ink"
                      : "border-border text-muted hover:text-ink"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <SelectField
            label="Do you already have a logo and brand guidelines?"
            name="hasLogo"
            options={["Yes, fully developed", "Yes, but needs work", "No, starting from scratch"]}
          />

          <TextAreaField
            label="Any style references or inspiration?"
            name="styleNotes"
          />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-tag text-xs uppercase tracking-tag text-thread">
            Project context
          </legend>
          <TextAreaField
            label="What's the story behind your organisation?"
            name="storyNotes"
          />
          <SelectField
            label="Timeline"
            name="timeline"
            options={["Within a month", "1–3 months", "3–6 months", "No fixed date"]}
          />
          <SelectField
            label="Budget range"
            name="budgetRange"
            options={["Under £500", "£500–£2,000", "£2,000–£5,000", "£5,000+", "Not sure yet"]}
          />
        </fieldset>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="border border-thread px-6 py-3 font-tag text-xs uppercase tracking-tag text-thread hover:bg-thread hover:text-ink"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-border bg-surface px-3 py-2 text-ink outline-none focus:border-thread"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-muted">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border border-border bg-surface px-3 py-2 text-ink outline-none focus:border-thread"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-muted">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="w-full border border-border bg-surface px-3 py-2 text-ink outline-none focus:border-thread"
      />
    </label>
  );
}
