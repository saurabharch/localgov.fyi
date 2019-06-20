import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const ProptaxSvg = props => (

    <SvgIcon
        height={512}
        width={512}
        viewBox="0 0 512 512"
        id="prop"
        key="prop"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
    
        <defs >
            <g id="prop_e">
                <defs>
                    <path id="prop_a" d="M12 71.833h462.266v478.735H12V71.833z" />
                    <image
                        width={1153}
                        height={1083}
                        id="prop_c"
                        transform="scale(.00087 .00092)"
                    />
                    <clipPath id="prop_b">
                        <use xlinkHref="#prop_a" />
                    </clipPath>
                    <g id="prop_d" clipPath="url(#prop_b)">
                        <use
                            xlinkHref="#prop_c"
                            transform="matrix(462.266 0 0 478.734 12 71.833)"
                        />
                    </g>
                </defs>
                <use xlinkHref="#prop_d" fill="#a9a9a9" fillRule="evenodd" />
            </g>
        </defs>
        <use xlinkHref="#prop_e" />
    </SvgIcon>
);

export default ProptaxSvg;
