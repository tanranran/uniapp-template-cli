export default {
  push(options: UniNamespace.NavigateToOptions & NavigateToOptions) {
    uni.navigateTo(options)
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
