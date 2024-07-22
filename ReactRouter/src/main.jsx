import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'

import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Login from './components/Login/Login.jsx'
import Gituser from './components/Gituser/Gituser.jsx'
import Home from './components/Home/Home.jsx'
import Register from './components/Home/Register.jsx'
import SubmitAudiobook from './components/Home/SubmitAudiobook.jsx'
import CategoryPage from './components/Home/Categoryfetching_page.jsx'

// const router = createBrowserRouter( [
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//           path: "",
//           element: <Home />
//       },
//       {
//           path: 'about',
//           element: <About />
//       },
//       {
//           path: 'contact',
//           element: <Contact />
//       },
//       {
//           path: 'login',
//           element: <Login />
//       },
//       {
//           path: 'start',
//           element: <Getstarted />
//       },
//       {
//           path: 'gituser/:username',
//           element: <Gituser /> 
//       }
      
//     ]

//   }

// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Register />} />
      <Route path='home' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={ <Register/> } />
      <Route path='git/:username' element={<Gituser />} />
      <Route path='submit-audiobook' element={ <SubmitAudiobook/> } />
      <Route path="/category/:id" element={<CategoryPage />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider  router={router}/>
  </React.StrictMode>,
)
