const parseAttribute = (value) => {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value);
    }
    if (value === 'true' || value === 'false') {
        return value === 'true';
    }
    
    if (value === 'null') {
        return null;
    }
    
    return value;
}

export {parseAttribute}