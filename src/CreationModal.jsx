

export const CreationModal = ({ handleCreateTask, closeCreate, firstInputRef, newTitle, setNewTitle, newDescription, setNewDescription }) => {
    return (<div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
        <form
            onSubmit={handleCreateTask}
            className='bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col gap-5 p-6 border border-gray-200 animate-fade-in'
            role='dialog'
            aria-modal='true'
        >
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold flex items-center gap-2'>
                    <span className='material-symbols-rounded text-blue-600'>note_add</span>
                    Crear tarea
                </h2>
                <button type='button' onClick={closeCreate} className='material-symbols-rounded text-gray-500 hover:text-gray-800 transition-colors'>close</button>
            </div>
            <div className='flex flex-col gap-3'>
                <label className='flex flex-col gap-1 text-sm font-medium'>Título
                    <input
                        ref={firstInputRef}
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        className='border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                        placeholder='Ej: Revisar correo'
                        maxLength={70}
                        required
                    />
                </label>
                <label className='flex flex-col gap-1 text-sm font-medium'>Descripción
                    <textarea
                        value={newDescription}
                        onChange={e => setNewDescription(e.target.value)}
                        className='border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none h-24'
                        placeholder='Detalles opcionales'
                        maxLength={250}
                    />
                </label>
            </div>
            <div className='flex justify-end gap-3 pt-2'>
                <button type='button' onClick={closeCreate} className='px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors'>Cancelar</button>
                <button
                    type='submit'
                    disabled={!newTitle.trim()}
                    className='px-5 py-2 rounded-lg bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-500 text-white font-medium shadow-sm transition-colors'
                >
                    Guardar
                </button>
            </div>
        </form>
    </div>);
}