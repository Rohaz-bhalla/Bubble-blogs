import React from 'react'
import { Container, Logo, LogoutBtn  } from './index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' //dekhne k liye ki user logged in hai yaa nhi
import { useNavigate } from 'react-router-dom' //navigation main kuch forcefully krna ho

function Header() {
const authStatus = useSelector((state)=> state.auth?.status ?? false)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
   <>
   <header className='py-3 shadow bg-gray-500'></header>
   <Container>
    <nav className='flex'>
      <div className='mr-4'>
        <Link>
        <Logo width = '70px'></Logo>
        </Link>
      </div>
      <ul className='flex ml-auto'>
           {navItems.map((item)=>           //loop lgai for conditional loading
          item.active ? (
            <li key={item.name}>           
            {/* //key makes items unique */}
              <button
              onClick={() => navigate(item.slug)}
              className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              >{item.name}</button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}  
          {/* //agar auth status true hoga fir hi chlega */}
      </ul>
    </nav>
   </Container>
   </>
  )
}

export default Header