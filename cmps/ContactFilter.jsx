const { useState, useEffect, useRef } = React

import { contactService } from "../services/contact.service.js"
import { utilService } from "../services/util.service.js"

export function ContactFilter ({filterBy,onSetFilter}){

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let value = target.value
        let field = target.name
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

const {searchKey, sortBy} = filterByToEdit
    return (
        <section className="contact-filter full main-layout">
            <h2>Contacts Filter</h2>
            <form >
                <select onChange={handleChange} name="sortBy" id="sortBy" value={sortBy} className="sort-by">
                    <option value="">Sort By</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                </select>

                <input value={searchKey} onChange={handleChange} type="search" placeholder="By contact's first name" id="searchKey" name="searchKey" className="search-key"/>
            </form>

        </section>
    )
}