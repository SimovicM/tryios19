'use client'

import { useState } from 'react'
import StatusBar from './StatusBar'
import AppGrid from './AppGrid'
import Dock from './Dock'

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <div className="h-full w-full flex flex-col">
      <StatusBar />
      <div className="flex-1 relative">
        <AppGrid currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
      <Dock />
    </div>
  )
} 