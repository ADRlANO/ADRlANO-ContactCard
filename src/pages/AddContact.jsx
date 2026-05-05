import { useState } from "react"
import { Link } from "react-router-dom";

const initialFormData = {
    name: '',
    email: '',
    phone: '',
    address: ''
}

const MY_AGENDA_SLUG = "tumama"

export function AddContact() {
    const [createContactFormData, setCreateContactFormData] = useState(initialFormData)

    console.log("createContactFormData", createContactFormData)

    async function handleSubmit(e) {
        e.preventDefault();

        const url = `https://playground.4geeks.com/contact/agendas/${MY_AGENDA_SLUG}/contacts`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createContactFormData)
        }

        const response = await fetch(url, options)
        const data = await response.json()

        console.log("data >>>> ", data)
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center fw-bold mb-4">Add a new contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={createContactFormData.name}
                        onChange={(e) => setCreateContactFormData(previousData => ({ ...previousData, name: e.target.value }))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={createContactFormData.email}
                        onChange={(e) => setCreateContactFormData(previousData => ({ ...previousData, email: e.target.value }))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter phone"
                        value={createContactFormData.phone}
                        onChange={(e) => setCreateContactFormData(previousData => ({ ...previousData, phone: e.target.value }))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                        value={createContactFormData.address}
                        onChange={(e) => setCreateContactFormData(previousData => ({ ...previousData, address: e.target.value }))}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save</button>
                <Link to="/">or get back to contacts</Link>
            </form>
        </div>
    );
}
