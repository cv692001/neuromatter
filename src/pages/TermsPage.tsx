import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/use-seo";
import { PAGE_SEO } from "@/lib/site-config";

const TermsPage = () => {
  useSEO(PAGE_SEO["/terms"]);

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
              Terms of Use
            </h1>
            <p className="text-muted-foreground text-sm mb-10">
              Last updated: June 2026
            </p>

            <div className="space-y-8 text-base leading-relaxed text-foreground/80">
              <p>
                These Terms of Use ("Terms") govern your access to and use of the
                Neuromatter Group website and services. By using our website, you
                agree to these Terms.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  1. Use of the Website
                </h2>
                <p>
                  You agree to use the website only for lawful purposes and in a way
                  that does not infringe the rights of, or restrict the use of, the
                  website by others.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  2. Intellectual Property
                </h2>
                <p>
                  All content on this website, including text, graphics, logos, and
                  software, is the property of Neuromatter Group or its licensors and
                  is protected by applicable intellectual property laws. You may not
                  reproduce or distribute it without our prior written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  3. Disclaimers
                </h2>
                <p>
                  The website and its content are provided on an "as is" and "as
                  available" basis without warranties of any kind. We do not warrant
                  that the website will be uninterrupted, error-free, or free of
                  harmful components.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  4. Limitation of Liability
                </h2>
                <p>
                  To the fullest extent permitted by law, Neuromatter Group shall not
                  be liable for any indirect, incidental, or consequential damages
                  arising out of your use of, or inability to use, the website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  5. Changes to These Terms
                </h2>
                <p>
                  We may update these Terms from time to time. Continued use of the
                  website after changes are posted constitutes your acceptance of the
                  revised Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  6. Contact Us
                </h2>
                <p>
                  If you have any questions about these Terms, contact us at{" "}
                  <a
                    href="mailto:contact@neuromatter.in"
                    className="text-primary underline underline-offset-4"
                  >
                    contact@neuromatter.in
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

export default TermsPage;
