import { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: { clientX: number }) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize group shadow-2xl shadow-blue-500/10"
      ref={sliderRef}
      onMouseMove={handleMove}
      onTouchMove={(e) => handleMove(e.touches[0])}
    >
      {/* After Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200')" }}
      >
        <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/10">After</span>
      </div>

      {/* Before Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&q=80&w=1200')",
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/10">Before</span>
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
