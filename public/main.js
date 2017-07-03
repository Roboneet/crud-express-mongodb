

var update = document.getElementById('update');

update.addEventListener('click', ()=>{
	fetch('cartoons', {
		method: 'put',
		headers: {'Content-Type':'application/JSON'},
		body:JSON.stringify({
			'name': 'Doofenshmirtz',
			'description': 'Eeevil!'
		})
	}).then(res => {
		if(res.ok) return res.json()
	}).then(data => {
		console.log(data)
		window.location.reload(true)
	})
})