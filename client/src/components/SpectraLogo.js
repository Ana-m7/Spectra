export default function SpectraLogo({ size = 32 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#grad)"/>
            <path d="M20 8C16 8 13 11 13 15C13 17 14 18.5 15.5 19.5C13.5 20.5 12 22.5 12 25C12 28.5 15 31 19 31H21C25 31 28 28.5 28 25C28 22.5 26.5 20.5 24.5 19.5C26 18.5 27 17 27 15C27 11 24 8 20 8Z" fill="white" opacity="0.9"/>
            <circle cx="17" cy="15" r="2" fill="#7c3aed"/>
            <circle cx="23" cy="15" r="2" fill="#ec4899"/>
            <rect x="16" y="22" width="8" height="2" rx="1" fill="#7c3aed"/>
            <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    );
}