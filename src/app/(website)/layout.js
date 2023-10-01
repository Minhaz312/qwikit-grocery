import Footer from '@/components/site/common/Footer'
import Navbar from '@/components/site/common/Navbar'
import React from 'react'

export default function WebsiteLayout({children}) {
  return (
    <div>
        <Navbar />
        <main className='cs-container'>
            {children}
        </main>
        <Footer />
    </div>
  )
}
