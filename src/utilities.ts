export const formatNumber = (number: any) : string =>
{
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const isValidParameter = (parameter): boolean =>
{
    if(parameter === null || parameter === undefined)
        return false;

    if(parameter.value === null || parameter.value === undefined || parameter.value === '')
        return false;

    return true;
}

export const numberFormatter = (param): string|any =>
{
    return isValidParameter(param) ? formatNumber(param.value) : param.value;
}
