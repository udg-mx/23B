"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {getPost} from "@/utils/posts/posts";
import type {Post} from "@/utils/posts/post";
import {emptyPost} from "@/utils/posts/post";
import PostForm from "@/components/PostForm";

export default function PageAdminPostEdit({params, }: {params: { id: string }}){
    const router = useRouter();
    const { id: postId} = params;
    const [post, setPost] = useState<Post>(emptyPost());

    useEffect(() => {
        if (postId) {
            const postDetail = getPost(Number(postId));
            setPost(postDetail);
            if (postDetail.id) {
                document.title = postDetail.title;
            }
        }
    }, [postId]);

    useEffect(() => {
        if (post) {
            document.title = post.title;
        }
    }, [post]);


    if (!post.id)
    {
        return (
            <div className="text-center py-10">
                <p>Cargando detalles del post...</p>
            </div>
        );
    }

    return (
        <PostForm currentPost={post} />
    );
};
