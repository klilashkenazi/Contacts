const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { ContactList } from '../cmps/ContactList.jsx'
// import { CarList } from '../cmps/CarList.jsx'
import { contactService } from '../services/contact.service.js'
import { loadContacts, removeContact, addContact } from '../store/actions/contact.action.js'

export function ContactIndex() {

    // const dispatch = useDispatch()
    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    // const filterBy = useSelector(storeState => storeState.carModule.filterBy)

    useEffect(() => {
        loadContacts()
            .catch(err => {
                console.log('err:', err)
            })
    }, [])


    function onRemoveContact(contactId) {
        // removeCar(carId)
        removeContact(contactId)
            // .then(() => {
            //     showSuccessMsg('Car removed')
            // })
            .catch(err => {
                console.log('Cannot remove car', err)
                // showErrorMsg('Cannot remove car')
            })
    }

    function onAddContact() {
        const contactToSave = contactService.getEmptyContact()
        saveCar(contactToSave)
            // .then(savedContact => {
            //     // showSuccessMsg(`Car added (id: ${savedContact._id})`)
            // })
            .catch(err => {
                console.log('Cannot add car', err)
                // showErrorMsg('Cannot add car')
            })
    }

    // function onEditContact(contact) {
    //     const price = +prompt('New price?', contact.price)
    //     const carToSave = { ...contact, price }
    //     saveCar(carToSave)
    //         .then(savedCar => {
    //             showSuccessMsg(`Car updated to price: $${savedCar.price}`)
    //         })
    //         .catch(err => {
    //             console.log('Cannot update car', err)
    //             showErrorMsg('Cannot update car')
    //         })
    // }

    // function onSetFilter(filterBy) {
    //     dispatch({ type: SET_FILTER_BY, filterBy })
    // }

    return (
        <div>
            <h3>Contacts App</h3>
            <main>
                <button><Link to='/contact/Edit'>Add Contact</Link></button>
                {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}

                <ContactList
                    contacts={contacts}
                    onRemoveContact={onRemoveContact}
                // onEditCar={onEditCar}
                />
            </main>
        </div>
    )

}