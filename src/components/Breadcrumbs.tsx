import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  /** Label shown to users */
  name: string;
  /** Internal path. If omitted (last crumb), rendered as plain text. */
  url?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * Visible breadcrumbs. Pair with `breadcrumbSchema(items)` from src/lib/schema.ts
 * passed to <SEOHead jsonLd={[...]}> so visible UI and JSON-LD stay in sync.
 *
 * - The last item is rendered as <span> (current page, not a link), per WAI-ARIA.
 * - The whole nav has aria-label="Breadcrumb" for screen readers.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label='Breadcrumb' className={cn("text-sm", className)}>
      <ol className='flex flex-wrap items-center gap-1.5'>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.name}-${idx}`} className='flex items-center gap-1.5'>
              {isLast || !item.url ? (
                <span className='text-gray-900 font-medium' aria-current='page'>
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className='text-gray-500 hover:text-bitcoin transition-colors'
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden='true'
                  className='w-3.5 h-3.5 text-gray-400 shrink-0'
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
