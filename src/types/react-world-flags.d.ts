declare module 'react-world-flags' {
    import { ComponentType } from 'react';
    
    interface FlagProps {
        code: string;
        className?: string;
        [key: string]: any;
    }
    
    const Flag: ComponentType<FlagProps>;
    export default Flag;
}
