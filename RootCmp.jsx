const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'
import { store } from './store/store.js'
import { ContactDetails } from './pages/ContactDetails.jsx'
import { ContactEdit } from './pages/ContactEdit.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ContactIndex />} path="/contact" />
                            <Route element={<ContactDetails />} path="/contact/:contactId" />
                            <Route element={<ContactEdit/>} path='/contact/Edit'/>
                            <Route element={<ContactEdit/>} path='/contact/Edit/:contactId'/>
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}


