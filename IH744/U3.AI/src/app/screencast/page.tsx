export default function PageScreencast()
{
    return (
        <div className="mx-auto max-w-4xl">
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 ">Código:</h2>
                <a href="https://stackblitz.com/edit/744-u3-ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://stackblitz.com/edit/744-u3-ai</a>
            </div>


            <div className="mt-4">
                <video
                    controls
                    width="100%"
                    height="auto">
                    <source src="https://udg.s3.amazonaws.com/LDSW/IH744/U3.AI/IH744.U3.AI.mp4" type="video/mp4"></source>
                </video>
            </div>

        </div>
    );
}