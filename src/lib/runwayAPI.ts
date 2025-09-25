import { supabase } from './supabase'

export interface RunwayVideoRequest {
  prompt: string
  duration?: number
  style?: string
  aspect_ratio?: '16:9' | '9:16' | '1:1'
}

export interface RunwayVideoResponse {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  video_url?: string
  thumbnail_url?: string
  duration?: number
  error?: string
}

export class RunwayAPI {
  private static readonly API_BASE = 'https://api.runwayml.com/v1'
  private static readonly API_KEY = import.meta.env.VITE_RUNWAY_API_KEY

  static async generateVideo(request: RunwayVideoRequest): Promise<RunwayVideoResponse> {
    try {
      console.log('RunwayML API Key:', this.API_KEY ? 'Present' : 'Missing')
      console.log('RunwayML API Key length:', this.API_KEY?.length || 0)
      
      const response = await fetch(`${this.API_BASE}/gen4_turbo/video/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: request.prompt,
          duration: request.duration || 4,
          style: request.style || 'cinematic',
          aspect_ratio: request.aspect_ratio || '16:9',
          quality: 'high'
        })
      })

      if (!response.ok) {
        throw new Error(`Runway API error: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        id: data.id,
        status: 'pending',
        video_url: data.video_url,
        thumbnail_url: data.thumbnail_url,
        duration: data.duration
      }
    } catch (error) {
      console.error('Runway API error:', error)
      throw new Error('Failed to generate video with Runway')
    }
  }

  static async getVideoStatus(videoId: string): Promise<RunwayVideoResponse> {
    try {
      const response = await fetch(`${this.API_BASE}/gen4_turbo/video/${videoId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        }
      })

      if (!response.ok) {
        throw new Error(`Runway API error: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        id: data.id,
        status: data.status,
        video_url: data.video_url,
        thumbnail_url: data.thumbnail_url,
        duration: data.duration,
        error: data.error
      }
    } catch (error) {
      console.error('Runway API error:', error)
      throw new Error('Failed to get video status')
    }
  }

  static async pollVideoStatus(videoId: string, onUpdate: (status: RunwayVideoResponse) => void): Promise<void> {
    const pollInterval = setInterval(async () => {
      try {
        const status = await this.getVideoStatus(videoId)
        onUpdate(status)
        
        if (status.status === 'completed' || status.status === 'failed') {
          clearInterval(pollInterval)
        }
      } catch (error) {
        console.error('Error polling video status:', error)
        clearInterval(pollInterval)
      }
    }, 5000) // Poll every 5 seconds

    // Stop polling after 10 minutes
    setTimeout(() => clearInterval(pollInterval), 600000)
  }
}