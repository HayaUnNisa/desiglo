import { useEffect } from 'react';

export function useDocumentHead(title, description) {
  useEffect(() => {
    document.title = title ? `${title} \u2014 Desiglo` : 'Desiglo \u2014 Web Design Studio & Development';
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
