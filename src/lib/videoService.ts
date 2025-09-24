import { supabase } from './supabase'

export interface VideoGenerationRequest {
  prompt: string
  templateId?: string
  duration?: number
  style?: string
}

export interface VideoGenerationResponse {
  id: string
  status: 'generating' | 'completed' | 'failed'
  progress: number
  videoUrl?: string
  thumbnailUrl?: string
  duration?: number
}

export class VideoService {
  static async generateVideo(request: VideoGenerationRequest, userId: string): Promise<VideoGenerationResponse> {
    try {
      // Create video record in database
      const { data: video, error } = await supabase
        .from('videos')
        .insert({
          user_id: userId,
          title: request.prompt.substring(0, 100),
          prompt: request.prompt,
          status: 'generating',
          progress: 0
        })
        .select()
        .single()

      if (error) throw error

      // Simulate video generation process
      this.simulateGeneration(video.id)

      return {
        id: video.id,
        status: 'generating',
        progress: 0
      }
    } catch (error) {
      console.error('Error generating video:', error)
      throw error
    }
  }

  private static async simulateGeneration(videoId: string) {
    const progressSteps = [10, 25, 50, 75, 90, 100]
    
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second intervals
      
      const progress = progressSteps[i]
      const isComplete = progress === 100
      
      const { error } = await supabase
        .from('videos')
        .update({
          progress,
          status: isComplete ? 'completed' : 'generating',
          video_url: isComplete ? `https://example.com/videos/${videoId}.mp4` : null,
          thumbnail_url: isComplete ? `https://example.com/thumbnails/${videoId}.jpg` : null,
          duration: isComplete ? Math.floor(Math.random() * 300) + 30 : null // 30-330 seconds
        })
        .eq('id', videoId)

      if (error) {
        console.error('Error updating video progress:', error)
        // Mark as failed
        await supabase
          .from('videos')
          .update({ status: 'failed' })
          .eq('id', videoId)
        break
      }
    }
  }

  static async getUserVideos(userId: string) {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user videos:', error)
      throw error
    }
  }

  static async getTemplates() {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('uses_count', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching templates:', error)
      throw error
    }
  }

  static async deleteVideo(videoId: string, userId: string) {
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoId)
        .eq('user_id', userId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting video:', error)
      throw error
    }
  }

  static async updateVideoTitle(videoId: string, title: string, userId: string) {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ title })
        .eq('id', videoId)
        .eq('user_id', userId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating video title:', error)
      throw error
    }
  }
}
