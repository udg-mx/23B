"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {getPost} from "@/utils/posts/posts";
import type {Post} from "@/utils/posts/post";
import {emptyPost} from "@/utils/posts/post";

export default function PostDetailComponent({params, }: {params: { id: string }}){
    const router = useRouter();
    const { id} = params;
    const [post, setPost] = useState<Post>(emptyPost());

    useEffect(() => {
        if (id) {
            const postDetail = getPost(Number(id));
            setPost(postDetail);
            if (postDetail.id) {
                document.title = postDetail.title;
            }
        }
    }, [id]);

    useEffect(() => {
        if (post) {
            document.title = post.title;
        }
    }, [post]);

    return (
        <div className="p-4 bg-white shadow-lg rounded mx-auto max-w-xl">
            {post ? (
                <>
                    <img src={post.imageUrl} alt="" className="w-full rounded-t mb-4" />
                    <div className="p-4">
                        <h2 className="text-2xl mb-4">{post.title}</h2>
                        <p className="text-gray-600 mb-4">{post.body}</p>
                        <div className="text-gray-500 mb-2">
                            <span className="text-sm">{post.date}</span> - <em className="text-xs">{post.author}</em>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/" className="text-blue-600">Volver</Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-10">
                    <p>Cargando detalles del post...</p>
                </div>
            )}
        </div>
    );
};
