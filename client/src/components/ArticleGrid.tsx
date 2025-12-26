import { useState, useEffect, useRef } from "react";
import { ArticleCard } from "./ArticleCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Article {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  link: string;
}

interface ArticleGridProps {
  title: string;
  articles: Article[];
  viewMoreLink?: string;
  columns?: 2 | 3;
  isFirstSection?: boolean;
}

export function ArticleGrid({ title, articles, viewMoreLink, columns = 3, isFirstSection = false }: ArticleGridProps) {
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionId = title ? title.toLowerCase().replace(/\s+/g, '-') : '';
  
  // Show only first 3 articles by default, all if showAll is true
  const displayedArticles = showAll ? articles : articles.slice(0, 3);
  const hasMoreArticles = articles.length > 3;

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id={sectionId} 
      className={`container mx-auto px-3 sm:px-4 mb-12 sm:mb-16 md:mb-20 scroll-mt-20 ${
        isFirstSection ? 'pt-12 sm:pt-16 md:pt-20' : ''
      }`}
    >
      {title && (
        <h2 
          className={`text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-6 sm:mb-8 text-white transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {title}
        </h2>
      )}
      
      {/* Mobile: Horizontal swipeable carousel */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {articles.map((article, index) => (
              <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-[70%]">
                <ArticleCard 
                  {...article} 
                  animationDelay={index * 0.1}
                  isVisible={isVisible}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop: Grid layout (unchanged) */}
      <div className={cn(
        "hidden md:grid grid-cols-1 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12",
        columns === 2 ? "sm:grid-cols-2 lg:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {displayedArticles.map((article, index) => (
          <ArticleCard 
            key={article.id} 
            {...article} 
            animationDelay={index * 0.1}
            isVisible={isVisible}
          />
        ))}
      </div>
      
      {/* View More button - only show on desktop if there are more than 3 articles */}
      {hasMoreArticles && !showAll && (
        <div 
          className={`hidden md:flex justify-center mt-8 sm:mt-10 md:mt-12 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${displayedArticles.length * 0.1 + 0.2}s` }}
        >
          <Button 
            onClick={() => setShowAll(true)}
            variant="outline" 
            className="rounded-none border-white text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-6 sm:px-8 h-9 sm:h-10 hover:bg-white hover:text-black transition-colors uppercase"
          >
            View More
          </Button>
        </div>
      )}
      
      {/* Show Less button when all articles are displayed - only on desktop */}
      {hasMoreArticles && showAll && (
        <div className="hidden md:flex justify-center mt-8 sm:mt-10 md:mt-12">
          <Button 
            onClick={() => {
              setShowAll(false);
              // Scroll to section title when collapsing
              const element = document.getElementById(sectionId);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            variant="outline" 
            className="rounded-none border-white text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-6 sm:px-8 h-9 sm:h-10 hover:bg-white hover:text-black transition-colors uppercase"
          >
            Show Less
          </Button>
        </div>
      )}
      
      {/* Legacy viewMoreLink support (if needed) - only on desktop */}
      {viewMoreLink && !hasMoreArticles && (
        <div 
          className={`hidden md:flex justify-center mt-8 sm:mt-10 md:mt-12 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${displayedArticles.length * 0.1 + 0.2}s` }}
        >
          <Button 
            variant="outline" 
            className="rounded-none border-white text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-6 sm:px-8 h-9 sm:h-10 hover:bg-white hover:text-black transition-colors uppercase"
          >
            View More
          </Button>
        </div>
      )}
    </section>
  );
}
