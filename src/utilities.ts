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

export const getPercentageColour = (params: any) => {
    if (params.value >  90) return  {backgroundColor: 'pink', color: 'black'};
    if (params.value >  75) return  {backgroundColor: 'gold', color: 'black'};
}

export const getSideColour = (params: any) => {
    return (params.value === "BUY") ? {fontWeight: 'bold', color: 'darkblue'} : {fontWeight: 'bold', color: 'darkred'};
}

export const getLimitBreachTypeColour = (params: any) => {
    if (params.value.includes("Full")) return {fontWeight: 'bold', color: 'olive'};
}
