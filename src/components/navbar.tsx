import ArrowRight from './icons/arrow-right';

export default function Navbar() {
   return (
      <header class="fixed w-full">
         <nav class="flex items-center justify-between px-6 py-4">
            <div class="flex items-center gap-x-2">
               <img src="./kutto.svg" alt="The logo of Kutto" class="size-10" />
               <p class="font-bold text-lg">Kutto</p>
            </div>
            <a href="https://adrigarcia.dev" target="_blank">
               <button class="group flex items-center gap-x-2 font-medium text-sm border border-foreground px-5 py-2 rounded-lg">
                  Check out my portfolio
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </a>
         </nav>
      </header>
   );
}
