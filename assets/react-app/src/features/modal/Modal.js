import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalClose } from './modalSlice';

import './modal.css';

const lazyComponentsCache = new Map();

const getModalComponent = (componentName) => {
    if (!lazyComponentsCache.has(componentName)) {
        lazyComponentsCache.set(
            componentName,
            lazy(() => import(`../../${componentName}`))
        );
    }
    return lazyComponentsCache.get(componentName);
};

const Modal = () => {
    const stateModal = useSelector(state => {
        return state.modal;
    });
    const dispatch = useDispatch();

    if (!stateModal.isOpen) return null;

    if (!stateModal.contentComponentName) return null;

    const ContentComponentName = getModalComponent(stateModal.contentComponentName);
    const FooterComponentName = getModalComponent(stateModal.footerComponentName);

    return (
        <div className="modal" style={{display: 'block'}}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{ stateModal.title }</p>
                    <button className="delete" aria-label="close" onClick={() => dispatch(modalClose())}></button>
                </header>
                <section className="modal-card-body">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ContentComponentName/>
                    </Suspense>
                </section>
                <footer className="modal-card-foot">
                    <Suspense fallback={<div>Loading...</div>}>
                        <FooterComponentName/>
                    </Suspense>
                </footer>
            </div>
        </div>
    );
}

export default Modal;
