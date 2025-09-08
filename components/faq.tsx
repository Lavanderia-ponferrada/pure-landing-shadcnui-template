import {
  HelpCircle,
  Search,
  ShieldCheck,
  TrendingUp,
  Zap,
  Bell,
} from "lucide-react";

const faq = [
  {
    icon: HelpCircle,
    question: "¿Cómo funciona Comparaelprecio?",
    answer:
      "Simplemente pega la URL del producto que te interesa y obtendrás instantáneamente su histórico de precios, comparación entre tiendas y análisis con IA.",
  },
  {
    icon: Search,
    question: "¿Qué tiendas están soportadas?",
    answer:
      "Actualmente soportamos Amazon, MediaMarkt, Carrefour, El Corte Inglés y estamos añadiendo nuevas tiendas constantemente.",
  },
  {
    icon: TrendingUp,
    question: "¿Qué tan preciso es el histórico de precios?",
    answer:
      "Nuestros datos se actualizan diariamente y mantenemos un histórico de hasta 180 días para usuarios Pro y 1 año para Business.",
  },
  {
    icon: Zap,
    question: "¿Cómo funciona el análisis con IA?",
    answer:
      "Nuestra IA analiza precios históricos, reseñas, tendencias del mercado y otros factores para darte recomendaciones personalizadas de compra.",
  },
  {
    icon: ShieldCheck,
    question: "¿Es seguro usar Comparaelprecio?",
    answer:
      "Sí, no almacenamos información personal sensible y todas las conexiones están cifradas. Solo analizamos URLs públicas de productos.",
  },
  {
    icon: Bell,
    question: "¿Cómo funcionan las alertas de precio?",
    answer:
      "Configura el precio objetivo para cualquier producto y te notificaremos por email cuando baje a ese nivel o menos.",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-12 xs:py-20"
    >
      <div className="max-w-screen-lg">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          Preguntas Frecuentes
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Respuestas rápidas a las preguntas más comunes sobre nuestro comparador de precios.
        </p>

        <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline outline-[1px] outline-border outline-offset-[-1px]">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div key={question} className="border p-6 -mt-px -ml-px">
              <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                <Icon className="h-4 w-4 xs:h-6 xs:w-6" />
              </div>
              <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                <span>{question}</span>
              </div>
              <p className="text-sm xs:text-base">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
