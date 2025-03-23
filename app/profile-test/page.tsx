"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

// Create a simplified test page to isolate the profile loading issue
export default function ProfileTestPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadCount, setLoadCount] = useState(0)
  const [apiUrl, setApiUrl] = useState('/api/mock-profile')
  
  // Function to fetch profile data
  async function fetchProfile(url: string) {
    setIsLoading(true)
    setError(null)
    
    try {
      console.log(`Fetching profile from ${url}...`)
      const response = await fetch(url)
      
      if (!response.ok) {
        const text = await response.text()
        throw new Error(`API error: ${response.status} ${text || response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Profile data received:', data)
      setProfile(data)
      setLoadCount(prev => prev + 1)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError(err instanceof Error ? err.message : String(err))
      toast.error('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Load profile on mount
  useEffect(() => {
    fetchProfile(apiUrl)
  }, [apiUrl])
  
  // Keep track of component lifecycle for debugging
  useEffect(() => {
    console.log('Profile Test Page mounted')
    
    return () => {
      console.log('Profile Test Page unmounted')
    }
  }, [])
  
  // Change the API URL
  const handleApiChange = (url: string) => {
    setApiUrl(url)
  }
  
  // Render the test page
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Test Page</h1>
        
        {/* API Selection */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">API Endpoint Selection</h2>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleApiChange('/api/mock-profile')}
              className={`px-4 py-2 rounded-md ${apiUrl === '/api/mock-profile' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            >
              Mock API
            </button>
            <button 
              onClick={() => handleApiChange('/api/profile')}
              className={`px-4 py-2 rounded-md ${apiUrl === '/api/profile' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            >
              Real API
            </button>
          </div>
          <p className="mt-2 text-sm text-blue-600">
            Current endpoint: <code>{apiUrl}</code>
          </p>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3">Loading profile data...</span>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">Error Loading Profile</h2>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => fetchProfile(apiUrl)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Profile Data */}
        {!isLoading && !error && profile && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Profile Data</h2>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                Loaded {loadCount} times
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {profile.name}</p>
                  <p><span className="font-medium">Email:</span> {profile.email}</p>
                  <p><span className="font-medium">Job Title:</span> {profile.jobTitle || 'Not specified'}</p>
                  <p><span className="font-medium">Location:</span> {profile.location || 'Not specified'}</p>
                  <p><span className="font-medium">Bio:</span> {profile.bio || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Statistics</h3>
                {profile.statistics ? (
                  <div className="space-y-2">
                    <p><span className="font-medium">Resumes Created:</span> {profile.statistics.resumesCreated}</p>
                    <p><span className="font-medium">Exports:</span> {profile.statistics.resumesExported}</p>
                    <p><span className="font-medium">Analyses:</span> {profile.statistics.analysesRun}</p>
                    <p><span className="font-medium">Last Active:</span> {new Date(profile.statistics.lastActive).toLocaleString()}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No statistics available</p>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Settings</h3>
              {profile.settings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Notifications</h4>
                    <ul className="list-disc list-inside">
                      {Object.entries(profile.settings.notifications).map(entry => {
                        const [key, value] = entry as [string, boolean];
                        return (
                          <li key={key} className={value ? 'text-green-600' : 'text-gray-400'}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            {value ? ' (Enabled)' : ' (Disabled)'}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Privacy</h4>
                    <ul className="list-disc list-inside">
                      {Object.entries(profile.settings.privacy).map(entry => {
                        const [key, value] = entry as [string, boolean];
                        return (
                          <li key={key} className={value ? 'text-green-600' : 'text-gray-400'}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            {value ? ' (Enabled)' : ' (Disabled)'}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No settings available</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Raw Data</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-auto max-h-80 text-xs">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => fetchProfile(apiUrl)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Reload Data
          </button>
          <button 
            onClick={() => window.location.href = "/dashboard/profile"}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Go to Profile Page
          </button>
          <button 
            onClick={() => window.location.href = "/dashboard/auth-test"}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Run Diagnostics
          </button>
        </div>
      </div>
    </div>
  )
} 