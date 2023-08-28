'use client'
import {FormEvent, useState} from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {emptyPost, Post} from "@/utils/posts/post";
import {addPost, updatePost} from "@/utils/posts/posts";

type PostFormProps = {
    currentPost?: Post | null;
};

export default function PostForm({ currentPost }: PostFormProps) {

    const [post, setPost] = useState(currentPost || emptyPost());
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {

        const postData = {...post};
        event.preventDefault();


        if (!postData.imageUrl)
        {
            postData.imageUrl = await fetchImageUrl(postData);
        }

        postData.date = format(new Date(), 'd ' + 'MMMM, yyyy', { locale: es });

        if (postData.id) {
            updatePost(postData);
        } else {
            addPost(postData);
        }

        router.push('/admin/posts');
    };

    const cancel = () => {
        router.push('/admin/posts')
    };

    const fetchImageUrl = async (postData: Post) => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            return data.message;
        } catch (error) {}

        return '';
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-6 pt-2 bg-white rounded shadow-lg">

                <div className="mb-8 text-center border-b pb-4">
                    <h2 className="text-2xl font-bold">{ post.id ? 'Editar Publicación' : 'Agregar Publicación' }</h2>
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="block font-medium text-gray-700">Título</label>
                    <input
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                        type="text"
                        id="title"
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium text-gray-700">Descripción</label>
                    <textarea
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        id="description"
                        className="mt-1 p-2 w-full border rounded"
                        rows={3}></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="body" className="block font-medium text-gray-700">Contenido</label>
                    <textarea
                        value={post.body}
                        onChange={(e) => setPost({ ...post, body: e.target.value })}
                        id="body"
                        className="mt-1 p-2 w-full border rounded"
                        rows={12}></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block font-medium text-gray-700">Autor</label>
                    <input
                        value={post.author}
                        onChange={(e) => setPost({ ...post, author: e.target.value })}
                        type="text"
                        id="author"
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={cancel}
                        className="mr-2 px-4 py-2 bg-gray-300 text-black rounded"
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        {currentPost ? 'Guardar' : 'Agregar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Note: You'll also have to implement the addPost and updatePost functions in the context of your React application.
