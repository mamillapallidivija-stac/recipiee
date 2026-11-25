const shapes = {
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  heart: <path d="M20.8 8.8c0 5-8.8 11-8.8 11s-8.8-6-8.8-11a4.8 4.8 0 0 1 8.8-2.7 4.8 4.8 0 0 1 8.8 2.7Z"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></>,
  calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M4 9h16"/></>,
  bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
  user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  arrow: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
  chevron: <path d="m7 10 5 5 5-5"/>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  minus: <path d="M5 12h14"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>,
  filter: <><path d="M4 7h16M7 12h10M10 17h4"/><circle cx="8" cy="7" r="1.5"/><circle cx="15" cy="12" r="1.5"/></>,
  leaf: <><path d="M20.5 3.5C11 3.5 5 7 5 13.5c0 3.4 2.1 5 4.8 5 6.2 0 10.7-6.1 10.7-15Z"/><path d="M4 21c2.5-5.5 6.4-8.5 12-11"/></>,
  chef: <><path d="M6 12h12v8H6z"/><path d="M5 12a3.5 3.5 0 1 1 1.4-6.7A4.5 4.5 0 0 1 15 5a3.5 3.5 0 1 1 4 5.8"/></>,
  print: <><path d="M7 8V3h10v5M7 17H4V9h16v8h-3"/><path d="M7 14h10v7H7zM17 11h.01"/></>,
  sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/></>,
};

export default function Icon({ name, size = 20, className = '', fill = 'none' }) {
  return (
    <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {shapes[name] || shapes.sparkle}
    </svg>
  );
}
