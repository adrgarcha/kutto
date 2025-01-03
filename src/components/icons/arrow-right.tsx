export default function ArrowRight({ className }: { className?: string }) {
   return (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={className}>
         <path d="M5 12h14" />
         <path d="m12 5 7 7-7 7" />
      </svg>
   );
}