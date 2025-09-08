"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleHelp } from "lucide-react";
import { useState } from "react";

const tooltipContent = {
  searches: "Número de búsquedas de productos que puedes realizar al mes.",
  alerts: "Alertas de precio que puedes configurar para recibir notificaciones.",
  ai: "Análisis con inteligencia artificial para recomendaciones personalizadas.",
};

const YEARLY_DISCOUNT = 25;
const plans = [
  {
    name: "Gratuito",
    price: 0,
    description:
      "Perfecto para usuarios ocasionales que quieren comparar precios básicos.",
    features: [
      { title: "10 búsquedas al mes", tooltip: tooltipContent.searches },
      { title: "Histórico de precios básico" },
      { title: "Comparación entre tiendas" },
      { title: "Soporte por email" },
    ],
    buttonText: "Comenzar Gratis",
  },
  {
    name: "Pro",
    price: 9,
    isRecommended: true,
    description:
      "Ideal para compradores frecuentes que quieren maximizar sus ahorros.",
    features: [
      { title: "Búsquedas ilimitadas", tooltip: tooltipContent.searches },
      { title: "Histórico completo (180 días)" },
      { title: "5 alertas de precio", tooltip: tooltipContent.alerts },
      { title: "Análisis con IA", tooltip: tooltipContent.ai },
      { title: "Soporte prioritario" },
    ],
    buttonText: "Empezar Prueba Pro",
    isPopular: true,
  },
  {
    name: "Business",
    price: 29,
    description:
      "Para empresas y revendedores que necesitan análisis avanzados de mercado.",
    features: [
      { title: "API de acceso" },
      { title: "Histórico extendido (1 año)" },
      { title: "Alertas ilimitadas", tooltip: tooltipContent.alerts },
      { title: "Análisis IA avanzado", tooltip: tooltipContent.ai },
      { title: "Dashboard empresarial" },
      { title: "Soporte 24/7" },
    ],
    buttonText: "Contactar Ventas",
  },
];

const Pricing = () => {
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("monthly");

  return (
    <div
      id="pricing"
      className="flex flex-col items-center justify-center py-12 xs:py-20 px-6"
    >
      <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-center tracking-tight">
        Planes y Precios
      </h1>
      <Tabs
        value={selectedBillingPeriod}
        onValueChange={setSelectedBillingPeriod}
        className="mt-8"
      >
        <TabsList className="h-11 px-1.5 rounded-full bg-primary/5">
          <TabsTrigger value="monthly" className="py-1.5 rounded-full">
            Mensual
          </TabsTrigger>
          <TabsTrigger value="yearly" className="py-1.5 rounded-full">
            Anual (Ahorra {YEARLY_DISCOUNT}%)
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-12 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn("relative border rounded-xl p-6 bg-background/50", {
              "border-[2px] border-primary bg-background py-10": plan.isPopular,
            })}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                Más Popular
              </Badge>
            )}
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="mt-2 text-4xl font-bold">
              {plan.price === 0 ? "Gratis" : `€${
              {selectedBillingPeriod === "monthly"
                ? plan.price
                : Math.round(plan.price * ((100 - YEARLY_DISCOUNT) / 100))}
              }`}
              <span className="ml-1.5 text-sm text-muted-foreground font-normal">
                {plan.price === 0 ? "" : "/mes"}
              </span>
            </p>
            <p className="mt-4 font-medium text-muted-foreground">
              {plan.description}
            </p>

            <Button
              variant={plan.isPopular ? "default" : "outline"}
              size="lg"
              className="w-full mt-6 text-base"
            >
              {plan.buttonText}
            </Button>
            <Separator className="my-8" />
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-1.5">
                  <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
                  {feature.title}
                  {feature.tooltip && (
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <CircleHelp className="h-4 w-4 mt-1 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>{feature.tooltip}</TooltipContent>
                    </Tooltip>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
