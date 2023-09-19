const { Link } = ReactRouterDOM

export function ContactPreview({ contact, onRemoveContact }) {
    return (
        <section>
            <h4>{contact.firstName}</h4>
            <h4>{contact.lastName}</h4>
            <h4>{contact.email}</h4>
            <h4>{contact.phone}</h4>
            <button onClick={() => { onRemoveContact(contact._id) }}>x</button>
            <button> <Link to={`/contact/${contact._id}`}>Details</Link></button>
            <button> <Link to={`/contact/Edit/${contact._id}`}>Edit</Link></button>


        </section>
    )
}