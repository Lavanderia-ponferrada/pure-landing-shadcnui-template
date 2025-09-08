import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import LogoCloud from "./logo-cloud";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <Badge className="bg-primary rounded-full py-1 border-none">
            ¡Nuevo! Análisis con IA disponible 🤖
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            Compara Precios e Histórico de Productos
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Encuentra las mejores ofertas comparando precios históricos de Amazon, MediaMarkt, Carrefour y más tiendas. 
            Analiza tendencias y toma decisiones inteligentes de compra.
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base"
            >
              Comparar Precios <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none"
            >
              <CirclePlay className="!h-5 !w-5" /> Ver Demo
            </Button>
          </div>
        </div>
      </div>
      <StoreLogos className="mt-24 max-w-3xl mx-auto" />
    </div>
  );
};

export default Hero;
