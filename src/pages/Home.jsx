import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MY_AGENDA_SLUG = "tumama"

const SAMPLE_CONTACTS = [
  {
    id: crypto.randomUUID(),
    name: "Mike Shinoda",
    address: "5842 Hillcrest Rd",
    phone: "(870) 288-4149",
    email: "mike.ana@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "Mike Shinoda",
    address: "5842 Hillcrest Rd",
    phone: "(870) 288-4149",
    email: "mike.ana@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "Mike Shinoda",
    address: "5842 Hillcrest Rd",
    phone: "(870) 288-4149",
    email: "mike.ana@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "Mike Shinoda",
    address: "5842 Hillcrest Rd",
    phone: "(870) 288-4149",
    email: "mike.ana@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const ConfirmDeleteModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Are you sure?</h5>
            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close" />
          </div>
          <div className="modal-body">
            <p>If you delete this thing the entire universe will go down!</p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button className="btn btn-primary" onClick={onCancel}>Oh no!</button>
            <button className="btn btn-secondary" onClick={onConfirm}>Yes baby!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ contact, onEdit, onDelete }) => (
  <div className="d-flex align-items-center border-bottom py-3">
    <img
      src={contact.avatar}
      alt={contact.name}
      className="rounded-circle me-4"
      style={{ width: "80px", height: "80px", objectFit: "cover" }}
    />
    <div className="flex-grow-1">
      <h5 className="mb-1">{contact.name}</h5>
      <p className="mb-0 text-muted small">
        <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
      </p>
      <p className="mb-0 text-muted small">
        <i className="fas fa-phone me-2"></i>{contact.phone}
      </p>
      <p className="mb-0 text-muted small">
        <i className="fas fa-envelope me-2"></i>{contact.email}
      </p>
    </div>
    <div className="d-flex gap-3">
      <button className="btn btn-link p-0 text-dark" onClick={() => onEdit(contact.id)} aria-label="Edit contact">
        <i className="fas fa-pencil-alt"></i>
      </button>
      <button className="btn btn-link p-0 text-dark" onClick={() => onDelete(contact.id)} aria-label="Delete contact">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  </div>
);

const Contacts = ({ onEdit, onDelete }) => {
  const [contacts, setContacts] = useState(SAMPLE_CONTACTS)
  const [isLoading, setIsLoading] = useState(false);

  async function fetchContacts() {
    const url = `https://playground.4geeks.com/contact/agendas/${MY_AGENDA_SLUG}/contacts`

    setIsLoading(true)

    const response = await fetch(url);
    const data = await response.json();

    setContacts(prevContacts => [...prevContacts, data.contacts]);
    setIsLoading(false)
  }

  useEffect(() => {
    fetchContacts();
  }, [])

  if (isLoading) return (<div>Loading contacts...</div>)

  return (
    <div>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
};

export const Home = () => {
  const navigate = useNavigate();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDeleteRequest = (id) => setPendingDeleteId(id);
  const handleDeleteConfirm = () => {
    console.log("Deleted contact", pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className="container mt-4">
      <ConfirmDeleteModal
        show={pendingDeleteId !== null}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
      <Contacts
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />
    </div>
  );
};
