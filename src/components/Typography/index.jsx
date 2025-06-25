const defaultStyle = {
    padding: '0',
    margin: '0',
    fontSize: '14px',
    color: '#000'
};

const variantStyles = {
    h1: {
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '16px 0'
    },
    h2: {
        fontSize: '28px',
        fontWeight: 'bold',
        margin: '14px 0'
    },
    h3: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '12px 0'
    },
    subtitle: {
        fontSize: '16px',
        margin: '6px 0'
    },
    small: {
        fontSize: '12px',
        color: '#666',
        margin: '4px 0'
    }
}; 

const Typography = ({ children, sx, variant }) => {
    
    let style = sx || defaultStyle;
    
    if (variant && variantStyles[variant]) {
        style = {...style, ...variantStyles[variant] };
    }  

    console.log(style);

    return (
        <p style={style}>
            {children}
        </p>
    );
};

export default Typography;