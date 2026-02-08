"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      q: "Dari mana asal data UMKM ini?",
      a: "Data bersumber dari Dinas Koperasi dan Usaha Kecil Provinsi Jawa Barat serta Open Data Jabar, yang disinkronisasi dengan data BPS untuk validasi sektoral."
    },
    {
      q: "Seberapa sering data diperbarui?",
      a: "Data pada dashboard ini diperbarui secara berkala (tahunan). Update terakhir mencakup data hingga tahun 2025."
    },
    {
      q: "Apakah data ini bisa didownload?",
      a: "Ya, Anda dapat mengunduh dataset lengkap atau ringkasan per wilayah/sektor melalui menu Download Center secara gratis."
    },
    {
      q: "Bagaimana metodologi penentuan wilayah prioritas?",
      a: "Kami menggunakan metode Weighted Product (WP) dengan variabel: Formalisasi Usaha, Tingkat Digitalisasi, Akses Pembiayaan, dan Biaya Logistik."
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold font-grotesk text-center text-slate-900 mb-12">
            Pertanyaan Umum
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b-slate-100">
                    <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-brand-teal transition-colors py-4">
                        {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                        {faq.a}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  )
}
