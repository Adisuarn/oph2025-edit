'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import fireworkAnimation from '../../public/animations/firework.json'; // Adjust path if needed

const KonamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
];

const Secret = () => {
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const [isVisible, setVisible] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setInputSequence((prev) => {
                const newSequence = [...prev, event.key];

                if (newSequence.length > KonamiCode.length) {
                    newSequence.shift(); 
                }

                if (JSON.stringify(newSequence) === JSON.stringify(KonamiCode)) {
                    setVisible(true);
                    setShowFireworks(true); 

                    Swal.fire({
                        title: 'Secret Unlocked!',
                        text: 'เห้ยยย เจอได้ไง!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });

                    setTimeout(() => {
                        setShowFireworks(false);
                    }, 2000); 

                    return []; 
                }

                return newSequence;
            });
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, []);

    const lottieOptions = {
        loop: false,
        autoplay: true,
        animationData: fireworkAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div>
            {showFireworks && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <Lottie 
                        options={lottieOptions} 
                        height="100vh" 
                        width="100vw" 
                    />
                </div>
            )}
            <div
                className={`font-inter fixed bottom-0 left-0 w-full bg-white bg-opacity-30 backdrop-blur-md text-black text-center p-2 transition-all duration-1000 border-t-2 z-50 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                Made By Love From TUCMC67 🥰🥰🥰
            </div>
        </div>
    );
};

export default Secret;
