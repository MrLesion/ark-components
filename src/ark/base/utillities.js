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

const mapAttributes = (elements) => {
    let returnValue = [];
    elements.forEach((element) =>{
        const attributes = {};
        Array.from(element.getAttributeNames()).forEach(attrName => {
            attributes[attrName] = parseAttribute(element.getAttribute(attrName));
        });
        returnValue.push(attributes);
    });
    return returnValue;
    
}

export {parseAttribute, mapAttributes}