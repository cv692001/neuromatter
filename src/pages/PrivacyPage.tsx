import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
        <section className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="container-custom max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm mb-10">
              Last updated: June 2026
            </p>

            <div className="space-y-8 text-base leading-relaxed text-foreground/80">
              <p>
                Neuromatter Group ("we", "us", "our") respects your privacy. This
                Privacy Policy explains what information we collect, how we use it,
                and the choices you have when you use our website and services.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  1. Information We Collect
                </h2>
                <p>
                  We collect information you provide directly to us, such as your
                  name, email address, and phone number when you join our waitlist
                  or contact us. We may also collect limited technical data (such as
                  browser type and pages visited) to help us improve the experience.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  2. How We Use Your Information
                </h2>
                <p>
                  We use the information to respond to your enquiries, provide and
                  improve our services, send you relevant updates, and meet legal or
                  regulatory obligations. We do not sell your personal information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  3. Sharing of Information
                </h2>
                <p>
                  We may share information with trusted service providers who help us
                  operate our website and services, and only to the extent necessary.
                  These providers are required to protect your information and may not
                  use it for any other purpose.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  4. Data Security & Retention
                </h2>
                <p>
                  We take reasonable measures to protect your information against
                  unauthorised access, loss, or misuse, and retain it only for as long
                  as needed to fulfil the purposes described in this policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  5. Your Rights
                </h2>
                <p>
                  You may request access to, correction of, or deletion of your
                  personal information. To exercise these rights, please contact us at{" "}
                  <a
                    href="mailto:Contact@neuromatter.com"
                    className="text-primary underline underline-offset-4"
                  >
                    Contact@neuromatter.com
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  6. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, reach out to us
                  at{" "}
                  <a
                    href="mailto:Contact@neuromatter.com"
                    className="text-primary underline underline-offset-4"
                  >
                    Contact@neuromatter.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPage;
