import { contactService } from "../services/contact.service.js"
import { addContact, updateContact } from "../store/actions/contact.action.js"
// import { showErrorMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function ContactEdit() {

    const [contactToEdit, setcontactToEdit] = useState(contactService.getEmptyContact())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.contactId) loadContact()
    }, [])

    function loadContact() {
        contactService.getById(contactId)
            .then(setcontactToEdit)
            .catch((err) => {
                console.log('Had issues in todo edit', err)
                // showErrorMsg('Cannot load contact')
                navigate('/contact')
            })
    }
    function handleChange({ target }) {
        const value = target.value
        const field = target.name
        setcontactToEdit(prevContact => ({ ...prevContact, [field]: value }))
    }

    function onSaveContact(ev) {
        ev.preventDefault()
        if (contactToEdit._id) {
            updateContact(contactToEdit)
                .then(() => {
                    navigate('/contact')
                    setcontactToEdit(contactService.getEmptyContact())
                })
                .catch((err) => {
                    console.log('Cannot update contact', err)
                    // showErrorMsg('Cannot update contact', err)
                })
        } else {
            addContact(contactToEdit)
                .then(() => {
                    navigate('/contact')
                    setcontactToEdit(contactService.getEmptyContact())
                })
                .catch((err) => {
                    console.log('Cannot add contact', err)
                    // showErrorMsg('Cannot add contact', err)
                })
        }

    }


    const { firstName, lastName, email, phone } = contactToEdit

    return (
        <section className="todo-edit">
            {contactToEdit._id ? <h2> Edit Contact</h2> : <h2>Add Contact:</h2>}
            <form onSubmit={onSaveContact}>
                <label htmlFor="firstName">First name:</label>
                <input type="text" name="firstName" value={firstName} id="firstName" />
                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" value={lastName} id="lastName" />
                <label htmlFor="">Email:</label>
                <input type="text" name="email" value={email} id="email" />
                <label htmlFor="">Phone number:</label>
                <input type="text" name="phone" value={phone} id="phone" />
                {contactToEdit._id ? <button>Save</button> : <button>Add</button>}
            </form>
        </section>
    )
}