"use client";

import { ReactNode } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
				<button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
					✕
				</button>

				{title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

				{children}
			</div>
		</div>
	);
}
