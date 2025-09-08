import { Suspense } from "react";
import ProductAnalysis from "@/components/product-analysis";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24 min-h-screen">
        <Suspense fallback={<ProductAnalysisSkeleton />}>
          <ProductAnalysis />
        </Suspense>
        <Footer />
      </main>
    </>
  );
}

function ProductAnalysisSkeleton() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}