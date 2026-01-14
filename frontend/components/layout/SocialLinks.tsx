export function SocialLinks({ className = '' }: { className?: string }) {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: 'https://www.facebook.com/sakwoodworks',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Line',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 2-2-2-2 2-2 2 2 2-2-2-2 2-2 2 2 2-2-2-2 2-2z" />
        </svg>
      ),
      href: 'https://line.me/ti/p/@sakwoodworks',
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} text-white p-2 rounded-full transition-colors`}
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
