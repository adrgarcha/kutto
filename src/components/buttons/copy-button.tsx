import { useState } from 'hono/jsx';
import Copy from '../icons/copy';

export default function CopyButton({ text }: { text: string }) {
   const [hasClickCopy, setHasClickCopy] = useState(false);

   const copyToClipboard = async () => {
      await navigator.clipboard.writeText(text);
      setHasClickCopy(true);
      setTimeout(() => setHasClickCopy(false), 700);
   };

   return (
      <button
         onClick={copyToClipboard}
         aria-label="Copy to clipboard"
         class={`hover:text-primary transition-colors
            ${hasClickCopy ? 'motion-rotate-in-[-1turn] motion-duration-700' : ''}`}>
         <Copy className="size-5 md:size-6" />
      </button>
   );
}
