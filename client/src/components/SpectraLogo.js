import { useId } from 'react';

export default function SpectraLogo({ size = 36 }) {
    const gradientId = useId();

    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill={`url(#${gradientId})`}/>
            <path
                d="M20 20 A8 8 0 0 1 36 20 A8 8 0 0 1 20 20 A8 8 0 0 1 4 20 A8 8 0 0 1 20 20 Z"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinejoin="round"
            />
            <circle cx="6" cy="14" r="2" fill="#7c3aed"/>
            <circle cx="34" cy="14" r="2" fill="#ec4899"/>
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    );
}
