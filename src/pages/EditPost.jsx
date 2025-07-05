import React from 'react'
import { useEffect, useState } from "react"
import { Container, Postcard, PostForm } from '../components/ui/index'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
    if(slug){
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
        })
    }else{
        navigate('/')
    }
    }, [slug, navigate])
    
  return post ? (
    <div className='py-8'>
    <Container>
        <PostForm posts={post}/>
    </Container>
    </div>
  ) : null
}

export default EditPost