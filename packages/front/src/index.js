const form = document.querySelector("#form")
const fileInput = document.querySelector("#file")
const fileInfo = document.querySelector('#file-info')
const resume = document.querySelector('#file-resume')
const reqExecution = document.querySelector("#req-execution")

form.addEventListener("submit", submitForm)
file.addEventListener("change", () => {
  fileInfo.innerHTML = ''
  resume.innerHTML = ''
  reqExecution.innerHTML = ''
})

async function submitForm(e) {
  e.preventDefault()

  // const question = e.target.question.value
  const file = e.target.file.files[0]
  
  // Time execution Start
  const start = Date.now()

  const formData = new FormData()
  // formData.append("question", question)
  formData.append("file", file)

  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: formData,
  })
  // Time execution End
  const end = Date.now()

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
  reqExecution.innerHTML = `
    <p>Réponse en : ${end - start} ms</p>
  `
}