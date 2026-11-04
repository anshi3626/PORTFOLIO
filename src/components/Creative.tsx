import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { creativeCategories, creativeItems } from '../data/content';
import type { CreativeItem } from '../data/content';
import Reveal from './Reveal';

function Lightbox({ item, onClose }: { item: CreativeItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn" style={{ position: 'absolute', top: -56, right: 0 }} onClick={onClose} aria-label="Close image">
          <X size={18} />
        </button>
        <div className="placeholder-box">Image placeholder: {item.title}</div>
        <p style={{ color: 'var(--text-2)', marginTop: 12 }}>{item.category}</p>
      </div>
    </div>
  );
}

export default function Creative() {
  const [filter, setFilter] = useState<(typeof creativeCategories)[number]>('All');
  const [open, setOpen] = useState<CreativeItem | null>(null);

  const items = useMemo(
    () => creativeItems.filter((i) => filter === 'All' || i.category === filter),
    [filter],
  );

  return (
    <section id="creative">
      <div className="container">
        <Reveal>
          <p className="eyebrow">06 · Creative Work</p>
          <h2 className="section-title">
            Creativity <span className="gradient-text">meets technology.</span>
          </h2>
          <p className="section-lead">
            Posters, thumbnails, ad creatives, video edits and AI-assisted visuals. Images below are placeholders until
            my own work is added.
          </p>
        </Reveal>

        <div className="filter-bar" role="group" aria-label="Filter creative work by category">
          {creativeCategories.map((c) => (
            <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="masonry">
          {items.map((item, i) => (
            <button
              key={item.id}
              className="glass masonry-item"
              onClick={() => setOpen(item)}
              aria-label={`Open ${item.title}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="placeholder-box" style={{ height: 180 + (i % 3) * 60 }}>
                Image placeholder
              </div>
              <div className="caption">
                <strong>{item.title}</strong>
                {item.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
