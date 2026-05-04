import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TemplateClassic } from "@/components/templates/TemplateClassic";
import { TemplateMagazine } from "@/components/templates/TemplateMagazine";
import { TemplateMidnight } from "@/components/templates/TemplateMidnight";

const TemplatePage = () => {
  const { slug } = useParams();

  const render = () => {
    switch (slug) {
      case "classico":
        return <TemplateClassic />;
      case "revista":
        return <TemplateMagazine />;
      case "meia-noite":
        return <TemplateMidnight />;
      default:
        return <TemplateClassic />;
    }
  };

  return (
    <div className="relative">
      <Link
        to="/"
        className="fixed top-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Galeria
      </Link>
      {render()}
    </div>
  );
};

export default TemplatePage;
