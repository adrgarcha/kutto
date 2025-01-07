import { hc } from 'hono/client';
import { useState } from 'hono/jsx';
import { AppType } from '..';
import CopyButton from './buttons/copy-button';
import ShortenButton from './buttons/shorten-button';

const client = hc<AppType>(import.meta.env.BASE_URL);

export default function ShortenUrlForm() {
   const [isLeaving, setIsLeaving] = useState(false);
   const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

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

         setTimeout(() => setIsLeaving(true), 5000);

         setTimeout(() => setShortenedUrl(null), 5500);
      }
   };

   return (
      <>
         <form class="flex justify-center rounded-lg w-full px-6" onSubmit={handleSubmit}>
            <input
               type="url"
               placeholder={window.innerWidth < 768 ? 'Enter your long URL here...' : 'Enter your long and boring URL here...'}
               class="w-full md:w-[600px] pl-4 rounded-s-lg rounded-e-none caret-primary text-background text-sm md:text-base placeholder:text-sm md:placeholder:text-base"
            />
            <ShortenButton />
         </form>
         {shortenedUrl && (
            <div
               class={`mt-3 flex items-center gap-x-3 
                  ${
                     isLeaving ? 'motion-opacity-out-0 motion-translate-y-out-100 motion-blur-out motion-duration-300' : 'motion-preset-rebound-down'
                  }`}>
               <span class="font-medium md:text-lg">{shortenedUrl}</span>
               <CopyButton text={shortenedUrl} />
            </div>
         )}
      </>
   );
}
