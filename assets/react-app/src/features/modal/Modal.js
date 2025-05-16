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

    if (!stateModal.componentName) return null;

    const ModalComponent = getModalComponent(stateModal.componentName);

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
                        <ModalComponent/>
                    </Suspense>
                </section>
                <footer className="modal-card-foot">
                    {/*<div className="buttons">*/}
                    {/*    <button className="button is-success">Save changes</button>*/}
                    {/*    <button className="button">Cancel</button>*/}
                    {/*</div>*/}
                </footer>
            </div>
        </div>
    );
}

export default Modal;
