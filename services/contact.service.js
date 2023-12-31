
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'contactDB'
_createContacts()
export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
    getDefaultFilter
}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
        .then(contactsToReturn => {
            if (filterBy.searchKey) {
                const regExp = new RegExp(filterBy.searchKey, 'i')
                contactsToReturn = contactsToReturn.filter(contact => regExp.test(contact.firstName))
            }

            if (filterBy.sortBy) {
                if (filterBy.sortBy !== '') {
                    const sortKey = filterBy.sortBy 
                    contactsToReturn = contactsToReturn.sort((a,b)=>a[sortKey].localeCompare(b[sortKey]))
                }
                else contactsToReturn
            }
            return contactsToReturn
        })
}

function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
}
function remove(contactId) {
    // return Promise.reject('Oh no!')
    return storageService.remove(STORAGE_KEY, contactId)
}
function save(contact) {
    if (contact._id) {
        return storageService.put(STORAGE_KEY, contact)
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, contact)
    }
}

function getEmptyContact() {
    return {
        firstName: '',
        lastName:'',
        email: '',
        phone:'',
        desc:''
    }
}

function _createContacts(){
let contacts=utilService.loadFromStorage(STORAGE_KEY)
if (!contacts || !contacts.length){
    contacts=[
        {
            _id: 'con101',
            firstName: 'Maya',
            lastName:'Cohen',
            email: 'maya@gmail.com',
            phone:'054-8956228',
            desc:'She is tired'
        },
        {
            _id: 'con102',
            firstName: 'Puki',
            lastName:'Cohen',
            email: 'puki@gmail.com',
            phone:'054-8979828',
            desc:'He has a weird name'
        },
        {
            _id: 'con103',
            firstName: 'Klil',
            lastName:'Ashkenazi',
            email: 'klil@gmail.com',
            phone:'054-1893528',
            desc:'She is a great partner'
        },
        {
            _id: 'con104',
            firstName: 'Muki',
            lastName:'Ashkenazi',
            email: 'muki@gmail.com',
            phone:'054-7891284',
            desc:'He is a singer'
        },
    ]
}
utilService.saveToStorage(STORAGE_KEY,contacts)

}
function getDefaultFilter() {
    return { searchKey: '', sortBy: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


