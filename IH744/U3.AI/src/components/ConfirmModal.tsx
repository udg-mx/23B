import React, { useState } from 'react';

export interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    context?: string | number | object;
    labelAccept?: string;
    labelReject?: string;
    onConfirm?: (context?: any) => void;
    onCancel?: (context?: any) => void;
}

export function defaultModalConfig(): ConfirmModalProps {
    return {
        isOpen: false,
        title: '',
        message: '',
        context: '',
        labelAccept: 'Aceptar',
        labelReject: 'Cancelar',
        onConfirm: () => {},
        onCancel: () => {}
    } as ConfirmModalProps;
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, labelAccept, labelReject, context}: ConfirmModalProps) {

    const handleConfirm = (context: string | number | object | null | undefined) => {
        onConfirm && onConfirm(context);
        onCancel && onCancel(context);
    };

    const handleCancel = (context: string | number | object | null | undefined) => {
        onCancel && onCancel(context);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog">
            <div className="bg-white p-4 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {title || 'Confirmar Acción'}
                </h3>
                {message ? (
                <div className="mt-2">
                    <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: message || '' }}></p>
                </div>)
                : null}
                <div className="mt-4 flex justify-end">
                    <button onClick={() => handleCancel(context)} className="mr-2 px-4 py-2 bg-gray-300 text-black rounded">{ labelReject || 'Cancelar'}</button>
                    <button onClick={() => handleConfirm(context)} className="px-4 py-2 bg-blue-500 text-white rounded">{ labelAccept || 'Aceptar'}</button>
                </div>
            </div>
        </div>
    );
}
