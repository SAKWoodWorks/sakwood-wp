'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface KBTableOfContentsProps {
  content: string;
  className?: string;
}

export function KBTableOfContents({ content, className }: KBTableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse HTML content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const items: TOCItem[] = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(items);

    // Add IDs to headings in the content
    if (typeof document !== 'undefined') {
      const articleContent = document.querySelector('.kb-content');
      if (articleContent) {
        const h2s = articleContent.querySelectorAll('h2');
        const h3s = articleContent.querySelectorAll('h3');

        h2s.forEach((h2, i) => {
          h2.id = `heading-${i}`;
        });

        let h3Index = 0;
        h3s.forEach((h3) => {
          // Find the last h2 before this h3
          const previousH2s = Array.from(articleContent.querySelectorAll('h2'));
          const h2Index = previousH2s.findIndex(h2 =>
            h2.compareDocumentPosition(h3) & Node.DOCUMENT_POSITION_PRECEDING
          );

          if (h2Index >= 0) {
            h3.id = `heading-${h2Index}-${h3Index}`;
            h3Index++;
          }
        });
      }
    }
  }, [content]);

  useEffect(() => {
    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-24">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <List className="w-4 h-4" />
          Table of Contents
        </h3>

        <nav>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  'text-sm',
                  heading.level === 3 && 'ml-4'
                )}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    'text-left w-full hover:text-blue-600 transition-colors',
                    activeId === heading.id
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-700'
                  )}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
