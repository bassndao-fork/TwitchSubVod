import { useState } from 'react'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import { getStreamerVideos } from '~/services/api/getStreamerVideos'

export const useVideos = (data: IVideo[]) => {
  const [videosData, setVideosData] = useState(data)

  const getNewVideos = async () => {
    const streamerVideos = await getStreamerVideos({
      streamerName: data[0].streamerInformation.name,
      limit: 8,
      offset: videosData.length,
    })

    const newVideos = streamerVideos?.videos.map(videoAdapter)

    if (newVideos?.length) {
      setVideosData([...videosData, ...newVideos])
    }
  }

  const streamerInformation = data[0].streamerInformation

  return { videosData, getNewVideos, streamerInformation }
}
