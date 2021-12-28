import React, { useEffect, useRef, useState } from 'react';

interface IProps {
    message?:string [];
}

const DrawError: React.FC<IProps> = (props) => {
    const [className, setClassName] = useState('errorWrapper');
    const ttl = useRef<NodeJS.Timeout>();
    useEffect(() => {
        if(props.message && props.message?.length) {
            setClassName(cls => cls + ' show');
        ttl.current = setTimeout(() => {
            setClassName('errorWrapper');
        }, 3000);
        }

        return () => {
            if(ttl.current) {
                clearTimeout(ttl.current);
            }
        }
    }, [props.message]);

    return <div className={className}>
        {props.message?.join(' - ')}
    </div>
}

export default DrawError;