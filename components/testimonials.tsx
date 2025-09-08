import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import Link from "next/link";
import React, { ComponentProps } from "react";

const testimonials = [
  {
    id: 1,
    name: "María García",
    designation: "Compradora Frecuente",
    company: "Madrid",
    testimonial:
      "Gracias a Comparaelprecio he ahorrado más de 300€ este año. El histórico de precios me ayuda a saber cuándo es el mejor momento para comprar.",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    designation: "Técnico Informático",
    company: "Barcelona",
    testimonial:
      "La función de análisis con IA es increíble. Me recomendó esperar una semana y el precio bajó exactamente como predijo.",
  },
  {
    id: 3,
    name: "Ana López",
    designation: "Madre de Familia",
    company: "Valencia",
    testimonial:
      "Perfecto para comparar precios de juguetes y productos para niños. Las alertas me avisan cuando hay ofertas reales.",
  },
  {
    id: 4,
    name: "David Martín",
    designation: "Emprendedor",
    company: "Sevilla",
    testimonial:
      "Como revendedor, el plan Business me permite analizar tendencias del mercado y tomar mejores decisiones de inventario.",
  },
  {
    id: 5,
    name: "Laura Fernández",
    designation: "Estudiante",
    company: "Bilbao",
    testimonial:
      "Con el plan gratuito ya puedo comparar precios de libros y material de estudio. ¡Me encanta que sea gratis para empezar!",
  },
  {
    id: 6,
    name: "Roberto Sánchez",
    designation: "Jubilado",
    company: "Zaragoza",
    testimonial:
      "Muy fácil de usar. Solo pego el enlace del producto y ya veo si es una buena oferta o mejor esperar.",
  },
];

const Testimonials = () => (
  <div id="testimonials" className="flex justify-center items-center py-20">
    <div className="h-full w-full">
      <h2 className="mb-12 text-4xl md:text-5xl font-bold text-center tracking-tight px-6">
        Lo que Dicen Nuestros Usuarios
      </h2>
      <div className="relative">
        <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-gradient-to-r from-background to-transparent" />
        <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-gradient-to-l from-background to-transparent" />
        <Marquee pauseOnHover className="[--duration:20s]">
          <TestimonialList />
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
          <TestimonialList />
        </Marquee>
      </div>
    </div>
  </div>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="#" target="_blank">
            <TwitterLogo className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
    </div>
  ));

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export default Testimonials;
