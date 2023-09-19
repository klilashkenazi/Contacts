const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactDetails() {

    const navigate = useNavigate()
    const { contactId } = useParams()
    const [contact, setContact] = useState(null)

    useEffect(() => {
        loadContact()
    }, [contactId])

    function loadContact() {
        contactService.getById(contactId)
            .then(setContact)
            .catch((err) => {
                console.log('Had issues in contact details', err)
                // showErrorMsg('Cannot load contact')
                navigate('/contact')
            })

        if (!contact) return <div>Loading...</div>
        return (
            <section className="contact-details">
                <h1>First name: {contact.firstName}</h1>
                <h1>Last name: {contact.lastName}</h1>
                <p>Description: {contact.desc}</p>
                <h2>Phone number: {contact.phone}</h2>
                <h3>Email: {contact.email}</h3>
                <h5>Id: {contact._id}</h5>
                <Link to="/contact">Back</Link>
            </section>
        )
    }
}