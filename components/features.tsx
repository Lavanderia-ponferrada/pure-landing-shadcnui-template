import {
  TrendingUp,
  Search,
  ChartPie,
  ShoppingCart,
  Bell,
  Zap,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Search,
    title: "Búsqueda Inteligente",
    description:
      "Pega cualquier URL de producto y obtén instantáneamente su histórico de precios y comparación entre tiendas.",
  },
  {
    icon: TrendingUp,
    title: "Histórico de Precios",
    description:
      "Visualiza la evolución de precios en los últimos 180 días y identifica las mejores oportunidades de compra.",
  },
  {
    icon: Zap,
    title: "Análisis con IA",
    description:
      "Obtén recomendaciones inteligentes basadas en el análisis de precios, reseñas y tendencias del mercado.",
  },
  {
    icon: ShoppingCart,
    title: "Multi-tienda",
    description:
      "Compara precios entre Amazon, MediaMarkt, Carrefour y otras tiendas principales en una sola búsqueda.",
  },
  {
    icon: ChartPie,
    title: "Análisis Avanzado",
    description:
      "Descubre si es buen momento para comprar con métricas como precio mínimo, media y tendencias.",
  },
  {
    icon: Bell,
    title: "Alertas de Precio",
    description:
      "Recibe notificaciones cuando el precio de tus productos favoritos baje al nivel que deseas.",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-12 xs:py-20 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Ahorra Dinero Comprando Inteligente
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
