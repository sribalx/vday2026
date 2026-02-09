import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { Heart, Music, Send, Loader2 } from "lucide-react";
import { useCreateWish } from "@/hooks/use-wishes";
import { PixelButton } from "@/components/PixelButton";
import { PixelCard } from "@/components/PixelCard";
import { CatDecoration } from "@/components/CatDecoration";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [wishes, setWishes] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const createWishMutation = useCreateWish();

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    triggerConfetti();
    playAudio();
  };

  const triggerConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction required or missing file):", e));
    }
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishes.trim()) return;
    
    createWishMutation.mutate(
      { wishes },
      {
        onSuccess: () => {
          triggerConfetti(); // More confetti!
        }
      }
    );
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "wot",
      "r u sure",
      "think again",
      "one last chance",
      "wlao",
      "y so mean",
      "Be so forreal",
      "bruh",
      "how could u",
      "y so stone hearted",
      "last chance ah",
      "it's so over </3",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/super_trouper.mp3");
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF0F5] relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Decorative Cats */}
      <CatDecoration type={1} className="top-10 left-10 animate-float hidden md:block" />
      <CatDecoration type={2} className="bottom-10 right-10 animate-float hidden md:block" />
      <CatDecoration type={3} className="top-20 right-20 animate-wiggle hidden lg:block" />
      <CatDecoration type={4} className="bottom-20 left-20 animate-wiggle hidden lg:block" />

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-500 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full relative z-10 transition-all duration-500">
        {!yesPressed ? (
          <div className="flex flex-col items-center gap-8">
            <h1 className="font-pixel text-4xl md:text-5xl text-center text-[#FF1493] leading-tight drop-shadow-sm mb-4">
              Will you be my Valentine?
            </h1>
            
            <div className="w-full max-w-md aspect-video bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden mb-8 relative">
              <img 
                  src="/ustgt.jpg"
                  alt="photo of us" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 70%" }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full min-h-[100px]">
              <PixelButton
                className="bg-green-500 hover:bg-green-600 text-white"
                style={{ 
                  transform: `scale(${1 + noCount * 0.5})`,
                  fontSize: `${Math.min(16 + noCount * 4, 48)}px` 
                }}
                onClick={handleYesClick}
              >
                Yes
              </PixelButton>

              {noCount < 15 && (
                <PixelButton
                  onClick={handleNoClick}
                  className="bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                  style={{ 
                    transform: `scale(${Math.max(1 - noCount * 0.1, 0)})`,
                    opacity: Math.max(1 - noCount * 0.1, 0),
                    pointerEvents: noCount >= 10 ? 'none' : 'auto'
                  }}
                >
                  {getNoButtonText()}
                </PixelButton>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500">
            <PixelCard className="bg-white/90 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h1 className="font-pixel text-4xl md:text-6xl text-[#FF1493] mb-4 pixel-text-shadow animate-bounce">
                  LEZGOOOOO
                </h1>
                <p className="font-doodle text-2xl text-gray-700">
                  Excited to spend the day with you 😊
                </p>
                
                <div className="my-6 flex justify-center">
                  <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q1YjNhMWQ5YjNhMWQ5YjNhMWQ5YjNhMWQ5YjNhMWQ5YjNhMWQ5JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/MDJ9IbxxvDUQM/giphy.gif" 
                    alt="Happy Cat"
                    className="rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[200px]"
                  />
                </div>
              </div>

              {!createWishMutation.isSuccess ? (
                <form onSubmit={handleSubmitWish} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-pixel text-sm text-[#FF1493] block mb-2">
                      What would you like for Valentine's?
                    </label>
                    <Textarea
                      value={wishes}
                      onChange={(e) => setWishes(e.target.value)}
                      placeholder="Very late planning, no promises big soz"
                      className="font-doodle text-lg border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] focus:ring-0 focus:border-[#FF1493] min-h-[120px] bg-white resize-none"
                    />
                    <p className="font-doodle text-sm text-gray-500 italic">
                      on a real i have no backend for this so please just tell me
                    </p>
                  </div>
                  
                  <PixelButton 
                    type="submit" 
                    className="w-full bg-[#FF1493] hover:bg-[#FF69B4] text-white"
                    disabled={createWishMutation.isPending || !wishes.trim()}
                  >
                    {createWishMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Wishlist <Send className="w-4 h-4" />
                      </span>
                    )}
                  </PixelButton>
                </form>
              ) : (
                <div className="text-center py-8 bg-green-50 border-2 border-green-200 border-dashed rounded-lg">
                  <h3 className="font-pixel text-xl text-green-600 mb-2">Message Sent!</h3>
                  <p className="font-doodle text-lg text-gray-600">
                    Your wish is my command (maybe). <br/>
                    See you on the 14th!
                  </p>
                </div>
              )}
            </PixelCard>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => {
                  if (audioRef.current?.paused) {
                    audioRef.current.play();
                  } else {
                    audioRef.current?.pause();
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full text-xs font-pixel text-gray-500 hover:bg-white transition-colors"
              >
                <Music className="w-4 h-4" /> Toggle Music
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
