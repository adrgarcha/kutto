import { hc, InferResponseType } from 'hono/client';
import { useEffect, useState } from 'hono/jsx';
import { AppType } from '..';

const client = hc<AppType>(import.meta.env.BASE_URL);
type ResponseType200 = InferResponseType<typeof client.urls.$get, 200>;

const rowStyles = ['motion-delay-300 scale-100', 'motion-delay-500 scale-95 blur-[0.3px]', 'motion-delay-700 scale-90 blur-[0.6px]'];

export default function UrlTable() {
   const [urls, setUrls] = useState<ResponseType200 | null>(null);

   useEffect(() => {
      const fetchUrls = async () => {
         const response = await client.urls.$get();

         if (!response.ok) return;

         const data = await response.json();
         setUrls(data);
      };

      fetchUrls();
   }, []);

   return (
      <div class={`w-[800px] mt-4 ${urls ? 'motion-preset-blur-up motion-delay-300' : 'opacity-0'}`}>
         <div class="grid grid-cols-2 text-white/75 border-b border-white/20">
            <div class="font-medium py-4">Full URL</div>
            <div class="font-medium py-4">Shortened URL</div>
         </div>
         <div class="flex flex-col">
            {urls
               ? urls.map(({ fullUrl, shortUrl }, index) => (
                    <div
                       class={`
                          grid grid-cols-2 
                          motion-preset-slide-right
                          motion-duration-2000
                          ${rowStyles[index]}
                          transition-all duration-300
                          hover:scale-100 hover:blur-0
                          border-b border-white/20
                       `}>
                       <p class="font-medium py-3 pr-4">{fullUrl}</p>
                       <p class="font-medium py-3">{shortUrl}</p>
                    </div>
                 ))
               : Array(3)
                    .fill(null)
                    .map(() => (
                       <div class="grid grid-cols-2">
                          <p class="font-medium py-3">Loading...</p>
                       </div>
                    ))}
         </div>
      </div>
   );
}
