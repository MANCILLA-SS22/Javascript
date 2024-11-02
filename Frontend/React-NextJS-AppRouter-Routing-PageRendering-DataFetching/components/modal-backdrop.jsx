"use client";

import { useRouter } from 'next/navigation';

function ModalBackdrop() {
    const router = useRouter();
    return <div className="modal-backdrop" onClick={router.back} />
};

export default ModalBackdrop;