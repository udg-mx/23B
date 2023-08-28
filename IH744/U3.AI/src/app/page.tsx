'use client'
import {getPosts} from "@/utils/posts/posts";
import {Post} from "@/utils/posts/post";
import Link from "next/link";

export default function PageHome() {


    const posts: Post[] = getPosts();

  return (
      <div>
        <div className="mx-auto max-w-xl">
          {posts.length > 0 ? (
              posts.map((post: Post) => (
                  <article key={post.id} className="bg-white p-5 rounded-md shadow-md mb-5">
                    <Link href={`/post/${post.id}`}>
                        <img src={post.imageUrl} alt="Imagen del post" className="post-img w-full h-64 object-cover rounded-md" />
                        <h2 className="text-2xl font-bold mt-5">{post.title}</h2>

                    </Link>
                    <p className="text-gray-600 mt-2">{post.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-500">{post.date}</span>
                      <span className="text-gray-500">{post.author}</span>
                    </div>
                  </article>
              ))
          ) : (
              <div className="text-center py-10">
                <p>No hay posts disponibles en este momento.</p>
              </div>
          )}
        </div>
      </div>
  );
}