function Contact() {
    return (
        <div className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6">Contáctanos</h1>

            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Nombre:</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="name" placeholder="Tu nombre" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
                    <input className="w-full px-3 py-2 border rounded" type="email" id="email" placeholder="tu@email.com" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="message">Mensaje:</label>
                    <textarea className="w-full px-3 py-2 border rounded" id="message" placeholder="Tu mensaje" rows={4}></textarea>
                </div>

                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enviar</button>
            </form>
        </div>
    );
}

export default Contact;