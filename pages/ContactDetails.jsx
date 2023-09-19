const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"
import { removeContact } from "../store/actions/contact.action.js"

export function ContactDetails() {

    const navigate = useNavigate()
    const { contactId } = useParams()
    const [contact, setContact] = useState(null)
    console.log(contact);

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
        }
        function onDeleteContact() {
            removeContact(contactId)
                .then(() => {
                    // showSuccessMsg(`Contact removed: ${contactId}`)
                    console.log(`Contact removed: ${contactId}`)
                })
                .catch(err => {
                    console.log('Cannot remove contact', err)
                    // showErrorMsg('Cannot remove contact')
                })
        }

        if (!contact) return <div>Loading...</div>
        else return (
            <section className="contact-details">
                <h1>First name: {contact.firstName}</h1>
                <h1>Last name: {contact.lastName}</h1>
                <p>Description: {contact.desc}</p>
                <h2>Phone number: {contact.phone}</h2>
                <h3>Email: {contact.email}</h3>
                <h5>Id: {contact._id}</h5>
                <button><Link to={`/contact/edit/${contact._id}`}>Edit contact</Link></button>
                <button><Link to="/contact">Back</Link></button>
                <button onClick={onDeleteContact}>Delete contact</button>
            </section>
        )
    
}