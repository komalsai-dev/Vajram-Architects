import { Link } from "wouter";

interface InterviewCardProps {
  image: string;
  name: string;
  studio: string;
  title: string;
  link: string;
}

export function InterviewCard({ image, name, studio, title, link }: InterviewCardProps) {
  return (
    <div className="bg-black border border-gray-800 p-4 sm:p-6 relative overflow-hidden group cursor-pointer">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
        <div className="flex-1 w-full text-center md:text-left">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 font-sans">Interview With</div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-1 text-white">{name}</h3>
          <div className="text-xs sm:text-sm italic text-gray-400 mb-4 sm:mb-6 font-serif">{studio}</div>
          
          <p className="text-[10px] sm:text-xs font-bold leading-relaxed text-gray-300 font-sans group-hover:underline decoration-1 underline-offset-2 sm:underline-offset-4 decoration-gray-400 transition-all">
            <Link href={link}>{title}</Link>
          </p>
        </div>
        
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg shrink-0">
           <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
