// Function to validate the number of stations (n)
function validateNumber () {
  const nInput = document.getElementById('n')
  const nValue = parseInt(nInput.value)

  if (nValue <= 0 || isNaN(nValue)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Input',
      text: 'Number of stations (n) must be a number greater than 0!'
    })
    nInput.value = '' // Clear the input field
    nInput.focus() // Focus back on the input field
    return false
  }
  return true
}

// Function to dynamically update the form fields based on the number of stations (n)
function updateFields () {
  const n = parseInt(document.getElementById('n').value)
  const aFields = document.getElementById('a-fields')
  const tFields = document.getElementById('t-fields')

  // Clear previous fields
  aFields.innerHTML = ''
  tFields.innerHTML = ''

  if (n > 0) {
    // Add station times (a) fields
    aFields.innerHTML += '<h2>Station Times (a):</h2>'
    for (let i = 0; i < 2; i++) {
      aFields.innerHTML += `<h3>Line ${i + 1}:</h3>`
      let row = '<div class="input-row">'
      for (let j = 0; j < n; j++) {
        row += `
                    <div class="form-group">
                        <label for="a${i}${j}">a${i + 1}${j + 1}:</label>
                        <input type="number" id="a${i}${j}" name="a${i}${j}" required min="0">
                    </div>`
      }
      row += '</div>'
      aFields.innerHTML += row
    }

    // Add transfer times (t) fields
    tFields.innerHTML += '<h2>Transfer Times (t):</h2>'
    for (let i = 0; i < 2; i++) {
      tFields.innerHTML += `<h3>Line ${i + 1}:</h3>`
      let row = '<div class="input-row">'
      for (let j = 0; j < n - 1; j++) {
        row += `
                    <div class="form-group">
                        <label for="t${i}${j}">t${i + 1}${j + 1}:</label>
                        <input type="number" id="t${i}${j}" name="t${i}${j}" required min="0">
                    </div>`
      }
      row += '</div>'
      tFields.innerHTML += row
    }
  }
}

// Function to validate the form before submission
function validateForm (e) {
  e.preventDefault() // Prevent form submission

  const n = parseInt(document.getElementById('n').value)
  const e1 = document.getElementById('e1').value
  const e2 = document.getElementById('e2').value
  const x1 = document.getElementById('x1').value
  const x2 = document.getElementById('x2').value

  // Validate number of stations (n)
  if (n <= 0 || isNaN(n)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Input',
      text: 'Number of stations (n) must be a number greater than 0!'
    })
    return
  }

  // Validate entry and exit times
  if (
    !e1 ||
    !e2 ||
    !x1 ||
    !x2 ||
    isNaN(e1) ||
    isNaN(e2) ||
    isNaN(x1) ||
    isNaN(x2)
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Input',
      text: 'Entry and Exit times must be filled with valid numbers!'
    })
    return
  }

  // Validate station times (a) and transfer times (t)
  let isValid = true
  let errorMessage = ''

  // Check station times (a)
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < n; j++) {
      const aInput = document.getElementById(`a${i}${j}`)
      if (!aInput || !aInput.value || isNaN(aInput.value) || aInput.value < 0) {
        isValid = false
        errorMessage = `Station time a${i + 1}${j + 1} is missing or invalid!`
        break
      }
    }
    if (!isValid) break
  }

  // Check transfer times (t)
  if (isValid) {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < n - 1; j++) {
        const tInput = document.getElementById(`t${i}${j}`)
        if (
          !tInput ||
          !tInput.value ||
          isNaN(tInput.value) ||
          tInput.value < 0
        ) {
          isValid = false
          errorMessage = `Transfer time t${i + 1}${
            j + 1
          } is missing or invalid!`
          break
        }
      }
      if (!isValid) break
    }
  }

  // Show error message if any field is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Input',
      text: errorMessage
    })
    return
  }

  // If all fields are valid, submit the form
  Swal.fire({
    icon: 'success',
    title: 'Form Submitted',
    text: 'All fields are valid. Submitting the form...'
  }).then(() => {
    document.getElementById('input-form').submit()
  })
}

// Attach the validateForm function to the form's submit event
document.getElementById('input-form').addEventListener('submit', validateForm)
