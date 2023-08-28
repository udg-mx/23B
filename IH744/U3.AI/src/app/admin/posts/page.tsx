"use client";
import ConfirmModal, {ConfirmModalProps, defaultModalConfig} from '@/components/ConfirmModal';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {deletePost, getPosts, resetPosts} from "@/utils/posts/posts";
import {useState} from "react";
import { useRouter } from 'next/navigation';

export default function PageAdminPosts() {

    const [modalConfig, setModalConfig] = useState(defaultModalConfig() as ConfirmModalProps);
    const posts = getPosts();
    const router = useRouter();

    const openModal = (config: ConfirmModalProps) => {
        setModalConfig(config);
    };

    const closeModal = () => {
        setModalConfig(prevConfig => ({ ...prevConfig, isOpen: false }));
    };



    const confirmPurge = () => {
        openModal({
            isOpen: true,
            title: 'Restablecer Base de Datos',
            message: `¿Deseas restablecer la base de datos?<BR>No podrás deshacer esta acción.`,
            context: '',
            onConfirm: () => {
                resetPosts();
                closeModal();
                router.refresh();
            },
            onCancel: () => {
                closeModal();
            }
        });
    };

    const confirmDelete = (id: string | number) => {
        openModal({
            isOpen: true,
            title: 'Eliminar Post',
            message: '¿Deseas eliminar este post?<BR>No podrás deshacer esta acción.',
            context: id,
            onConfirm: () => {
                deletePost(Number(id));
                closeModal();
                router.refresh();
            },
            onCancel: () => {
                closeModal();
            }
        });
    }


    return (
        <div className="p-8 container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Área de Administración</h1>

            {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h2 className="text-xl font-bold mb-4">No hay posts disponibles.</h2>
                    <p>Empieza agregando algunos posts para verlos aquí.</p>
                </div>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="w-16 py-2 px-4 border-b">ID</th>
                        <th className="w-20 py-2 px-4 border-b">&nbsp;</th>
                        <th className="py-2 px-4 border-b text-start">Nombre</th>
                        <th className="w-40 py-2 px-4 border-b">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td className="py-2 px-4 border-b">{post.id}</td>
                            <td className="py-2 px-4 border-b">
                                <Link href={`/post/${post.id}`}>
                                    <img src={post.imageUrl} alt="Thumbnail" className="h-16 w-16 object-cover" />
                                </Link>
                            </td>
                            <td className="py-2 px-4 border-b"><Link href={`/post/${post.id}`}>{post.title}</Link></td>
                            <td className="py-2 px-4 border-b flex space-x-4 justify-end items-center py-6">
                                <button className="bg-red-500 text-white p-2 rounded flex items-center justify-center" onClick={() => confirmDelete(post.id)}>
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                </button>
                                <a href={`/admin/posts/${post.id}/edit`} className="bg-blue-500 text-white p-2 rounded flex items-center justify-center">
                                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <div className="flex justify-end mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={confirmPurge}>
                    Reestablecer Base de Datos
                    <FontAwesomeIcon icon={faRefresh} className="ml-2" />
                </button>
                <Link href="/admin/posts/new" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Agregar
                    <FontAwesomeIcon icon={faPlus} className="ml-2" />
                </Link>
            </div>
            <ConfirmModal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={modalConfig.onCancel}
            />
        </div>
    );
}
