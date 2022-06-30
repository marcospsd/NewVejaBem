import React, { useEffect, useRef} from 'react'



const UIInfiniteScroll = ({ buscar }) => {
    const containerRef = useRef();


    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                observer.disconnect()
                buscar()
            }
        }, options);
        observer.observe(containerRef.current);
    }, [])

    return <div ref={containerRef}/>



}

export default UIInfiniteScroll;