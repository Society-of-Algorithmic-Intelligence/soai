import type { ReactNode } from "react";

const LAST_UPDATED = "25 November 2026";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-[#003d7b] via-[#002a57] to-[#001a35] py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#ffcf8c]">Legal</p>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-white/75">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl space-y-8 px-6 text-gray-800 leading-relaxed">
          <p>
            The Society of Algorithmic Intelligence (“SoAI”, “we”, “us”) is committed to protecting
            the personal information you share with us. This policy explains what we collect when
            you use our website, apply for a role, or contact us, and how we use, disclose, and
            retain that information.
          </p>

          <Section title="Information we collect">
            <p>Depending on how you interact with us, we may collect:</p>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>
                <strong>Identity and contact details</strong> such as your name, preferred name,
                email address, phone number, country, and LinkedIn profile.
              </li>
              <li>
                <strong>Application information</strong> such as your CV, cover letter, education
                history, current employer, research experience, pronouns, and how you heard about
                SoAI.
              </li>
              <li>
                <strong>Eligibility information</strong> such as your work authorization status,
                whether you require sponsorship, and any visa details you choose to provide.
              </li>
              <li>
                <strong>Communications</strong> you send to us, including enquiries and application
                correspondence.
              </li>
              <li>
                <strong>Technical information</strong> such as basic server logs generated when you
                visit the site. We do not use advertising cookies.
              </li>
            </ul>
          </Section>

          <Section title="How we use your information">
            <p>We use personal information to:</p>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>Assess and manage job applications and recruitment.</li>
              <li>Communicate with you about your application, a role, or your enquiry.</li>
              <li>Operate, maintain, and improve the SoAI website and services.</li>
              <li>Meet legal, regulatory, and internal record-keeping obligations.</li>
            </ul>
            <p>
              Where required, we rely on your consent, which you provide by submitting an
              application and agreeing to this policy. You may withdraw consent at any time by
              contacting us.
            </p>
          </Section>

          <Section title="Disclosure">
            <p>
              We do not sell personal information. We may share information with service providers
              that help us operate our website and communications (for example, cloud hosting,
              database, and email delivery providers), with the hiring team and authorised SoAI
              personnel, and where required by law. Service providers are expected to protect the
              information they handle and to use it only for the services they provide to us.
            </p>
          </Section>

          <Section title="Retention">
            <p>
              We retain application information for as long as needed to evaluate and manage your
              application and for a reasonable period afterwards for record-keeping and to contact
              you about future opportunities, unless you ask us to delete it or a longer period is
              required by law. Website logs are retained only for operational and security
              purposes.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We use reasonable technical and organisational measures to protect personal
              information against unauthorised access, loss, misuse, or alteration. No method of
              transmission or storage is completely secure, so we cannot guarantee absolute
              security.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Subject to applicable law, you may request access to, correction of, or deletion of
              your personal information, object to or restrict certain processing, or withdraw your
              consent. To exercise these rights, contact us at{" "}
              <a
                href="mailto:info@soc-ai.org"
                className="font-medium text-[#003d7b] hover:underline"
              >
                info@soc-ai.org
              </a>
              . We may need to verify your identity before responding.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. The updated version will be posted on
              this page with a new “last updated” date.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy or SoAI’s handling of personal information can be sent
              to{" "}
              <a
                href="mailto:info@soc-ai.org"
                className="font-medium text-[#003d7b] hover:underline"
              >
                info@soc-ai.org
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </div>
  );
}
