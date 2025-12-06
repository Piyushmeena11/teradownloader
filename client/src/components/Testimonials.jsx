import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=47',
    text: 'TeraDownloader is amazing! I can download Terabox files without login. The speed is incredible and it\'s completely free. Best tool for downloading from Terabox!',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=12',
    text: 'I use TeraDownloader daily to download files from Terabox. The batch download feature is perfect for multiple files. No registration needed - just paste and download!',
    rating: 5
  },
  {
    name: 'Amit Patel',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=45',
    text: 'Finally, a tool that lets me download from Terabox without creating an account! TeraDownloader is fast, secure, and works perfectly. Highly recommended for all Terabox users!',
    rating: 5
  },
  {
    name: 'Sneha Desai',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=33',
    text: 'TeraDownloader makes downloading from Terabox so easy! I love the file preview feature - I can see what I\'m downloading before it starts. Great tool for Terabox downloads!',
    rating: 5
  },
  {
    name: 'Vikram Singh',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=20',
    text: 'Best Terabox downloader I\'ve used! TeraDownloader is fast, free, and doesn\'t require login. The download history feature helps me track all my Terabox downloads.',
    rating: 5
  },
  {
    name: 'Anjali Mehta',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=51',
    text: 'I download files from Terabox regularly using TeraDownloader. It\'s reliable, fast, and completely free. The batch download feature saves me so much time!',
    rating: 5
  },
  {
    name: 'Rohit Verma',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=27',
    text: 'TeraDownloader is the perfect solution for downloading Terabox files. No login, no registration, just paste the link and download. Works flawlessly every time!',
    rating: 5
  },
  {
    name: 'Kavita Reddy',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=15',
    text: 'I\'ve tried many Terabox downloaders, but TeraDownloader is the best! Fast downloads, secure, and completely free. The UI is clean and easy to use.',
    rating: 5
  },
  {
    name: 'Manish Joshi',
    role: 'Terabox User',
    image: 'https://i.pravatar.cc/150?img=32',
    text: 'TeraDownloader has made downloading from Terabox so simple! Just paste the share link and download. No account needed, completely free, and works great!',
    rating: 5
  }
];

export default function Testimonials() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Reduced speed for better performance
    const scrollInterval = 32; // ~30fps instead of 60fps for better performance

    const scroll = () => {
      scrollPosition += scrollSpeed;
      const maxScroll = container.scrollWidth / 2;
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative">
      {/* Yellow Top Section */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-0">
              What do our users say?
            </h2>
          </div>
        </div>
      </div>

      {/* Gray Bottom Section with Scrolling Cards */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-hidden -mt-32 md:-mt-40 pb-32 md:pb-40"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 md:gap-8" style={{ width: 'max-content' }}>
                {duplicatedTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 md:w-96 bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
                  >
                    {/* Testimonial Text */}
                    <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed min-h-[100px]">
                      {testimonial.text}
                    </p>

                    {/* User Info */}
                    <div className="flex flex-col items-center">
                      {/* Avatar */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-700 shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&size=150`;
                        }}
                      />
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-white text-lg md:text-xl mb-1">
                        {testimonial.name}
                      </h3>

                      {/* Role */}
                      <p className="text-gray-400 text-sm md:text-base">
                        {testimonial.role}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
