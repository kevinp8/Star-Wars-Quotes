document.querySelector('#update-button').addEventListener('click', putRequest)
document.querySelector('#delete-button').addEventListener('click', deleteRequest)

async function putRequest(){
    const res = await fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    let response 
    if (res.ok) response = await res.json()
    console.log(response)
    window.location.reload(true)
}

async function deleteRequest(){
    const res = await fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vadar'
        })
        
    })
    let response 
    if (res.ok) response = await res.json()
    if (response === 'No quote to delete') {
        document.querySelector('#message').textContent = 'No Darth Vadar quote to delete'
      } else {
        window.location.reload(true)
      }
}