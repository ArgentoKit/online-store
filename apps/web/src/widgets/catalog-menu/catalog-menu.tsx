'use client'

import { ChevronRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ICategoryTreeNode } from '@/entities/category/types/category.interface'
import { cn } from '@/shared/utils/utils'

interface CatalogMenuProps {
  categories: ICategoryTreeNode[]
}

const triggerClassName = 'flex items-center gap-2.5 text-tb14 font-medium group-hover:text-bright-green'

export function CatalogMenu({ categories }: CatalogMenuProps) {
  const [open, setOpen] = useState(false)
  const [activePath, setActivePath] = useState<ICategoryTreeNode[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setActivePath([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleHover = (level: number, category: ICategoryTreeNode) => {
    if (category.children.length > 0) {
      setActivePath((prev) => [...prev.slice(0, level), category])
    } else {
      setActivePath((prev) => prev.slice(0, level))
    }
  }

  const columns: ICategoryTreeNode[][] = [categories, ...activePath.map((c) => c.children)].filter(
    (col) => col?.length > 0
  )

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        className={triggerClassName}
        onClick={() => {
          setOpen((prev) => !prev)
          setActivePath([])
        }}
      >
        <Menu size={17} strokeWidth={1} className='group-hover:text-bright-green' />
        <span className='relative inline-block top-0.5'>Каталог товаров</span>
      </button>

      {open && (
        <div className='absolute left-0 top-[calc(100%+8px)] z-50 flex rounded-lg border bg-white shadow-lg'>
          {columns.map((column, level) => (
            <div
              key={level}
              className='w-[240px] max-h-[420px] overflow-auto border-r py-2 last:border-r-0 first:rounded-l-lg last:rounded-r-lg'
            >
              {column.map((category) => {
                const isActive = activePath[level]?.id === category.id
                const hasChildren = category.children.length > 0

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onMouseEnter={() => handleHover(level, category)}
                    onClick={() => {
                      setOpen(false)
                      setActivePath([])
                    }}
                    className={cn(
                      'flex items-center justify-between px-4 py-2 text-t14 transition-colors hover:bg-light-grey',
                      isActive && 'bg-light-grey font-medium'
                    )}
                  >
                    {category.name}
                    {hasChildren && <ChevronRight className='size-4 shrink-0 text-medium-grey' />}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
