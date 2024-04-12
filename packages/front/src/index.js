const form = document.querySelector("#form")

form.addEventListener("submit", submitForm)

async function submitForm(e) {
  e.preventDefault()

  const formData = new FormData()
  formData.append("question", e.target.question.value)
  formData.append("file", e.target.file.files[0])

  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: formData,
  })

  console.log(await response.text())
}