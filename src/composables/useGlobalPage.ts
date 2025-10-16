export function useGlobalPage() {
  const page = ref<BaseLayoutRef>()
  const paging = ref<ZPagingRef>()

  return {
    page,
    paging
  }
}
