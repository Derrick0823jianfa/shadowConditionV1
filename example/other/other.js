const urls = [
]

const videoList = urls.map((url, index) => ({ id: index + 1, url }))
Page({
  data: {
    videoList
  },

  onPlay(e) {},

  onPause(e) {
    //  console.log('pause', e.detail.activeId)
  },

  onEnded(e) {},

  onError(e) {},

  onWaiting(e) {},

  onTimeUpdate(e) {},

  onProgress(e) {},

  onLoadedMetaData(e) {
    console.log('LoadedMetaData', e)
  }
})
