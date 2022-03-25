document.addEventListener("click", (event) => {
	if (event.target.dataset.type === "remove") {
		const id = event.target.dataset.id

		remove(id).then(() => {
			event.target.closest("li").remove()
		})
	}
	if (event.target.dataset.type === "update") {
		const id = event.target.dataset.id

		update(id).then((data) => {
			if (data) {
				event.target.offsetParent.children[0].innerText = data
			}
		})
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: "DELETE" })
}
async function update(id) {
	const newTitle = prompt("Введите новое название", "")

	if (newTitle !== null) {
		await fetch(`/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: newTitle })
		})
		return newTitle
	}
}
