import { hc } from 'hono/client';
import { useState } from 'hono/jsx';
import { AppType } from '..';
import Copy from './icons/copy';
import Scissors from './icons/scissors';

const client = hc<AppType>(import.meta.env.BASE_URL);

export default function ShortenUrlForm() {
   const [isLeaving, setIsLeaving] = useState(false);
   const [hasClickCopy, setHasClickCopy] = useState(false);
   const [hasClickShorten, setHasClickShorten] = useState(false);
   const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

   const handleClick = () => {
      setHasClickShorten(true);
      setTimeout(() => setHasClickShorten(false), 500);
   };

   const handleSubmit = async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const input = form.querySelector('input') as HTMLInputElement;
      const url = input.value;

      if (!url) return;

      const response = await client.urls.$post({
         json: { link: url },
      });

      if (response.ok) {
         const { shortUrl } = await response.json();
         setIsLeaving(false);
         setShortenedUrl(shortUrl);
         input.value = '';

         setTimeout(() => setIsLeaving(true), 9500);
         setTimeout(() => setShortenedUrl(null), 10000);
      }
   };

   const copyToClipboard = async () => {
      if (shortenedUrl) {
         await navigator.clipboard.writeText(shortenedUrl);
         setHasClickCopy(true);
         setTimeout(() => setHasClickCopy(false), 700);
      }
   };

   return (
      <>
         <form class="flex rounded-lg" onSubmit={handleSubmit}>
            <input
               type="url"
               placeholder="Enter your long and boring URL here..."
               class="w-[600px] pl-4 rounded-s-lg caret-primary text-background"
            />
            <button
               onClick={handleClick}
               class={`!flex items-center gap-x-2 rounded-e-lg px-4 py-3 bg-primary font-semibold border border-primary hover:bg-foreground hover:text-primary transition-colors ${
                  hasClickShorten ? 'motion-preset-confetti' : ''
               }`}>
               Shorten!
               <Scissors className="size-5" />
            </button>
         </form>
         {shortenedUrl && (
            <div
               class={`mt-3 flex items-center gap-x-3 
                      ${isLeaving ? 'motion-opacity-out-0 motion-translate-y-out-100 motion-blur-out' : 'motion-preset-rebound-down'}`}>
               <span class="text-lg font-medium">{shortenedUrl}</span>
               <button
                  onClick={copyToClipboard}
                  aria-label="Copy to clipboard"
                  class={`size-6 hover:text-primary transition-colors
                ${hasClickCopy ? 'motion-rotate-in-[-1turn] motion-duration-700' : ''}`}>
                  <Copy />
               </button>
            </div>
         )}
      </>
   );
}
