
// export const BASE_URL = 'https://idspa.vigolf.vn/';
// export const BASE_URL_API = 'https://idspa.vigolf.vn/api/customer/';
// export const BASE_URL_API_AFF = 'https://idspa.vigolf.vn/api/aff/';

// export const url_image_icon = "https://manager.idspa.vn/app-assets/image_mobile/app_customer/icon/";
// export const url_image_icon_color = "https://manager.idspa.vn/app-assets/image_mobile/app_customer/icon_color/";
// export const url_image = "https://contract.idspa.vn/app-assets/icon_mobile/app_customer/";
// export const url_image_icon_contract = "https://contract.idspa.vn/app-assets/icon_mobile/app_customer/icon_color/";
// export const url_icon_pety = "https://contract.idspa.vn/app-assets/icon_mobile/iconPety/"
// export const IDSPA_KEY = 'idspa_key_api';


import moment from 'moment';



export function format_money(num) {
    if (num && !Number.isNaN(parseInt(num)))
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return 0;
}

export function un_format_money(money) {
    if (money && money != '')
        return parseInt(money.replace(/\,/g, ''));
    else return 0;
}

export function random_string(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function get_created_date() {
    return moment().format("YYYY-MM-DD HH:mm:ss")
}

export function formatDateText(time) {
    const now = moment();
    const diffInMinutes = now.diff(time, 'minutes');
    if (diffInMinutes === 0) {
        return 'vừa xong';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
        const diffInHours = now.diff(time, 'hours');
        return `${diffInHours} giờ trước`;
    } else {
        const diffInDays = now.diff(time, 'days');
        return `${diffInDays} ngày trước`;
    }
}

export function format_date_time_for_view(datetime, type) {
    let datetimeformat = moment(datetime, 'YYYY-MM-DD HH:mm:ss', true);
    switch (type) {
        case 'date':
            return datetimeformat.format("DD/MM/YYYY");
        case 'time':
            return datetimeformat.format("HH:mm:ss");
        case 'datetime':
            return datetimeformat.format("DD/MM/YYYY HH:mm:ss");
    }
}
export function getMonthorYearCurrent(type) {
    let current_date = new Date();
    switch (type) {
        case 'date':
            return current_date.getDate();
            break;
        case 'month':
            return current_date.getMonth() + 1;
            break;
        case 'year':
            return current_date.getFullYear();
            break;
        case 'fulldate':
            return current_date.getDate() + "/" + (current_date.getMonth() + 1) + "/" + current_date.getFullYear();
            break;
    }
}
export function listMonthOfYear() {
    let obj_month = [];
    let i;
    for (i = 0; i < 12; i++) {
        obj_month.push(i + 1);
    }
    return obj_month;
}
export function dayofMonth(type) {
    let today = new Date();
    switch (type) {
        case 'first_day':
            let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            return firstDayOfMonth.getDate() + "/" + firstDayOfMonth.getMonth() + "/" + firstDayOfMonth.getFullYear();
            break;
        case 'last_day':
            let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return lastDayOfMonth.getDate() + "/" + (lastDayOfMonth.getMonth() + 1) + "/" + lastDayOfMonth.getFullYear();
            break;
    }
}
export function get_timthumb_custom(link, image, width = '', height = '') {
    let image_url = BASE_URL + "app-assets/images/no_image.jpg";
    if (image !== '') {
        image_url = BASE_URL + "files/" + link + "/" + image;
    }
    return image_url;
}
export function array_to_string(service_arr) {
    let service_name_item = [];
    service_arr.map((item, index) => {
        service_name_item.push(item.name);
    });
    return service_name_item.join();
}
