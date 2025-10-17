export default {
  push(options: (UniNamespace.NavigateToOptions & NavigateToOptions) | _LocationUrl) {
    if (typeof options === 'string') {
      uni.navigateTo({
        url: options
      })
    } else {
      uni.navigateTo(options)
    }
  },
  showTestA() {
    this.push({
      url: '/pages/index/testA'
    })
  },
  showTestB() {
    this.push({
      url: '/pages/index/testB'
    })
  }
}
