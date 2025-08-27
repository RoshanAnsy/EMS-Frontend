'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function AttendanceSystem() {
  const [attendance, setAttendance] = useState({
    isClockedIn: false,
    lastPunchTime: null as string | null
  })
  const [isLoading, setIsLoading] = useState(false)

  const handlePunch = async (type: 'in' | 'out') => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setAttendance({
        isClockedIn: type === 'in',
        lastPunchTime: new Date().toISOString()
      })
      
      toast.success(`Punched ${type} successfully!`, {
        description: `Time: ${new Date().toLocaleTimeString()}`
      })
    } catch (error) {
      toast.error("Failed to record attendance")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen px-4'>
        <Card className="w-full h-full max-w-md mx-auto shadow-lg">
      <CardHeader className='text-center mt-10'>
        <CardTitle className='text-4xl'>Attendance</CardTitle>
        <CardDescription>
          {attendance.isClockedIn 
            ? "You're currently clocked in" 
            : "Clock in to start your day"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {attendance.isClockedIn ? (
          <Button 
            onClick={() => handlePunch('out')} 
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 w-36 h-14 text-xl  md:w-40 md:h-16 md:text-xl rounded-full"
          >
            {isLoading ? "Processing..." : "Punch Out"}
          </Button>
        ) : (
          <Button 
            onClick={() => handlePunch('in')} 
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 w-40 h-16 text-xl rounded-full"
          >
            {isLoading ? "Processing..." : "Punch In"}
          </Button>
        )}
        
      </CardContent>
    </Card>
    </div>
    
  )
}