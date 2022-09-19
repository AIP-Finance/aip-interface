const useIsMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)
}

export default useIsMobile
