exports.plus30day = (plusDay) => {
    const today = new Date();
    const newDate = new Date().setDate(today.getDate() + plusDay);
    return newDate;
}

exports.plusMinutes = (plusMinutes) => {
    const today = new Date();
    const newDate = new Date().setMinutes(today.getMinutes() + plusMinutes);
    return newDate;
}