import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";

const events = [
  { 
    name: "UN Conference", 
    image: "/placeholder.svg",
    description: "Presented groundbreaking research on consumer behavior and sustainability messaging",
    location: "New York, USA",
    year: "2024"
  },
  { 
    name: "Cannes Lions", 
    image: "/placeholder.svg",
    description: "Showcased award-winning neuromarketing campaigns with Fortune 500 partners",
    location: "Cannes, France",
    year: "2024"
  },
  { 
    name: "SXSW", 
    image: "/placeholder.svg",
    description: "Led interactive sessions on the future of brain-computer interfaces in advertising",
    location: "Austin, USA",
    year: "2024"
  },
  { 
    name: "Forbes CMO Summit", 
    image: "/placeholder.svg",
    description: "Keynote on leveraging neuroscience for next-generation brand strategies",
    location: "Half Moon Bay, USA",
    year: "2023"
  },
  { 
    name: "Effie Awards", 
    image: "/placeholder.svg",
    description: "Celebrated effectiveness-driven campaigns powered by brain response data",
    location: "New York, USA",
    year: "2023"
  },
  { 
    name: "Ad Age", 
    image: "/placeholder.svg",
    description: "Featured in exclusive coverage on the evolution of marketing measurement",
    location: "Chicago, USA",
    year: "2023"
  },
  { 
    name: "AdWeek", 
    image: "/placeholder.svg",
    description: "Panel discussion on bridging creativity and neuroscience in modern advertising",
    location: "New York, USA",
    year: "2023"
  },
  { 
    name: "CES", 
    image: "/placeholder.svg",
    description: "Demonstrated cutting-edge neurotech solutions for real-time ad optimization",
    location: "Las Vegas, USA",
    year: "2024"
  },
  { 
    name: "Brilliant Minds", 
    image: "/placeholder.svg",
    description: "Explored the intersection of technology, creativity, and human cognition",
    location: "Stockholm, Sweden",
    year: "2023"
  },
  { 
    name: "IPA Effectiveness Week", 
    image: "/placeholder.svg",
    description: "Shared insights on measuring long-term brand building through neuroscience",
    location: "London, UK",
    year: "2024"
  },
];

const SeenAroundSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setIsAutoScrolling(false);
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current && isAutoScrolling) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          // Reset to beginning smoothly
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <section className="section-padding bg-section-dark overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-section-dark-foreground">
            You may have seen us{" "}
            <span className="block">around…</span>
          </h2>
          <p className="body-md text-section-dark-foreground/60 mt-6 max-w-2xl mx-auto">
            From global conferences to industry awards, we're shaping the conversation around neuromarketing
          </p>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border border-section-dark-foreground/20 flex items-center justify-center transition-all ${
              canScrollLeft 
                ? 'hover:bg-section-dark-foreground/10 hover:border-section-dark-foreground/40 cursor-pointer' 
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-section-dark-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border border-section-dark-foreground/20 flex items-center justify-center transition-all ${
              canScrollRight 
                ? 'hover:bg-section-dark-foreground/10 hover:border-section-dark-foreground/40 cursor-pointer' 
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-section-dark-foreground" />
          </button>
        </div>

        {/* Scrolling Cards Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScrollPosition}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex-shrink-0 w-80 bg-section-dark-foreground/5 border border-section-dark-foreground/10 rounded-2xl overflow-hidden hover:border-section-dark-foreground/30 transition-all duration-300 group"
            >
              {/* Image Area */}
              <div className="relative h-44 bg-gradient-to-br from-section-dark-foreground/10 to-section-dark-foreground/5 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-transparent to-transparent" />
                
                {/* Event Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-section-dark-foreground">
                    {event.name}
                  </h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <p className="text-section-dark-foreground/70 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-section-dark-foreground/50">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(events.length / 3) }).map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === 0 ? 'bg-section-dark-foreground/60 w-6' : 'bg-section-dark-foreground/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeenAroundSection;
