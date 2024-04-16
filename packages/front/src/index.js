const form = document.querySelector("#form")
const fileInfo = document.querySelector('#file-info')
const resume = document.querySelector('#file-resume')

form.addEventListener("submit", submitForm)

async function submitForm(e) {
  e.preventDefault()

  // const question = e.target.question.value
  const file = e.target.file.files[0]
  console.log(file)

  const formData = new FormData()
  // formData.append("question", question)
  formData.append("file", file)

  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: formData,
  })

  form.reset()

  fileInfo.innerHTML = `
    <h2>Informations sur le fichier</h2>
    <p>Nom: ${file.name}</p>
    <p>Type: ${file.type}</p>
  `
  resume.innerHTML = `
    <h2>Résumé</h2>
    <p>${await response.text()}</p>
  `
}