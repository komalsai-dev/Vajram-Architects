import { Link } from "wouter";

interface ArticleCardProps {
  image: string;
  category: string;
  date: string;
  title: string;
  link: string;
  animationDelay?: number;
  isVisible?: boolean;
}

export function ArticleCard({ image, category, date, title, link, animationDelay = 0, isVisible = true }: ArticleCardProps) {
  const handleClick = () => {
    // Store scroll position before navigating to portfolio
    if (typeof window !== "undefined") {
      sessionStorage.setItem("homeScrollPosition", window.scrollY.toString());
    }
  };

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${animationDelay}s` }}
    >
      <Link href={link} onClick={handleClick} className="block group cursor-pointer">
      <div className="aspect-[3/2] overflow-hidden mb-3 sm:mb-4 bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {category && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2 border-b border-gray-800 pb-2">
          <span className="hover:text-white transition-colors underline decoration-transparent hover:decoration-gray-400 underline-offset-2 sm:underline-offset-4">{category}</span>
          {date && <span className="text-[8px] sm:text-[10px]">{date}</span>}
        </div>
      )}
      
      <h3 className="text-base sm:text-lg font-bold font-serif leading-tight text-white group-hover:underline decoration-1 underline-offset-2 sm:underline-offset-4 decoration-gray-400 transition-all">
        {title}
      </h3>
    </Link>
    </div>
  );
}
