'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import fireworkAnimation from '../../public/animations/firework.json'

const LottiePlayer = dynamic(() => import('react-lottie-player'), { ssr: false })

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
  'a',
]

const Secret = () => {
  const [inputSequence, setInputSequence] = useState<string[]>([])
  const [isVisible, setVisible] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyDown = (event: KeyboardEvent) => {
      setInputSequence((prev) => {
        const newSequence = [...prev, event.key]

        if (newSequence.length > KonamiCode.length) {
          newSequence.shift()
        }

        if (JSON.stringify(newSequence) === JSON.stringify(KonamiCode)) {
          setVisible(true)
          setShowFireworks(true)

          Swal.fire({
            title: 'Secret Unlocked!',
            text: 'เห้ยยย เจอได้ไง!',
            icon: 'success',
            confirmButtonText: 'Cool',
          })

          setTimeout(() => {
            setShowFireworks(false)
          }, 2000)

          return []
        }

        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div>
      {showFireworks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <LottiePlayer
            animationData={fireworkAnimation}
            play
            style={{ height: '100vh', width: '100vw' }}
          />
        </div>
      )}
      <div
        className={`fixed bottom-0 left-0 z-50 w-full border-t-2 bg-white bg-opacity-30 p-2 text-center font-inter text-black backdrop-blur-md transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Made By Love From TUCMC67 🥰 🥰 🥰
      </div>
    </div>
  )
}

export default Secret
