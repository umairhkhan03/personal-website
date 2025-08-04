export const downloadCV = () => {
  // Create a link element
  const link = document.createElement("a")
  link.href = "/umair-husain-khan-cv.pdf"
  link.download = "Umair-Husain-Khan-CV.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
