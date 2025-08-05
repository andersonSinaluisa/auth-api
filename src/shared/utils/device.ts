import { UAParser } from 'ua-parser-js';


export const getDeviceInfo = (userAgent: string) => {
    const parser = new UAParser();

    parser.setUA(userAgent);

    const result = parser.getResult();

    let deviceType = 'web'; // Valor predeterminado

    if (result.device.type === 'mobile') {
        deviceType = 'mobile';
    } else if (result.device.type === 'tablet') {
        deviceType = 'tablet';
    }

    return deviceType;

}