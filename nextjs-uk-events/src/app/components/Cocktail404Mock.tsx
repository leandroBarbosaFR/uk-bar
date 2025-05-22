'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import  IceSvgWrapper  from '../components/IceSvg'
import  SugarSvgWrapper from '../components/SugarSvg'
import LimeSvgWrapper from '../components/LimeSvg'
import GlassSvgWrapper from '../components/GlassSvg'
import type { Draggable as DraggableType } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export default function Cocktail404Improved() {
  const [droppedIngredients, setDroppedIngredients] = useState<string[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const glassRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const draggableInstances: DraggableType[] = []


    async function setupDraggables() {
      const { Draggable } = await import('gsap/Draggable')
      gsap.registerPlugin(Draggable)

      const draggables = document.querySelectorAll('.draggable')

      draggables.forEach(el => {
        const instance = Draggable.create(el, {
          type: 'x,y',
          bounds: document.body,
          onDragEnd: function () {
            const glassRect = glassRef.current?.getBoundingClientRect()
            const elRect = this.target.getBoundingClientRect()
            if (
              glassRect &&
              elRect.left + elRect.width/2 > glassRect.left &&
              elRect.left + elRect.width/2 < glassRect.right &&
              elRect.top + elRect.height/2 > glassRect.top &&
              elRect.top + elRect.height/2 < glassRect.bottom
            ) {
              const ingredientName = this.target.getAttribute('data-ingredient')
              if (ingredientName && !droppedIngredients.includes(ingredientName)) {
                setDroppedIngredients(prev => {
                  const newIngredients = [...prev, ingredientName]
                  if (newIngredients.length === 3) {
                    setTimeout(() => setShowSuccessMessage(true), 500)
                  }
                  return newIngredients
                })
                
                // Animate ingredient into glass
                gsap.to(this.target, {
                  x: glassRect.left + glassRect.width / 2 - elRect.left - elRect.width/2,
                  y: glassRect.top + glassRect.height * 0.7 - elRect.top - elRect.height/2,
                  scale: 0.8,
                  duration: 0.5,
                  ease: "back.out(1.7)"
                })
              }
            }
          },
        })

        draggableInstances.push(...instance)
      })
    }

    setupDraggables()

    return () => {
      draggableInstances.forEach(instance => instance.kill())
    }
  }, [droppedIngredients])


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden" style={{ paddingTop: '200px' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-100 rounded-full opacity-30"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-100 rounded-full opacity-35"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-green-200 rounded-full opacity-25"></div>
      </div>

      {/* Main Title */}
      <div className="text-center pb-8">
        <h1 className="text-8xl font-bold mb-4 tracking-wider" style={{ color: '#33483e' }}>404</h1>
        <h2 className="text-2xl font-medium mb-2" style={{ color: '#33483e' }}>You are lost</h2>
        <p className="text-lg" style={{ color: '#33483e' }}>But let&apos;s make something delicious while you&apos;re here!</p>
      </div>

      {/* Scattered Ingredients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Lime - top left */}
        <LimeSvgWrapper
          className="draggable pointer-events-auto"
          data-ingredient="lime"
          style={{ 
            position: 'absolute',
            top: '20%', 
            left: '15%',
            width: 80, 
            height: 80, 
            cursor: 'grab',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            transition: 'transform 0.2s ease'
          }}
        />

        {/* Ice - top right */}
        <IceSvgWrapper
          className="draggable pointer-events-auto"
          data-ingredient="ice"
          style={{ 
            position: 'absolute',
            top: '25%', 
            right: '20%',
            width: 80, 
            height: 80, 
            cursor: 'grab',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            transition: 'transform 0.2s ease'
          }}
        />

        {/* Sugar - middle left */}
        <SugarSvgWrapper
          className="draggable pointer-events-auto"
          data-ingredient="sugar"
          style={{ 
            position: 'absolute',
            top: '45%', 
            left: '10%',
            width: 80, 
            height: 80, 
            cursor: 'grab',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            transition: 'transform 0.2s ease'
          }}
        />
      </div>

      {/* Cocktail Glass at bottom */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="text-center mb-4">
          <p className="font-medium" style={{ color: '#33483e' }}>Drag ingredients into the glass</p>
        </div>
        
       <GlassSvgWrapper
        ref={glassRef}
        style={{ width: 192, height: 256 }}
        />

        {/* Progress indicator */}
        <div className="mt-4 text-center">
          <div className="flex justify-center space-x-2 mb-2">
            {[0, 1, 2].map(i => (
              <div 
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300`}
                style={{ 
                  backgroundColor: i < droppedIngredients.length ? '#33483e' : '#d1d5db'
                }}
              />
            ))}
          </div>
          <p className="text-sm" style={{ color: '#33483e' }}>
            {droppedIngredients.length}/3 ingredients added
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 transform animate-pulse">
            <div className="text-6xl mb-4">🍹</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#33483e' }}>Cheers!</h3>
            <p className="text-lg mb-4" style={{ color: '#33483e' }}>
              Oops, you got lost — but hey, at least you made a cocktail!
            </p>
            <button 
              onClick={() => {
                setShowSuccessMessage(false)
                setDroppedIngredients([])
                // Reset ingredient positions
                const draggables = document.querySelectorAll('.draggable')
                draggables.forEach(el => {
                  gsap.to(el, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                  })
                })
              }}
              className="text-white px-6 py-2 rounded-full transition-colors duration-200"
              style={{ backgroundColor: '#33483e' }}
              onMouseEnter={(e) => {
              const target = e.target as HTMLElement
              target.style.backgroundColor = '#2a3d33'
              }}
              onMouseLeave={(e) => {
              const target = e.target as HTMLElement
              target.style.backgroundColor = '#33483e'
              }}
            >
              Make Another! 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  )
}