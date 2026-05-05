export function AddContact() {
    return (
        <div className="container mt-5">
            <h2 className="text-center fw-bold mb-4">Add a new contact</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input type="text" className="form-control" placeholder="Full Name" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input type="tel" className="form-control" placeholder="Enter phone" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <input type="text" className="form-control" placeholder="Enter address" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
        </div>
    );
}
