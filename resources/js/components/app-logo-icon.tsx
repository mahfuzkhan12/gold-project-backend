import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {

    //     <svg {...props} viewBox="0 0 40 42" xmlns="http://www.w3.org/2000/svg">
    //     <path
    //         fillRule="evenodd"
    //         clipRule="evenodd"
    //         d="M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"
    //     />
    // </svg>
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" {...props} viewBox="0 0 256 256">
            <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <circle cx="45" cy="45" r="45" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,200,67)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" />
                <circle cx="45" cy="45" r="35" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" />
                <path d="M 46.524 26.367 l 5.019 10.169 c 0.248 0.501 0.726 0.849 1.279 0.93 l 11.222 1.631 c 1.394 0.203 1.95 1.915 0.942 2.898 l -8.12 7.915 c -0.4 0.39 -0.583 0.953 -0.489 1.504 l 1.917 11.176 c 0.238 1.388 -1.219 2.447 -2.465 1.791 l -10.037 -5.277 c -0.495 -0.26 -1.086 -0.26 -1.581 0 l -10.037 5.277 c -1.247 0.655 -2.703 -0.403 -2.465 -1.791 l 1.917 -11.176 c 0.095 -0.551 -0.088 -1.114 -0.489 -1.504 l -8.12 -7.915 c -1.008 -0.983 -0.452 -2.696 0.942 -2.898 l 11.222 -1.631 c 0.553 -0.08 1.032 -0.428 1.279 -0.93 l 5.019 -10.169 C 44.1 25.104 45.9 25.104 46.524 26.367 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,200,67)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
            </g>
        </svg>
    );
}
