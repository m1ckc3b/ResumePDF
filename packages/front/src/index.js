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
    <h3>Informations sur le fichier</h3>
    <p><b>Nom</b>: ${file.name}</p>
    <p><b>Type</b>: ${file.type}</p>
  `
  resume.innerHTML = `
    <h3>Résumé</h3>
    <p>${await response.text()}</p>
  `
  reqExecution.innerHTML = `
    <p><i><b>Réponse en ${(end - start)/1000} secondes</b></i></p>
  `
}