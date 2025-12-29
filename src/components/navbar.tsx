import ArrowRight from './icons/arrow-right';

const PORTFOLIO_LINK = 'https://adrichavero.com';

export default function Navbar() {
   return (
      <header class="fixed w-full">
         <nav class="flex items-center justify-between px-6 py-4">
            <div class="flex items-center gap-x-2">
               <img src="./kutto.svg" alt="The logo of Kutto" class="size-8 md:size-10" />
               <p class="font-bold md:text-lg">Kutto</p>
            </div>
            <a href={PORTFOLIO_LINK} target="_blank">
               <button class="group flex items-center gap-x-2 font-medium text-xs md:text-sm border border-foreground px-5 py-2 rounded-lg">
                  Check out my portfolio
                  <ArrowRight className="size-3 md:size-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </a>
         </nav>
      </header>
   );
}
