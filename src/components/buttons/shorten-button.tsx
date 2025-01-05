import { useState } from 'hono/jsx';
import Scissors from '../icons/scissors';

export default function ShortenButton() {
   const [hasClickShorten, setHasClickShorten] = useState(false);

   const handleClick = () => {
      setHasClickShorten(true);
      setTimeout(() => setHasClickShorten(false), 500);
   };

   return (
      <button
         onClick={handleClick}
         class={`!flex items-center gap-x-2 rounded-e-lg px-4 py-3 bg-primary font-semibold border border-primary hover:bg-foreground hover:text-primary transition-colors ${
            hasClickShorten ? 'motion-preset-confetti' : ''
         }`}>
         Shorten!
         <Scissors className="size-5" />
      </button>
   );
}
